'use client';

import { motion } from 'framer-motion';
import { glassCardStyle, SPRING } from '@/lib/styles';
import LiveTicker from '@/components/LiveTicker';
import Sidebar from '@/components/Sidebar';
import ToastSystem from '@/components/ToastSystem';

interface StubPageProps {
  title: string;
}

export default function StubPage({ title }: StubPageProps) {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-rich-black">
      <LiveTicker />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-h-0 overflow-hidden flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            className="text-center p-12 max-w-md w-full"
            style={glassCardStyle}
          >
            <span
              className="font-mono tracking-[0.15em] block mb-4"
              style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}
            >
              SIGNALFLUX MODULE
            </span>
            <h1
              className="font-mono font-medium mb-3"
              style={{ fontSize: 24, color: '#2E5BFF' }}
            >
              {title}
            </h1>
            <p
              className="font-mono"
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}
            >
              Coming Soon
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
            </div>
          </motion.div>
        </main>
      </div>
      <ToastSystem />
    </div>
  );
}
