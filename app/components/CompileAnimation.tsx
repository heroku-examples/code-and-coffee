import { motion } from 'framer-motion';

const CompileAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-mono text-green-500 text-xl mb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          Analyzing preferences...
        </motion.div>
      </div>
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default CompileAnimation;
