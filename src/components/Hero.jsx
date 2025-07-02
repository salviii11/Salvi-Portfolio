import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lottie from "lottie-react";

const Hero = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Simplified scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Optimized transforms without springs
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Simplified parallax layers
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  
  // Background animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Initialize particles with enhanced properties
    function initParticles() {
      particles = [];
      const numParticles = Math.floor(canvas.width * canvas.height / 10000);
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`,
          speed: Math.random() * 0.8 + 0.2,
          directionX: Math.random() * 2 - 1,
          directionY: Math.random() * 2 - 1,
          parallaxFactor: Math.random() * 0.8 + 0.2
        });
      }
    }
    
    // Animation loop with enhanced effects
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles with enhanced effects
      particles.forEach(particle => {
        // Apply scroll-based parallax only
        const scrollOffset = window.scrollY * particle.parallaxFactor * 0.1;
        
        particle.x += particle.directionX * particle.speed;
        particle.y += particle.directionY * particle.speed + scrollOffset;
        
        // Enhanced edge behavior
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.directionX *= -1;
          particle.x = Math.max(0, Math.min(particle.x, canvas.width));
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.directionY *= -1;
          particle.y = Math.max(0, Math.min(particle.y, canvas.height));
        }
        
        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Enhanced particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 0.1 * (1 - distance / 150);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5 + (1 - distance / 150) * 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Removed mousePosition dependency
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0 pb-8 sm:py-20"
      ref={sectionRef}
    >
      {/* Background particles with optimized parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900 z-0"
        ></canvas>
      </motion.div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y: contentY }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Content section */}
          <div className="text-center flex-1 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
              style={{ y: titleY }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-6 tracking-tight flex flex-wrap justify-center items-center gap-2">
                <motion.span 
                  className="text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.2,
                    ease: "easeOut"
                  }}
                >
                  Hi, I'm
                </motion.span>
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.3,
                    ease: "easeOut"
                  }}
                >
                  Salvi Parmar
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 0.4,
                ease: "easeOut"
              }}
              style={{ y: subtitleY }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 sm:mb-8 font-medium">
                <motion.span 
                  className="text-indigo-400/70 inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  //{" "}
                </motion.span>
                <motion.span 
                  className="typing-text inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  Full Stack Developer & UI/UX Designer 
                </motion.span>
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 0.6,
                ease: "easeOut"
              }}
              style={{ y: contentY }}
            >
              Building scalable web apps with clean code, optimized performance, and great user experience.
            </motion.p>
            
            {/* Buttons and social icons container */}
            <div className="flex flex-col items-center">
              <motion.div
                className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.8,
                  ease: "easeOut"
                }}
                style={{ y: buttonY }}
              >
                <motion.a
                  href="#projects"
                  className="group relative px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium overflow-hidden text-xs sm:text-sm md:text-base"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">View Projects</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
                <motion.a
                  href="#contact"
                  className="group relative px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg border-2 border-indigo-400/20 bg-transparent text-white font-medium overflow-hidden text-xs sm:text-sm md:text-base"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Contact Me</span>
                  <motion.div 
                    className="absolute inset-0 bg-indigo-400/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              </motion.div>
              
              <motion.div
                className="mt-6 sm:mt-8 md:mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 1,
                  ease: "easeOut"
                }}
                style={{ y: buttonY }}
              >
                <div className="flex space-x-6 sm:space-x-8">
                  <SocialIcon href="https://github.com/salviii11/" icon="github" />
                  <SocialIcon href="http://linkedin.com/in/salvi-parmar-05s11" icon="linkedin" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex-shrink-0 order-1 lg:order-2"
          >
            <Lottie
              path="/salvi.json"
              loop={true}
              autoplay={true}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-indigo-400/20 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <motion.div 
            className="w-1 h-2 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mt-2"
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.3, 1] 
            }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const SocialIcon = ({ href, icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
      whileHover={{ scale: 1.1, y: -5 }}
    >
      {icon === 'github' && (
        <i className="fab fa-github text-2xl"></i>
      )}
      {icon === 'linkedin' && (
        <i className="fab fa-linkedin-in text-2xl"></i>
      )}
      {icon === 'twitter' && (
        <i className="fab fa-twitter text-2xl"></i>
      )}
    </motion.a>
  );
};

export default Hero; 