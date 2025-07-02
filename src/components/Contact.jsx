import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  // Reference for parallax effect
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Optimized parallax transformations with reduced complexity
  const y = useTransform(scrollYProgress, [0, 1], [100, -100], {
    clamp: true // Prevent values from exceeding bounds
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0], {
    clamp: true
  });

  // Optimized background parallax effects
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -100], {
    clamp: true
  });
  
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 100], {
    clamp: true
  });
  
  // Background animated elements
  const circleRef = useRef(null);
  
  // Optimized mouse movement effect
  useEffect(() => {
    if (!circleRef.current) return;
    
    let rafId;
    let lastTime = 0;
    const fps = 30; // Limit to 30fps for better performance
    const frameInterval = 1000 / fps;
    
    const handleMouseMove = (e) => {
      const currentTime = performance.now();
      if (currentTime - lastTime < frameInterval) return;
      
      lastTime = currentTime;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      rafId = requestAnimationFrame(() => {
        if (circleRef.current) {
          circleRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await emailjs.sendForm(
          'service_portfolio', // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          formRef.current,
          'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );
        
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error('Error sending email:', error);
        setSubmitError("Failed to send message. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Form field animation
  const inputVariants = {
    rest: { borderColor: "rgba(129, 140, 248, 0.2)" },
    hover: { borderColor: "rgba(129, 140, 248, 0.5)", transition: { duration: 0.3 } },
    focus: { borderColor: "rgba(129, 140, 248, 1)", boxShadow: "0 0 0 3px rgba(129, 140, 248, 0.2)", transition: { duration: 0.3 } }
  };

  return (
    <section 
      id="contact" 
      className="pt-12 pb-24 px-4 md:px-8 bg-gray-900 text-white relative overflow-hidden"
      ref={sectionRef}
      style={{ willChange: 'transform' }}
    >
      {/* Background decorative elements with optimized parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl"
          style={{ 
            y: bgY1,
            willChange: 'transform'
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-400/10 rounded-full blur-2xl"
          style={{ 
            y: bgY2,
            willChange: 'transform'
          }}
        />
        <div 
          ref={circleRef}
          className="absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-400/5 rounded-full blur-xl"
          style={{ willChange: 'transform' }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section header with optimized animations */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Get In <motion.span 
              className="text-indigo-400 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
            >Touch</motion.span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-indigo-400 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          ></motion.div>
          <motion.p 
            className="text-xl text-white/70 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            Have a question or want to work together? Drop me a message!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info with optimized parallax */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -50], { clamp: true }),
              willChange: 'transform'
            }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-white/70 mb-6">
                Feel free to reach out to me using any of the methods below. I'm always open to new opportunities and collaborations.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-indigo-400/20 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Email</h4>
                <a href="mailto:your.email@example.com" className="text-indigo-400 hover:underline">salviparmar11@gmail.com</a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-indigo-400/20 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Phone</h4>
                <p className="text-white/70">+91 9925754140</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-indigo-400/20 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Location</h4>
                <p className="text-white/70">Gujarat, India</p>
              </div>
            </motion.div>

            {/* Social Media Links with hover effects */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {/* GitHub */}
                <motion.a 
                  href="https://github.com/salviii11/" target="_blank" 
                  className="bg-indigo-400/20 p-3 rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(129, 140, 248, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                
                {/* LinkedIn */}
                <motion.a 
                  href="http://linkedin.com/in/salvi-parmar-05s11" target="_blank"
                  className="bg-indigo-400/20 p-3 rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(129, 140, 248, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
                
                {/* Instagram */}
                <motion.a 
                  href="https://instagram.com/_.sallvi" target="_blank"
                  className="bg-indigo-400/20 p-3 rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(129, 140, 248, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form with optimized animations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -30], { clamp: true }),
              willChange: 'transform'
            }}
          >
            <motion.div 
              className="bg-gray-800/50 border border-indigo-400/10 rounded-xl p-8 shadow-lg"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(129, 140, 248, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-indigo-400 mb-2">Message Sent!</h3>
                  <p className="text-white/70">Thank you for your message. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variants={inputVariants}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="focus"
                      className={`w-full px-4 py-3 bg-gray-800 rounded-lg border focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-indigo-400/20'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      variants={inputVariants}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="focus"
                      className={`w-full px-4 py-3 bg-gray-800 rounded-lg border focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-indigo-400/20'
                      }`}
                      placeholder="Your email"
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-white/80 mb-2">Subject</label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variants={inputVariants}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="focus"
                      className={`w-full px-4 py-3 bg-gray-800 rounded-lg border focus:outline-none transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-indigo-400/20'
                      }`}
                      placeholder="Subject"
                    />
                    {errors.subject && <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      variants={inputVariants}
                      initial="rest"
                      whileHover="hover"
                      whileFocus="focus"
                      className={`w-full px-4 py-3 bg-gray-800 rounded-lg border focus:outline-none transition-colors h-32 resize-none ${
                        errors.message ? 'border-red-500' : 'border-indigo-400/20'
                      }`}
                      placeholder="Your message"
                    ></motion.textarea>
                    {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all duration-300 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.div 
                        className="flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </motion.div>
                    ) : "Send Message"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 