import { useState } from "react";
import { motion } from "framer-motion";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "animation", label: "Animation" },
    { id: "timeline", label: "Timeline" },
    { id: "stagger", label: "Stagger" },
    { id: "svg", label: "SVG" },
    { id: "waapi", label: "WAAPI" },
  ];

  return (
    <section id="documentation" className="py-24 px-6 md:px-12 bg-gradient-to-b from-dark/95 to-dark text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary-light">Quick</span> Documentation
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get started quickly with our in-depth documentation.
          </p>
        </motion.div>

        {/* Documentation area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-dark/50 border border-primary/10 rounded-xl p-5">
              <h3 className="text-lg font-bold mb-4 text-white">Documentation</h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-primary-light/20 text-white font-medium"
                          : "text-white/70 hover:text-white hover:bg-primary-light/10"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Bundle size */}
              <div className="mt-8 pt-6 border-t border-primary/10">
                <h4 className="text-sm font-semibold mb-3 text-white">Bundle size</h4>
                <div className="text-white/70 text-sm">
                  <div className="mb-1 flex justify-between">
                    <span>Timer</span>
                    <span className="text-white/50">5.60 KB</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span>Animation</span>
                    <span className="text-white/50">+5.20 KB</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span>Timeline</span>
                    <span className="text-white/50">+0.55 KB</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span>SVG</span>
                    <span className="text-white/50">0.35 KB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-dark/50 border border-primary/10 rounded-xl p-6 md:p-8">
            {activeSection === "getting-started" && (
              <GettingStarted />
            )}
            {activeSection === "animation" && (
              <Animation />
            )}
            {activeSection === "timeline" && (
              <Timeline />
            )}
            {activeSection === "stagger" && (
              <Stagger />
            )}
            {activeSection === "svg" && (
              <Svg />
            )}
            {activeSection === "waapi" && (
              <Waapi />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function GettingStarted() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">Getting Started</h3>
      
      <div className="prose prose-invert max-w-none">
        <h4 className="text-xl font-semibold mb-3">Installation</h4>
        
        <div className="mb-6">
          <p className="mb-3">Install framer-motion with npm:</p>
          <pre className="bg-dark p-4 rounded-md overflow-auto">
            <code>npm install framer-motion</code>
          </pre>
        </div>
        
        <div className="mb-6">
          <p className="mb-3">Or using a CDN:</p>
          <pre className="bg-dark p-4 rounded-md overflow-auto">
            <code>{`<script src="https://unpkg.com/framer-motion/dist/framer-motion.js"></script>`}</code>
          </pre>
        </div>
        
        <h4 className="text-xl font-semibold mb-3">Basic Usage</h4>
        
        <div className="mb-6">
          <p className="mb-3">Import and use framer-motion:</p>
          <pre className="bg-dark p-4 rounded-md overflow-auto">
            <code>{`import { motion } from 'framer-motion';

<motion.div
  animate={{
    x: 250,
    rotate: 360,
    backgroundColor: '#FFF'
  }}
  transition={{
    duration: 0.8,
    ease: "easeInOut"
  }}
/>
`}</code>
          </pre>
        </div>
        
        <h4 className="text-xl font-semibold mb-3">Targets</h4>
        <p className="mb-3">Target elements to animate. Can be:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>CSS Selector</li>
          <li>DOM Element</li>
          <li>NodeList</li>
          <li>JavaScript Object</li>
          <li>Array of the above</li>
        </ul>

        <h4 className="text-xl font-semibold mb-3">Animation Properties</h4>
        <p className="mb-3">You can animate various properties:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>CSS properties</li>
          <li>CSS transforms</li>
          <li>DOM attributes</li>
          <li>SVG attributes</li>
          <li>Object properties</li>
        </ul>
      </div>
    </motion.div>
  );
}

function Animation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">Animation API</h3>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-4">The animation component is the core of framer-motion:</p>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto mb-6">
          <code>{`import { motion } from 'framer-motion';

<motion.div
  animate={{
    x: 250
  }}
  transition={{
    duration: 1,
    ease: [0.17, 0.67, 0.83, 0.67], // Elastic-like easing
    repeat: Infinity,
    repeatType: "reverse"
  }}
  onAnimationStart={() => console.log('animation began')}
  onAnimationComplete={() => console.log('animation completed')}
/>`}</code>
        </pre>
        
        <h4 className="text-xl font-semibold mb-3">Animation Parameters</h4>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><code className="bg-dark/70 px-1 rounded">duration</code>: Duration in milliseconds</li>
          <li><code className="bg-dark/70 px-1 rounded">easing</code>: Easing function</li>
          <li><code className="bg-dark/70 px-1 rounded">delay</code>: Delay in milliseconds</li>
          <li><code className="bg-dark/70 px-1 rounded">loop</code>: Number of times to loop or true for infinite</li>
          <li><code className="bg-dark/70 px-1 rounded">direction</code>: 'normal', 'reverse', 'alternate'</li>
          <li><code className="bg-dark/70 px-1 rounded">autoplay</code>: Whether to start automatically (true by default)</li>
        </ul>
        
        <h4 className="text-xl font-semibold mb-3">Animation Controls</h4>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto">
          <code>{`const animation = animate(targets, { ... });

// Control methods
animation.play();
animation.pause();
animation.restart();
animation.reverse();
animation.seek(500); // Seek to a specific time (in ms)

// Animation info
console.log(animation.duration);
console.log(animation.completed); // Boolean
console.log(animation.progress); // 0-100%`}</code>
        </pre>
      </div>
    </motion.div>
  );
}

