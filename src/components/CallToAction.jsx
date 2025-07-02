import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CallToAction() {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText('npm install framer-motion');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <section id="cta" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#111] to-dark/95 text-white">
      <motion.div 
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Start <span className="text-primary-light">Animating</span> Today
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
          Join thousands of developers using Framer Motion to create stunning animations for websites, 
          applications, and interactive experiences.
        </p>
        
        {/* Installation options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* NPM */}
          <motion.div 
            className="bg-dark/50 border border-primary/10 rounded-xl p-7"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              npm install
            </h3>
            <div className="bg-dark rounded-lg flex overflow-hidden mb-4">
              <div className="flex-grow p-4 font-mono text-white/90 text-left">npm install framer-motion</div>
              <button 
                onClick={handleCopy} 
                className="bg-primary-light/20 px-4 flex items-center hover:bg-primary-light/30 transition-colors"
              >
                {copied ? (
                  <span className="text-primary-light">Copied!</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="text-white/60 text-sm mt-3">
              Then import it into your project:
              <pre className="bg-dark p-3 rounded-md text-left mt-2 overflow-auto">
                <code>{`import { motion } from 'framer-motion';`}</code>
              </pre>
            </div>
          </motion.div>
          
          {/* CDN */}
          <motion.div 
            className="bg-dark/50 border border-primary/10 rounded-xl p-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              CDN Link
            </h3>
            <div className="bg-dark rounded-lg overflow-hidden mb-4">
              <pre className="p-4 font-mono text-white/90 text-left overflow-auto">
                <code>{`<script src="https://unpkg.com/framer-motion/dist/framer-motion.js"></script>`}</code>
              </pre>
            </div>
            <div className="text-white/60 text-sm mt-3">
              Add this to your HTML, then use:
              <pre className="bg-dark p-3 rounded-md text-left mt-2 overflow-auto">
                <code>{`<script>
  const { motion } = window.Motion;
  
  // Create motion component
  const myElement = document.createElement('div');
  document.body.appendChild(myElement);
  
  // Animate element
  Motion.animate(myElement, {
    x: 250
  });
</script>`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
        
        {/* Resources */}
        <h3 className="text-2xl font-semibold mb-6">Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
          {/* GitHub */}
          <a 
            href="https://github.com/framer/motion" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-dark/40 hover:bg-dark/80 border border-primary/10 rounded-lg p-5 transition-colors group"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-dark mx-auto mb-4 group-hover:bg-primary-light/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-light">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-lg mb-1">Source Code</h4>
            <p className="text-white/60 text-sm">View the source code on GitHub</p>
          </a>
          
          {/* Documentation */}
          <a 
            href="#documentation" 
            className="bg-dark/40 hover:bg-dark/80 border border-primary/10 rounded-lg p-5 transition-colors group"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-dark mx-auto mb-4 group-hover:bg-primary-light/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-light">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
            </div>
            <h4 className="font-medium text-lg mb-1">Documentation</h4>
            <p className="text-white/60 text-sm">Read the full documentation</p>
          </a>
          
          {/* Examples */}
          <a 
            href="#examples" 
            className="bg-dark/40 hover:bg-dark/80 border border-primary/10 rounded-lg p-5 transition-colors group"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-dark mx-auto mb-4 group-hover:bg-primary-light/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-light">
                <path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-lg mb-1">Examples</h4>
            <p className="text-white/60 text-sm">Check out interactive examples</p>
          </a>
        </div>
        
        {/* Final CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a 
            href="https://github.com/framer/motion/releases" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-primary to-primary-light text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-shadow"
          >
            Download Latest
          </a>
          <p className="text-white/50 text-sm mt-4">
            Released under the MIT license
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
} 