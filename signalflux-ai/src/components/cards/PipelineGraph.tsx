'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgentState } from '@/context/AgentStateContext';
import { SPRING, glassCardStyle } from '@/lib/styles';
import { randomTrend, randomPct } from '@/lib/agent-utils';

const NODES = [
  { label: 'X / IG Scout', id: 0 },
  { label: 'Medo Filter', id: 1 },
  { label: 'Script Brain', id: 2 },
  { label: 'Video Renderer', id: 3 },
  { label: 'Auto-Post', id: 4 },
];

const NODE_SPACING = 64;
const NODE_SIZE = 40;
const CENTER_X = 80;
const START_Y = 40;

function generateTraceData(): Record<string, string | number> {
  return {
    medo_job_id: `flx-${String(Math.floor(Math.random() * 90000 + 10000))}`,
    input_signal: `${randomTrend()} +${randomPct()}%`,
    filter_result: 'APPROVED',
    confidence: parseFloat((Math.random() * 0.06 + 0.91).toFixed(2)),
    processing_time_ms: Math.floor(Math.random() * 250 + 200),
    output: 'Script synthesis triggered',
  };
}

export default function PipelineGraph() {
  const { activeNode } = useAgentState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [traceData, setTraceData] = useState<Record<string, string | number>>(generateTraceData);

  const handleMedoClick = useCallback(() => {
    setTraceData(generateTraceData());
    setDrawerOpen(true);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDrawerOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="h-full flex flex-col p-5">
        {/* Header */}
        <span
          className="tracking-[0.15em] font-mono font-medium mb-5"
          style={{ fontSize: 10, color: '#2E5BFF' }}
        >
          PIPELINE TOPOLOGY
        </span>

        <div className="flex-1 flex items-center justify-center">
          <svg
            width="160"
            height={START_Y * 2 + NODE_SPACING * 4}
            viewBox={`0 0 160 ${START_Y * 2 + NODE_SPACING * 4}`}
          >
            {/* Connector lines */}
            {NODES.slice(0, -1).map((node, i) => {
              const y1 = START_Y + i * NODE_SPACING + NODE_SIZE / 2;
              const y2 = START_Y + (i + 1) * NODE_SPACING + NODE_SIZE / 2;
              return (
                <g key={`conn-${node.id}`}>
                  <line
                    x1={CENTER_X}
                    y1={y1}
                    x2={CENTER_X}
                    y2={y2}
                    stroke="rgba(46,91,255,0.25)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                  {/* Traveling dot */}
                  {activeNode === i && (
                    <circle r={3} fill="#2E5BFF">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={`M${CENTER_X},${y1} L${CENTER_X},${y2}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const y = START_Y + i * NODE_SPACING;
              const isActive = activeNode === i;
              const isMedo = i === 1;

              return (
                <g
                  key={node.id}
                  style={{ cursor: isMedo ? 'pointer' : 'default' }}
                  onClick={isMedo ? handleMedoClick : undefined}
                >
                  {/* Glow for active Medo */}
                  {isActive && isMedo && (
                    <circle
                      cx={CENTER_X}
                      cy={y + NODE_SIZE / 2}
                      r={NODE_SIZE / 2 + 8}
                      fill="none"
                      stroke="rgba(46,91,255,0.4)"
                      strokeWidth={2}
                      opacity={0.6}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;0.8;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Node circle */}
                  <circle
                    cx={CENTER_X}
                    cy={y + NODE_SIZE / 2}
                    r={NODE_SIZE / 2}
                    fill={isActive ? 'rgba(46,91,255,0.25)' : 'rgba(46,91,255,0.05)'}
                    stroke="#2E5BFF"
                    strokeWidth={1.5}
                    opacity={isActive ? 1 : 0.35}
                    style={{
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      transformOrigin: `${CENTER_X}px ${y + NODE_SIZE / 2}px`,
                      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s',
                    }}
                  />

                  {/* Node label */}
                  <text
                    x={CENTER_X + NODE_SIZE / 2 + 14}
                    y={y + NODE_SIZE / 2 + 4}
                    fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: '0.05em',
                      transition: 'fill 0.3s',
                    }}
                  >
                    {node.label}
                  </text>

                  {/* Node index */}
                  <text
                    x={CENTER_X}
                    y={y + NODE_SIZE / 2 + 4}
                    textAnchor="middle"
                    fill={isActive ? '#2E5BFF' : 'rgba(46,91,255,0.4)'}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      fontWeight: 500,
                      transition: 'fill 0.3s',
                    }}
                  >
                    {i}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── Medo Execution Trace Drawer ─────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={SPRING}
              className="fixed top-0 right-0 h-full z-50 p-6 flex flex-col"
              style={{
                width: 380,
                ...glassCardStyle,
                borderRadius: 0,
                borderLeft: '1px solid rgba(46,91,255,0.3)',
                background: 'linear-gradient(135deg, rgba(5,5,5,0.97) 0%, rgba(10,10,30,0.98) 100%)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className="font-mono tracking-[0.15em]"
                  style={{ fontSize: 10, color: '#2E5BFF' }}
                >
                  MEDO EXECUTION TRACE
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-white/40 hover:text-white transition-colors text-lg"
                >
                  ×
                </button>
              </div>

              <div
                className="flex-1 overflow-y-auto"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  lineHeight: 2,
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{'{'}</span>
                {Object.entries(traceData).map(([key, value]) => (
                  <div key={key} className="pl-4">
                    <span style={{ color: '#2E5BFF' }}>&quot;{key}&quot;</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
                    <span
                      style={{
                        color:
                          key === 'filter_result'
                            ? '#ADFF2F'
                            : typeof value === 'number'
                            ? '#FFB800'
                            : 'rgba(255,255,255,0.85)',
                      }}
                    >
                      {typeof value === 'string' ? `"${value}"` : value}
                    </span>
                  </div>
                ))}
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{'}'}</span>
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-white/30 font-mono" style={{ fontSize: 10 }}>
                  Click Medo Filter node to refresh trace
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
