'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SPRING, glassCardStyle } from '@/lib/styles';
import { randomTrend, randomPct } from '@/lib/agent-utils';

interface Toast {
  id: string;
  trend: string;
  pct: number;
}

export default function ToastSystem() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idCounter = useRef(0);

  const spawnToast = useCallback(() => {
    const newToast: Toast = {
      id: `toast-${Date.now()}-${idCounter.current++}`,
      trend: randomTrend(),
      pct: randomPct(),
    };

    setToasts((prev) => {
      const updated = [newToast, ...prev];
      return updated.slice(0, 3);
    });

    /* Auto-dismiss after 5000ms */
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 5000);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnToast, 18000);
    /* Spawn first toast a bit earlier for demo */
    const initial = setTimeout(spawnToast, 6000);
    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, [spawnToast]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div
      className="fixed z-50 flex flex-col gap-2"
      style={{ bottom: 24, right: 24 }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={SPRING}
            className="relative p-4 min-w-[300px]"
            style={{
              ...glassCardStyle,
              background: 'linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(5,5,15,0.98) 100%)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => dismiss(toast.id)}
              className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors"
            >
              <X size={14} />
            </button>

            {/* Header */}
            <div
              className="font-mono tracking-[0.08em] mb-2"
              style={{ fontSize: 11, color: '#FFB800' }}
            >
              ⚡ HEAT SIGNATURE INTERCEPTED
            </div>

            {/* Body */}
            <div
              className="font-mono"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}
            >
              {toast.trend} — Rising {toast.pct}%/hr
            </div>

            {/* Sub */}
            <div
              className="font-mono mt-1"
              style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}
            >
              Synthesizing response...
            </div>

            {/* Accent line */}
            <motion.div
              className="absolute bottom-0 left-4 right-4 h-px"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: 'linear' }}
              style={{
                background: 'linear-gradient(90deg, #FFB800, transparent)',
                transformOrigin: 'left',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
