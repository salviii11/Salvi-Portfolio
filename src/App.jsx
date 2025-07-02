import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollIndicatorRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollTimeout = useRef(null);

  // Track scroll position to update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a new timeout
      scrollTimeout.current = setTimeout(() => {
        // Update scroll progress
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);

        setScrollY(window.scrollY);
        setShowScrollButton(window.scrollY > 500);
      }, 50); // Debounce time of 50ms
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <style jsx global>{`
        html {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar {
          display: none;
        }
        body {
          overflow-y: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-dark/50 z-50">
        <motion.div 
          className="h-full bg-indigo-400"
          style={{ width: `${scrollProgress}%` }}
          ref={scrollIndicatorRef}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="scroll-top-button fixed bottom-8 right-8 w-12 h-12 bg-indigo-400 text-white rounded-full flex items-center justify-center shadow-lg z-50 transition-opacity duration-300"
        style={{ opacity: showScrollButton ? 1 : 0 }}
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
