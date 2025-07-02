import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Examples = () => {
  const basicAnimRef = useRef(null);
  const staggerRef = useRef(null);
  const timelineRef = useRef(null);
  const svgRef = useRef(null);
  
  // Example code snippets
  const basicCode = `import { motion } from 'framer-motion';

<motion.div
  animate={{
    x: 250,
    rotate: 360,
    backgroundColor: '#FF69B4',
    borderRadius: '50%'
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut'
  }}
/>`;

  const staggerCode = `import { motion, stagger } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: [0, -40, 0],
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

<motion.div
  variants={container}
  initial="hidden"
  animate="show"
>
  {items.map((item, index) => (
    <motion.div key={index} variants={item} />
  ))}
</motion.div>`;

  const timelineCode = `import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

function SequentialAnimation() {
  const controls = useAnimation();
  
  useEffect(() => {
    const sequence = async () => {
      // First animation
      await controls.start({
        x: 250,
        backgroundColor: '#FF69B4',
        transition: { duration: 0.75 }
      });
      
      // Second animation
      await controls.start({
        y: 50,
        backgroundColor: '#7B68EE',
        transition: { duration: 0.75 }
      });
      
      // Third animation
      await controls.start({
        x: 0,
        y: 0,
        backgroundColor: '#FFF',
        transition: { duration: 0.75 }
      });
      
      // Repeat
      sequence();
    };
    
    sequence();
  }, [controls]);
  
  return <motion.div animate={controls} />;
}`;

  const svgCode = `import { motion } from 'framer-motion';

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { 
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

<motion.path
  d="..."
  variants={pathVariants}
  initial="hidden"
  animate="visible"
  stroke="..."
  strokeWidth="2"
  fill="none"
/>`;

  // Basic animation state
  const [basicPlaying, setBasicPlaying] = useState(true);
  const basicControls = useAnimation();
  
  // Start/stop basic animation
  const toggleBasicAnimation = (action) => {
    if (action === 'play') {
      setBasicPlaying(true);
      basicControls.start({
        x: 250,
        rotate: 360,
        backgroundColor: '#FF69B4',
        borderRadius: '50%',
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      });
    } else if (action === 'pause') {
      setBasicPlaying(false);
      basicControls.stop();
    } else if (action === 'restart') {
      setBasicPlaying(true);
      basicControls.start({
        x: 0,
        rotate: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: '0%',
        transition: { duration: 0 }
      });
      setTimeout(() => {
        basicControls.start({
          x: 250,
          rotate: 360,
          backgroundColor: '#FF69B4',
          borderRadius: '50%',
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }
        });
      }, 50);
    }
  };
  
  // Start basic animation on mount
  useEffect(() => {
    if (basicPlaying) {
      basicControls.start({
        x: 250,
        rotate: 360,
        backgroundColor: '#FF69B4',
        borderRadius: '50%',
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      });
    }
  }, [basicPlaying, basicControls]);
  
  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    show: (custom) => ({
      opacity: 1,
      y: [0, -40, 0],
      scale: [1, custom, 1],
      backgroundColor: custom === 1.5 ? '#FF69B4' : custom === 1.8 ? '#7B68EE' : '#00BFFF',
      borderRadius: ['0%', '50%', '0%'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    })
  };
  
  // Stagger animation state
  const [staggerPlaying, setStaggerPlaying] = useState(true);
  const staggerControls = useAnimation();
  
  // Toggle stagger animation
  const toggleStaggerAnimation = (action) => {
    if (action === 'play') {
      setStaggerPlaying(true);
      staggerControls.start('show');
    } else if (action === 'pause') {
      setStaggerPlaying(false);
      staggerControls.stop();
    } else if (action === 'restart') {
      setStaggerPlaying(true);
      staggerControls.start('hidden');
      setTimeout(() => {
        staggerControls.start('show');
      }, 50);
    }
  };
  
  // Start stagger animation on mount
  useEffect(() => {
    if (staggerPlaying) {
      staggerControls.start('show');
    }
  }, [staggerPlaying, staggerControls]);
  
  // Timeline animation
  const [timelinePlaying, setTimelinePlaying] = useState(true);
  const [timelineStep, setTimelineStep] = useState(0);
  const timelineControls = useAnimation();
  
  // Handle timeline animation
  useEffect(() => {
    let interval;
    if (timelinePlaying) {
      const runSequence = async () => {
        // Box 1
        await timelineControls.start({
          x: 250,
          backgroundColor: '#FF69B4',
          transition: { duration: 0.75, ease: 'easeOut' }
        });
        setTimelineStep(1);
        
        // Box 2
        await timelineControls.start({
          x: 250,
          backgroundColor: '#7B68EE',
          transition: { duration: 0.75, ease: 'easeOut' }
        });
        setTimelineStep(2);
        
        // Box 3
        await timelineControls.start({
          x: 250,
          backgroundColor: '#00BFFF',
          transition: { duration: 0.75, ease: 'easeOut' }
        });
        setTimelineStep(3);
        
        // Reset
        await timelineControls.start({
          x: 0,
          backgroundColor: '#FFFFFF',
          transition: { duration: 0.75, ease: 'easeOut' }
        });
        setTimelineStep(0);
      };
      
      interval = setInterval(() => {
        runSequence();
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [timelinePlaying, timelineControls]);
  
  // Toggle timeline animation
  const toggleTimelineAnimation = (action) => {
    if (action === 'play') {
      setTimelinePlaying(true);
    } else if (action === 'pause') {
      setTimelinePlaying(false);
      timelineControls.stop();
    } else if (action === 'restart') {
      setTimelinePlaying(false);
      timelineControls.start({
        x: 0,
        backgroundColor: '#FFFFFF',
        transition: { duration: 0 }
      });
      setTimelineStep(0);
      setTimeout(() => {
        setTimelinePlaying(true);
      }, 50);
    }
  };
  
  // SVG animation
  const [svgPlaying, setSvgPlaying] = useState(true);
  
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  // Toggle SVG animation
  const toggleSvgAnimation = (action) => {
    if (action === 'play') {
      setSvgPlaying(true);
    } else if (action === 'pause') {
      setSvgPlaying(false);
    } else if (action === 'restart') {
      setSvgPlaying(false);
      setTimeout(() => {
        setSvgPlaying(true);
      }, 50);
    }
  };

  // Animation example component
  const AnimationExample = ({ title, code, demoRef, controlClass, toggleAnimation, children }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="animation-example bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-12"
    >
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      </div>
      <div ref={demoRef} className="demo-container p-6 border-b border-gray-700 bg-gray-900 flex justify-center items-center h-48">
        {children}
      </div>
      <div className="p-4 flex justify-center space-x-4 border-b border-gray-700">
        <button 
          className={`px-4 py-2 bg-indigo-400 text-white rounded hover:bg-indigo-500 transition-colors`}
          onClick={() => toggleAnimation('play')}
        >
          Play
        </button>
        <button 
          className={`px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors`}
          onClick={() => toggleAnimation('pause')}
        >
          Pause
        </button>
        <button 
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors`}
          onClick={() => toggleAnimation('restart')}
        >
          Restart
        </button>
      </div>
      <div className="p-6 bg-[#282C34]">
        <SyntaxHighlighter language="javascript" style={atomOneDark} wrapLines>
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );

  return (
    <section id="examples" className="bg-gray-900 py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Examples</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See Framer Motion in action with these interactive examples
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimationExample 
            title="Basic Animation" 
            code={basicCode} 
            demoRef={basicAnimRef}
            toggleAnimation={toggleBasicAnimation}
          >
            <motion.div 
              className="w-16 h-16 bg-white"
              animate={basicControls}
            />
          </AnimationExample>
          
          <AnimationExample 
            title="Staggering Animation" 
            code={staggerCode} 
            demoRef={staggerRef}
            toggleAnimation={toggleStaggerAnimation}
          >
            <motion.div 
              className="flex space-x-4"
              variants={containerVariants}
              initial="hidden"
              animate={staggerControls}
            >
              {[1.5, 1.8, 1.3, 1.6, 1.4, 1.7, 1.2, 1.9].map((scale, i) => (
                <motion.div 
                  key={i} 
                  className="w-6 h-6 bg-white"
                  variants={itemVariants}
                  custom={scale}
                />
              ))}
            </motion.div>
          </AnimationExample>
          
          <AnimationExample 
            title="Sequential Animation" 
            code={timelineCode} 
            demoRef={timelineRef}
            toggleAnimation={toggleTimelineAnimation}
          >
            <div className="flex flex-col space-y-4">
              <motion.div 
                className={`w-16 h-16 ${timelineStep === 1 ? 'bg-indigo-400' : 'bg-white'}`}
                animate={timelineStep === 1 ? { x: 250 } : { x: 0 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
              />
              <motion.div 
                className={`w-16 h-16 ${timelineStep === 2 ? 'bg-purple-500' : 'bg-white'}`}
                animate={timelineStep === 2 ? { x: 250 } : { x: 0 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
              />
              <motion.div 
                className={`w-16 h-16 ${timelineStep === 3 ? 'bg-blue-400' : 'bg-white'}`}
                animate={timelineStep === 3 ? { x: 250 } : { x: 0 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
              />
            </div>
          </AnimationExample>
          
          <AnimationExample 
            title="SVG Animation" 
            code={svgCode} 
            demoRef={svgRef}
            toggleAnimation={toggleSvgAnimation}
          >
            <svg className="w-48 h-48" viewBox="0 0 200 200">
              <AnimatePresence>
                {svgPlaying && (
                  <>
                    <motion.path
                      fill="none"
                      stroke="#FF69B4"
                      strokeWidth="2"
                      d="M50,100 C50,55 150,55 150,100 C150,145 50,145 50,100 Z"
                      variants={pathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.path
                      fill="none"
                      stroke="#7B68EE"
                      strokeWidth="2"
                      d="M100,50 C55,50 55,150 100,150 C145,150 145,50 100,50 Z"
                      variants={pathVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.15 }}
                    />
                    <motion.path
                      fill="none"
                      stroke="#00BFFF"
                      strokeWidth="2"
                      d="M75,75 C50,50 150,50 125,75 C150,100 150,150 125,125 C100,150 50,150 75,125 C50,100 50,50 75,75 Z"
                      variants={pathVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </svg>
          </AnimationExample>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="https://www.framer.com/motion/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-indigo-400 text-white font-medium rounded-md hover:bg-indigo-500 transition-colors"
          >
            View Documentation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Examples; 