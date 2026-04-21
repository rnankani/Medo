'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useAgentState } from '@/context/AgentStateContext';

interface MetricCardProps {
  variant: 'reach' | 'engagement' | 'revenue';
}

function formatReach(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}

export default function MetricCard({ variant }: MetricCardProps) {
  const state = useAgentState();
  const controls = useAnimationControls();
  const prevLogsLength = useRef(state.logs.length);
  const prevRevenue = useRef(state.revenue);

  /* Pulse on new log event */
  useEffect(() => {
    if (state.logs.length > prevLogsLength.current) {
      controls.start({
        boxShadow: [
          '0px 0px 0px rgba(46,91,255,0)',
          '0px 0px 20px rgba(46,91,255,0.5)',
          '0px 0px 0px rgba(46,91,255,0)',
        ],
      });
    }
    prevLogsLength.current = state.logs.length;
  }, [state.logs.length, controls]);

  /* Revenue bounce on success */
  const valueControls = useAnimationControls();
  useEffect(() => {
    if (variant === 'revenue' && state.revenue > prevRevenue.current) {
      valueControls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.3 },
      });
    }
    prevRevenue.current = state.revenue;
  }, [state.revenue, variant, valueControls]);

  let label: string;
  let value: string;
  let unit: string;
  let color: string;

  switch (variant) {
    case 'reach':
      label = 'TOTAL REACH';
      value = formatReach(state.reach);
      unit = '';
      color = '#2E5BFF';
      break;
    case 'engagement':
      label = 'ENGAGEMENT RATE';
      value = state.engagementRate.toFixed(1);
      unit = '%';
      color = state.engagementRate > 8 ? '#ADFF2F' : 'rgba(255,255,255,0.85)';
      break;
    case 'revenue':
      label = 'REVENUE TRACKER';
      value = `$${state.revenue.toFixed(2)}`;
      unit = '';
      color = state.isMilestoneHit ? '#ADFF2F' : '#FFB800';
      break;
  }

  const isMilestoneActive = variant === 'revenue' && state.isMilestoneHit;

  return (
    <motion.div
      animate={controls}
      transition={{ duration: 0.6 }}
      className="h-full flex flex-col justify-between p-5 relative"
      style={{ borderRadius: 16 }}
    >
      {/* Label */}
      <span
        className="tracking-[0.15em] font-mono"
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}
      >
        {label}
      </span>

      {/* Value */}
      <motion.div
        animate={valueControls}
        className="mt-2"
      >
        <span
          className="font-mono font-medium"
          style={{ fontSize: 28, color, letterSpacing: '-0.02em' }}
        >
          {value}
        </span>
        {unit && (
          <span
            className="font-mono ml-1"
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}
          >
            {unit}
          </span>
        )}
      </motion.div>

      {/* Bottom accent line */}
      <div className="mt-3 flex items-center gap-2">
        <motion.div
          className="h-px flex-1"
          animate={{
            background: isMilestoneActive
              ? ['rgba(173,255,47,0.6)', 'rgba(173,255,47,1)', 'rgba(173,255,47,0.6)']
              : `rgba(46,91,255,0.2)`,
          }}
          transition={
            isMilestoneActive
              ? { duration: 2, repeat: Infinity }
              : { duration: 0.3 }
          }
        />
        <span className="text-white/20 font-mono" style={{ fontSize: 9 }}>
          LIVE
        </span>
      </div>

      {/* Milestone breathing border */}
      {isMilestoneActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            border: '1px solid #ADFF2F',
          }}
        />
      )}
    </motion.div>
  );
}
