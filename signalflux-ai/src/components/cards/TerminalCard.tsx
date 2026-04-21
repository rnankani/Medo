'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgentState, type AgentLogEvent } from '@/context/AgentStateContext';

function formatTime(ts: number): string {
  const d = new Date(ts);
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');
}

function LogLine({ event }: { event: AgentLogEvent }) {
  const colorMap: Record<AgentLogEvent['type'], string> = {
    info: 'rgba(255,255,255,0.85)',
    warn: '#FFB800',
    success: '#ADFF2F',
  };

  const prefix: Record<AgentLogEvent['type'], string> = {
    info: '',
    warn: '⚠ ',
    success: '✓ ',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-2 leading-relaxed"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.6 }}
    >
      <span style={{ color: 'rgba(255,255,255,0.3)' }}>[{formatTime(event.timestamp)}]</span>
      <span style={{ color: colorMap[event.type] }}>
        {prefix[event.type]}{event.text}
      </span>
    </motion.div>
  );
}

export default function TerminalCard() {
  const { logs } = useAgentState();
  const scrollRef = useRef<HTMLDivElement>(null);
  const visible = logs.slice(-12);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs.length]);

  return (
    <div className="h-full flex flex-col p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="tracking-[0.15em] font-mono font-medium"
          style={{ fontSize: 10, color: '#2E5BFF' }}
        >
          AGENT TERMINAL
        </span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#2E5BFF' }} />
        </div>
      </div>

      {/* Terminal header line */}
      <div
        className="text-white/40 mb-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
      >
        {'>'} SIGNALFLUX AGENT v2.6.0
      </div>

      {/* Scrollable log area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 scrollbar-thin"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((event) => (
            <LogLine key={event.id} event={event} />
          ))}
        </AnimatePresence>

        {/* Blinking cursor */}
        <div
          className="mt-1"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
        >
          <span className="text-white/30">{'>'} </span>
          <span className="animate-pulse text-cobalt">█</span>
        </div>
      </div>
    </div>
  );
}
