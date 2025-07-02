import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Simplified scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Optimized transforms without springs
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  // Simplified particle system
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
    
    // Initialize particles with reduced count
    function initParticles() {
      particles = [];
      const numParticles = Math.floor(canvas.width * canvas.height / 40000); // Reduced particle count
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller particles
          speed: Math.random() * 1 + 0.5, // Slower speed
          opacity: Math.random() * 0.2 + 0.1, // Lower opacity
          resetY: -Math.random() * 50
        });
      }
    }
    
    // Optimized animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles with simplified logic
      particles.forEach(particle => {
        particle.y += particle.speed;
        
        if (particle.y > canvas.height) {
          particle.y = particle.resetY;
          particle.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Project data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "Modern e-commerce site with login, shopping, checkout, and admin panel—fully responsive and user-friendly.",
      image: "https://picsum.photos/seed/ecommerce/600/400",
      category: ["web", "frontend"],
      technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
      demoLink: "#",
      githubLink: "https://github.com/Mihir0336/UniMart-Groceries"
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Interactive dashboard with dark/light mode and data visualization.",
      image: "https://picsum.photos/seed/dashboard/600/400",
      category: ["web", "frontend"],
      technologies: ["React", "Chart.js", "Tailwind CSS"],
      demoLink: "#",
      githubLink: "#"
    },
    {
      id: 3,
      title: "Stock Management System",
      description: "A comprehensive stock management system for agricon shops with features for managing products, generating bills, and tracking inventory..",
      image: "https://picsum.photos/seed/taskmanager/600/400",
      category: ["app", "fullstack"],
      technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
      demoLink: "#",
      githubLink: "https://github.com/Mihir0336/Stock-Management-System"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Personal portfolio with smooth animations and responsive design.",
      image: "https://picsum.photos/seed/portfolio/600/400",
      category: ["web", "ui"],
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      demoLink: "https://portfolio-mihirpatel0336.vercel.app/",
      githubLink: "https://github.com/Mihir0336/Mihir-s-Portfolio"
    },
    {
      id: 5,
      title: "Weather Application",
      description: "Real-time weather app with location-based forecasts and animations.",
      image: "https://picsum.photos/seed/weather/600/400",
      category: ["app", "frontend"],
      technologies: ["React", "OpenWeather API", "CSS Modules"],
      demoLink: "#",
      githubLink: "#"
    },
    {
      id: 6,
      title: "Blog Platform",
      description: "Full-featured blog with CMS and user authentication.",
      image: "https://picsum.photos/seed/blog/600/400", 
      category: ["web", "fullstack"],
      technologies: ["Next.js", "Prisma", "PostgreSQL"],
      demoLink: "#",
      githubLink: "#"
    }
  ];

  // Filter categories
  const categories = [
    { id: "all", name: "All" },
    { id: "web", name: "Web" },
    { id: "app", name: "Apps" },
    { id: "ui", name: "UI/UX" },
    { id: "frontend", name: "Frontend" },
    { id: "fullstack", name: "Full Stack" }
  ];

  // Get filtered projects
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category.includes(filter));

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Reduced stagger time
      }
    }
  };
  
  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, // Faster animation
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Background particle effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900 z-0"
      ></canvas>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          style={{ y: headerY }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Projects
          </h2>
          <motion.div 
            className="w-20 h-1 bg-indigo-400 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          ></motion.div>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            A selection of my recent work
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                filter === category.id
                  ? "bg-indigo-400 text-white"
                  : "bg-dark/20 text-white/80 hover:bg-indigo-400/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ y: gridY }}
          key={filter}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card bg-dark/10 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300"
              variants={projectVariants}
              whileHover={{ y: -5 }}
            >
              {/* Project image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a 
                    href={project.demoLink} target="_blank"
                    className="px-3 py-1.5 bg-indigo-400 text-white rounded-full text-sm hover:bg-indigo-500 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Demo
                  </motion.a>
                  <motion.a 
                    href={project.githubLink} target="_blank"
                    className="px-3 py-1.5 bg-white/90 text-dark rounded-full text-sm hover:bg-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
              
              {/* Project info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1 text-white">{project.title}</h3>
                <p className="text-white/60 text-sm mb-3">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={`${project.id}-${tech}`} 
                      className="px-2 py-0.5 bg-primary/10 text-white/70 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No projects found message */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-white/70">No projects found in this category.</p>
          </motion.div>
        )}

        {/* View more link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.a 
            href="#contact" 
            className="px-6 py-2 bg-transparent border border-white/30 text-white/90 rounded-full hover:bg-indigo-400 hover:border-indigo-400 transition-all duration-300 inline-block text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact me for custom projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 