function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">Timeline API</h3>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-4">Timelines let you sequence multiple animations:</p>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto mb-6">
          <code>{`const timeline = createTimeline({
  duration: 1000,
  easing: 'easeOutExpo',
  direction: 'alternate',
  loop: true
});

// Add animations
timeline
  .add({
    targets: '.square',
    translateX: 250
  })
  // Relative offset (starts 600ms after the first animation ends)
  .add({
    targets: '.circle',
    translateX: 250
  }, '+=600')
  // Absolute offset (starts at 1800ms from the timeline start)
  .add({
    targets: '.triangle',
    translateX: 250
  }, 1800);`}</code>
        </pre>
        
        <h4 className="text-xl font-semibold mb-3">Timeline Parameters</h4>
        
        <p className="mb-4">Timelines accept the same parameters as regular animations plus timeline-specific parameters.</p>
        
        <h4 className="text-xl font-semibold mb-3">Position Control</h4>
        
        <p className="mb-4">You can control the position of animations in the timeline:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li><code className="bg-dark/70 px-1 rounded">'+=100'</code>: Relative offset after previous animation</li>
          <li><code className="bg-dark/70 px-1 rounded">'-=100'</code>: Relative offset before previous animation ends</li>
          <li><code className="bg-dark/70 px-1 rounded">'&lt;'</code>: Starts at the same time as previous animation</li>
          <li><code className="bg-dark/70 px-1 rounded">'&gt;'</code>: Starts after all previous animations end</li>
          <li><code className="bg-dark/70 px-1 rounded">1000</code>: Absolute time (in ms) from the start of the timeline</li>
        </ul>
      </div>
    </motion.div>
  );
}

function Stagger() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">Stagger</h3>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-4">Stagger delays animations across multiple elements:</p>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto mb-6">
          <code>{`// Basic stagger
animate('.elements', {
  translateX: 250,
  delay: stagger(100) // Delay each element by 100ms
});

// Stagger with configuration
animate('.elements', {
  translateX: 250,
  delay: stagger(100, {
    start: 500,     // Starting delay
    from: 'center', // Direction ('first', 'last', 'center', index)
    grid: [5, 5],   // Grid configuration for 2D staggering
    axis: 'x'       // Axis for 2D staggering
  })
});

// Staggering values
animate('.elements', {
  translateX: stagger(10, {from: 'center', direction: 'reverse'}),
  translateY: stagger([-30, 30]),
  scale: stagger([1.5, 1], {from: 'center'}),
  easing: 'easeInOutSine',
  duration: 750
});`}</code>
        </pre>
        
        <h4 className="text-xl font-semibold mb-3">Grid Staggering</h4>
        
        <p className="mb-4">You can stagger elements in a grid pattern:</p>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto">
          <code>{`animate('.grid-elements', {
  scale: [0, 1],
  delay: stagger(100, {
    grid: [7, 5], // 7 columns, 5 rows
    from: 'center',
    axis: 'x' // Can be 'x', 'y', or undefined for both
  })
});`}</code>
        </pre>
      </div>
    </motion.div>
  );
}

function Svg() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">SVG Animation</h3>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-4">framer-motion provides special features for SVG animation:</p>
        
        <h4 className="text-xl font-semibold mb-3">Line Drawing</h4>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto mb-6">
          <code>{`// Create a drawable
const drawable = createDrawable('.path');

// Animate drawing
animate(drawable, {
  draw: '0 100%', // Start and end percentage of the path
  duration: 2000,
  easing: 'easeInOutSine'
});`}</code>
        </pre>
        
        <h4 className="text-xl font-semibold mb-3">Shape Morphing</h4>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto mb-6">
          <code>{`// Morph from one shape to another
animate('#shape1', {
  d: morphTo('#shape2'),
  duration: 2000,
  easing: 'easeInOutQuad'
});`}</code>
        </pre>
        
        <h4 className="text-xl font-semibold mb-3">Motion Path</h4>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto">
          <code>{`// Create a motion path
const motionPath = createMotionPath('path');

// Animate element following the path
animate('.element', {
  ...motionPath,
  duration: 2000,
  easing: 'linear',
  loop: true
});`}</code>
        </pre>
      </div>
    </motion.div>
  );
}

function Waapi() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">Web Animation API Integration</h3>
      
      <div className="prose prose-invert max-w-none">
        <p className="mb-4">framer-motion leverages the Web Animation API for better performance:</p>
        
        <pre className="bg-dark p-4 rounded-md overflow-auto mb-6">
          <code>{`// Create WAAPI animation
const animation = createAnimation('.element', {
  translateX: 250,
  rotate: '1turn',
  duration: 1000,
  easing: 'easeOutElastic(1, .5)'
});

// Control the animation
animation.play();
animation.pause();
animation.finish();
animation.cancel();

// Get animation state
console.log(animation.isPaused);
console.log(animation.isRunning);
console.log(animation.currentTime);
console.log(animation.playbackRate);`}</code>
        </pre>
        
        <h4 className="text-xl font-semibold mb-3">Benefits of WAAPI</h4>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Hardware acceleration</li>
          <li>Off-main thread animations</li>
          <li>Better performance in some cases</li>
          <li>Native browser API</li>
        </ul>
        
        <p className="mt-4 text-sm text-white/70">Note: WAAPI support varies across browsers. framer-motion provides a fallback for unsupported browsers.</p>
      </div>
    </motion.div>
  );
} 