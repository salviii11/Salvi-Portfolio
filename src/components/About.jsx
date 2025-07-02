import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const About = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Enhanced parallax scrolling effect using Framer Motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Spring-based transforms for smoother motion
  const springConfig = { stiffness: 100, damping: 30 };
  
  // Window controls parallax
  const windowControlsY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), springConfig);
  const windowControlsScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.98]), springConfig);
  
  // Content parallax
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), springConfig);
  const contentScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.97]), springConfig);
  
  // Code lines parallax
  const line1Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -10]), springConfig);
  const line2Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -15]), springConfig);
  const line3Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -20]), springConfig);
  
  // Skills parallax
  const skillsY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -25]), springConfig);
  const skillsScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.96]), springConfig);
  
  // Education parallax
  const educationY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -35]), springConfig);
  const educationScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.95]), springConfig);
  
  // Download button parallax
  const buttonY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), springConfig);
  const buttonScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.94]), springConfig);
  
  // Particle system
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
    
    // Initialize particles
    function initParticles() {
      particles = [];
      const numParticles = Math.floor(canvas.width * canvas.height / 20000);
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          resetY: -Math.random() * 100,
          connections: []
        });
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particle down
        particle.y += particle.speed;
        
        // Reset position when particle goes below canvas
        if (particle.y > canvas.height) {
          particle.y = particle.resetY;
          particle.x = Math.random() * canvas.width;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
        ctx.shadowBlin = 0;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section 
      id="about" 
      className="relative min-h-screen py-20 px-4 md:px-8"
      ref={sectionRef}
    >
      {/* Background particle effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900 z-0"
      ></canvas>
      
      <motion.div
        className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 shadow-xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Window Controls */}
        <motion.div 
          className="flex items-center gap-2 p-4 border-b border-gray-800"
          style={{ y: windowControlsY, scale: windowControlsScale }}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono ml-4">about_me.js</div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="p-6 font-mono"
          style={{ y: contentY, scale: contentScale }}
        >
          <motion.div variants={itemVariants} style={{ y: line1Y }}>
            <span className="text-indigo-400">const</span> aboutMe = {"{"}
          </motion.div>
          
          <motion.div variants={itemVariants} style={{ y: line2Y }} className="ml-4">
            <span className="text-indigo-400">name</span>: <span className="text-gray-300">"Salvi Parmar"</span>,
          </motion.div>
          
          <motion.div variants={itemVariants} style={{ y: line3Y }} className="ml-4">
            <span className="text-indigo-400">role</span>: <span className="text-gray-300">"UI/UX Web Designer"</span>,
          </motion.div>
          
          <motion.div variants={itemVariants} className="ml-4">
            <span className="text-indigo-400">location</span>: <span className="text-gray-300">"India"</span>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            {"}"};
          </motion.div>
        </motion.div>
        
        {/* Skills Section */}
        <motion.div 
          className="p-6 border-t border-gray-800"
          style={{ y: skillsY, scale: skillsScale }}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-indigo-400">const</span> skills = {"{"}
          </motion.div>
          
          <motion.div variants={itemVariants} className="ml-4 space-y-4">
            {[
              {
                category: "frontend",
                skills: [ "JavaScript", "Wordpress", "HTML/CSS",]
              },
              {
                category: "backend",
                skills: ["python", "java", "SQL",]
              },
              {
                category: "tools",
                skills: ["Git","figma","canva","wordpress"]
              },
              {
                category: "softSkills",
                skills: ["Problem Solving", "Team Work", "Communication", "Time Management", "Adaptability"]
              }
            ].map((category, index) => (
              <motion.div key={category.category} variants={itemVariants}>
                <span className="text-gray-400">{category.category}: [</span>
                <div className="ml-4 flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-400 text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(99, 102, 241, 0.2)",
                        borderColor: "rgba(99, 102, 241, 0.4)"
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                <span className="text-gray-400">]</span>
                {index < 3 && <span className="text-gray-400">,</span>}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            {"}"};
          </motion.div>
        </motion.div>
        
        {/* Education Section */}
        <motion.div 
          className="p-6 border-t border-gray-800"
          style={{ y: educationY, scale: educationScale }}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-indigo-400">const</span> education = {"{"}
          </motion.div>
          
          <motion.div variants={itemVariants} className="ml-4 space-y-4">
            {[
              {
                degree: "Bachelor of Technology",
                field: "Information Technology",
                university: "JG University",
                year: "2024 - Pursuing"
              },
              {
                degree: "Diploma",
                field: "Information Technology",
                university: "Lok Jagruti Kendra University",
                year: "2021 - 2024"
              }
            ].map((edu, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 p-4 rounded-lg"
              >
                <div className="text-gray-300">{edu.degree} in {edu.field}</div>
                <div className="text-gray-400 text-sm">{edu.university}</div>
                <div className="text-indigo-400 text-sm">{edu.year}</div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            {"}"};
          </motion.div>
        </motion.div>
        
        {/* Download CV Button */}
        <motion.div 
          className="p-6 border-t border-gray-800 text-center"
          style={{ y: buttonY, scale: buttonScale }}
        >
          <motion.a
            href="/CV-SALVI PARMAR.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </motion.svg>
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About; 