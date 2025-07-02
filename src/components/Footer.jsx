import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-6 px-6 bg-gray-900 text-white border-t border-indigo-400/10">
      <div className="max-w-7xl mx-auto">
        <motion.p 
          className="text-center text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Designed and built with <span className="text-indigo-400">♥</span> by <span className="text-indigo-400">Salvi Parmar</span>
        </motion.p>
      </div>
    </footer>
  );
} 