'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useAgentState } from '@/context/AgentStateContext';

export default function MedoCard() {
  const { activeNode } = useAgentState();
  const isActive = activeNode === 1;

  return (
    <motion.div
      className="h-full flex flex-col items-center justify-center p-5 relative"
      animate={{
        boxShadow: isActive
          ? '0px 0px 24px rgba(46,91,255,0.4)'
          : '0px 0px 0px rgba(46,91,255,0)',
      }}
      transition={{ duration: 0.6 }}
      style={{ borderRadius: 16 }}
    >
      {/* Subtitle */}
      <span
        className="tracking-[0.15em] font-mono mb-6"
        style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}
      >
        MEDO VERIFICATION LAYER
      </span>

      {/* Shield icon */}
      <motion.div
        animate={{ color: isActive ? '#ADFF2F' : '#2E5BFF' }}
        transition={{ duration: 0.4 }}
      >
        <ShieldCheck size={32} />
      </motion.div>

      {/* Status text */}
      <div className="mt-4 text-center">
        <span
          className="font-mono"
          style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}
        >
          Verifying data integrity via Medo...
        </span>
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono font-medium ml-2"
              style={{ fontSize: 11, color: '#ADFF2F' }}
            >
              [OK]
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Active pulse ring */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            border: '1px solid rgba(46,91,255,0.3)',
          }}
        />
      )}
    </motion.div>
  );
}
