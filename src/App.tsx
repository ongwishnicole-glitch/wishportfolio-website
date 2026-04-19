import { motion } from "motion/react";
import { ArrowUpRight, Github, Mail, Linkedin, FileText, Camera } from "lucide-react";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<string | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem("wish_profile_image");
    const savedCv = localStorage.getItem("wish_cv_file");
    if (savedImage) setProfileImage(savedImage);
    if (savedCv) setCvFile(savedCv);
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem("wish_profile_image", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCvFile(base64String);
        localStorage.setItem("wish_cv_file", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCvClick = () => {
    if (cvFile) {
      setIsCvOpen(true);
    } else {
      cvInputRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Contact Calling Card Modal */}
      {isContactOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-beige text-ink p-8 md:p-12 max-w-md w-full shadow-2xl relative border border-ink/10"
          >
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100"
            >
              Close
            </button>
            <div className="text-2xl font-bold tracking-tighter uppercase italic font-serif mb-8 border-b border-ink/10 pb-4">
              w.n.o.
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block mb-1">Location</span>
                <p className="text-sm font-medium leading-relaxed">
                  8 September Street Congressional Village 1<br />Project 8, Quezon City
                </p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block mb-1">Mobile</span>
                <p className="text-sm font-medium">09685391242</p>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block mb-1">Email</span>
                <p className="text-sm font-medium underline decoration-ink/20 underline-offset-4">
                  ongwishnicole@gmail.com
                </p>
              </div>
            </div>
            <div className="mt-12 text-[9px] uppercase tracking-[0.3em] opacity-20 text-right">
              Digital Calling Card
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CV Full Page Modal */}
      {isCvOpen && cvFile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-start overflow-y-auto p-4 md:p-8"
        >
          <button 
            onClick={() => setIsCvOpen(false)}
            className="fixed top-8 right-8 z-60 bg-beige text-ink px-6 py-2 uppercase text-[10px] tracking-widest font-bold hover:bg-ink hover:text-beige transition-colors border border-beige"
          >
            Close
          </button>
          <img 
            src={cvFile} 
            alt="Wish Nicole Ong CV" 
            className="max-w-full md:max-w-4xl h-auto shadow-2xl bg-white border border-white/10 mt-12 mb-8"
          />
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl text-center px-6 pb-20"
          >
            <p className="text-beige/90 text-sm md:text-lg font-serif italic leading-relaxed">
              "Currently pursuing a degree in Information Technology at Quezon City University, my work sits at the intersection of Artificial Intelligence use and visual minimalism."
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Hidden inputs */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <input 
        type="file" 
        ref={cvInputRef}
        onChange={handleCvUpload}
        accept="image/*,application/pdf"
        className="hidden"
      />

      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-8 max-w-7xl mx-auto border-b border-black/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter uppercase italic font-serif"
        >
          w.n.o.
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-10 uppercase text-[10px] tracking-[0.3em] font-semibold"
        >
          <a href="#work" className="hover:opacity-50 transition">Work</a>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="hover:opacity-50 transition opacity-40 uppercase text-[10px] tracking-[0.3em] font-semibold"
          >
            Contact
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-12 py-24 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onClick={triggerUpload}
          className="w-48 h-48 rounded-full overflow-hidden border border-black/10 mb-8 relative group cursor-pointer"
        >
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Wish Nicole Ong" 
              className="w-full h-full object-cover transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 flex flex-col items-center justify-center space-y-2 p-6">
              <Camera className="w-6 h-6 opacity-30" />
              <span className="text-[10px] uppercase tracking-widest opacity-40 leading-tight">Tap to add<br/>your photo</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="text-white w-6 h-6" />
          </div>
        </motion.div>
        
        <motion.h2 
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.4em] mb-4 text-neutral-500 font-medium"
        >
          Creative Technologist
        </motion.h2>
        
        <motion.h1 
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
          className="text-6xl md:text-8xl font-serif font-normal leading-tight mb-8"
        >
          Wish Nicole <span className="italic">Ong</span>
        </motion.h1>
        
        <motion.div 
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <button className="bg-black text-beige px-12 py-3 uppercase text-[10px] tracking-widest hover:bg-beige hover:text-ink border border-ink transition-all flex items-center group">
            Hire Me
            <ArrowUpRight className="ml-2 w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button 
            onClick={handleCvClick}
            className="border border-black px-12 py-3 uppercase text-[10px] tracking-widest hover:bg-ink hover:text-beige transition-all flex items-center group relative overflow-hidden"
          >
            {cvFile ? "View CV" : "Upload CV"}
            <FileText className="ml-2 w-3 h-3 opacity-50" />
            {cvFile && <div className="absolute bottom-0 left-0 h-0.5 bg-ink w-full animate-pulse" />}
          </button>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section className="bg-ink text-beige p-8">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <ExpertiseCard 
            index="01" 
            title="AI Systems" 
            desc="Developing intelligent workflows and leveraging machine learning models for problem-solving." 
            category="Intelligence"
          />
          <ExpertiseCard 
            index="02" 
            title="UI Design" 
            desc="Exploring visual interfaces with a focus on clean layouts and minimal aesthetic clarity." 
            category="Experience"
          />
          <ExpertiseCard 
            index="03" 
            title="HTML Specialist" 
            desc="Crafting semantic, high-performance markup to ensure structural integrity of modern web." 
            category="Architecture"
          />
          <ExpertiseCard 
            index="04" 
            title="Tech Research" 
            desc="Synthesizing emerging trends and documentation to provide actionable insights for innovation." 
            category="Analysis"
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="p-6 border-t border-white/5 bg-ink text-beige">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-[9px] uppercase tracking-[0.3em] opacity-30 mb-4 md:mb-0 text-center md:text-left">
            © 2026 Wish Nicole Ong
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] opacity-30 text-center md:text-right">
            IT Degree @ Quezon City University
          </div>
        </div>
      </footer>
    </div>
  );
}

function ExpertiseCard({ index, title, desc, category }: { index: string, title: string, desc: string, category: string }) {
  return (
    <motion.div 
      variants={fadeIn}
      className="border-t border-beige/20 pt-6 group cursor-default"
    >
      <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block mb-2">
        {index} / {category}
      </span>
      <h3 className="text-xl mt-2 mb-3 italic font-serif group-hover:translate-x-1 transition-transform duration-500">
        {title}
      </h3>
      <p className="text-[11px] leading-relaxed opacity-60 font-light">
        {desc}
      </p>
    </motion.div>
  );
}
