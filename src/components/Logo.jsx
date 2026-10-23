import { motion } from 'framer-motion';

export default function Logo({ onClick, isDetail }) {
  return (
    <motion.button
      className="brand-mark"
      onClick={onClick}
      aria-label={isDetail ? 'Back to collection' : 'master home'}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.15 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="brand-word">master</span>
      <span className="brand-dot">®</span>
    </motion.button>
  );
}
