'use client';

import { motion } from 'framer-motion';
import { glassCard, glassCardStyle, SPRING } from '@/lib/styles';
import TerminalCard from '@/components/cards/TerminalCard';
import PipelineGraph from '@/components/cards/PipelineGraph';
import MedoCard from '@/components/cards/MedoCard';
import MetricCard from '@/components/cards/MetricCard';

interface GridCellProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function GridCell({ children, className = '', delay = 0 }: GridCellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING, delay }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0px 0px 20px rgba(46,91,255,0.3)',
      }}
      className={`${glassCard} ${className}`}
      style={glassCardStyle}
    >
      {children}
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <div
      className="grid gap-4 p-4 flex-1 min-h-0"
      style={{
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        height: 'calc(100vh - 36px)',
      }}
    >
      {/* Terminal — 2×2 (columns 1-2, rows 1-2) */}
      <GridCell
        className="col-span-2 row-span-2"
        delay={0}
      >
        <TerminalCard />
      </GridCell>

      {/* Pipeline Graph — 1×2 (column 3, rows 1-2) */}
      <GridCell
        className="col-span-1 row-span-2"
        delay={0.05}
      >
        <PipelineGraph />
      </GridCell>

      {/* Medo Card — 1×1 (column 4, row 1) */}
      <GridCell
        className="col-span-1 row-span-1"
        delay={0.10}
      >
        <MedoCard />
      </GridCell>

      {/* Metric A: Reach — 1×1 (column 4, row 2) */}
      <GridCell
        className="col-span-1 row-span-1"
        delay={0.15}
      >
        <MetricCard variant="reach" />
      </GridCell>

      {/* Metric B: Engagement — 1×1 (column 1-?, row 3) */}
      <GridCell
        className="col-span-1 row-span-1"
        delay={0.20}
      >
        <MetricCard variant="engagement" />
      </GridCell>

      {/* Metric C: Revenue — this could span or not */}
      <GridCell
        className="col-span-1 row-span-1"
        delay={0.25}
      >
        <MetricCard variant="revenue" />
      </GridCell>

      {/* Extra cells for visual balance — Signal strength & System health */}
      <GridCell
        className="col-span-1 row-span-1"
        delay={0.30}
      >
        <SignalStrengthCell />
      </GridCell>

      <GridCell
        className="col-span-1 row-span-1"
        delay={0.35}
      >
        <SystemHealthCell />
      </GridCell>
    </div>
  );
}

/* ── Bonus Bento Cells for full grid ──────────────────────────────── */

function SignalStrengthCell() {
  return (
    <div className="h-full flex flex-col justify-between p-5">
      <span
        className="tracking-[0.15em] font-mono"
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}
      >
        SIGNAL STRENGTH
      </span>
      <div className="flex items-end gap-1 mt-2 flex-1 pb-2">
        {[0.3, 0.5, 0.7, 0.9, 1, 0.85, 0.6, 0.95, 0.75, 0.4, 0.8, 1].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4 + i * 0.05, ...SPRING }}
            style={{
              height: `${h * 100}%`,
              background: h > 0.8
                ? 'linear-gradient(to top, #2E5BFF, #ADFF2F)'
                : 'rgba(46,91,255,0.3)',
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="h-px flex-1" style={{ background: 'rgba(46,91,255,0.2)' }} />
        <span className="text-white/20 font-mono" style={{ fontSize: 9 }}>14 CH</span>
      </div>
    </div>
  );
}

function SystemHealthCell() {
  return (
    <div className="h-full flex flex-col justify-between p-5">
      <span
        className="tracking-[0.15em] font-mono"
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}
      >
        SYSTEM HEALTH
      </span>
      <div className="flex flex-col gap-2 mt-3">
        {[
          { label: 'CPU', value: 34, color: '#2E5BFF' },
          { label: 'MEM', value: 62, color: '#ADFF2F' },
          { label: 'NET', value: 88, color: '#FFB800' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="font-mono text-white/40 w-8" style={{ fontSize: 9 }}>
              {item.label}
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                style={{ background: item.color }}
              />
            </div>
            <span className="font-mono text-white/50 w-8 text-right" style={{ fontSize: 9 }}>
              {item.value}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div className="w-2 h-2 rounded-full bg-hyper-lime animate-pulse" />
        <span className="text-white/30 font-mono" style={{ fontSize: 9 }}>
          ALL SYSTEMS NOMINAL
        </span>
      </div>
    </div>
  );
}
