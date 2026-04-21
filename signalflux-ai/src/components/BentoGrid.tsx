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
        gridTemplateRows: '1fr 1fr auto',
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

      {/* Bottom row — 4 equal metric cells */}
      {/* Metric B: Engagement */}
      <GridCell
        className="col-span-2 row-span-1"
        delay={0.20}
      >
        <MetricCard variant="engagement" />
      </GridCell>

      {/* Metric C: Revenue */}
      <GridCell
        className="col-span-2 row-span-1"
        delay={0.25}
      >
        <MetricCard variant="revenue" />
      </GridCell>
    </div>
  );
}
