'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { randomTrend, randomPct, randomRevenueTick } from '@/lib/agent-utils';

/* ── Types ─────────────────────────────────────────────────────────── */

export interface AgentLogEvent {
  id: string;
  text: string;
  type: 'info' | 'warn' | 'success';
  timestamp: number;
}

export interface AgentState {
  lastEvent: AgentLogEvent | null;
  activeNode: number;
  revenue: number;
  reach: number;
  engagementRate: number;
  isMilestoneHit: boolean;
  logs: AgentLogEvent[];
}

interface AgentContextValue {
  state: AgentState;
}

/* ── Weighted Log Pool ─────────────────────────────────────────────── */

interface LogTemplate {
  text: () => string;
  type: 'info' | 'warn' | 'success';
  weight: number;
}

const LOG_POOL: LogTemplate[] = [
  { text: () => "Scanning X/Twitter firehose...", type: "info", weight: 3 },
  { text: () => `Signal detected: ${randomTrend()} (+${randomPct()}% velocity)`, type: "info", weight: 3 },
  { text: () => "Cross-referencing Telegram channels...", type: "info", weight: 2 },
  { text: () => `Trend validated: confidence score ${(Math.random() * 0.15 + 0.82).toFixed(2)}`, type: "info", weight: 2 },
  { text: () => "Initiating script synthesis via Brain module...", type: "info", weight: 2 },
  { text: () => "Generating cinematic vertical format (47s hook-optimized)...", type: "info", weight: 2 },
  { text: () => "Rendering 4K video overlay with stock footage...", type: "info", weight: 1 },
  { text: () => "Scheduling cross-platform post sequence...", type: "info", weight: 1 },
  { text: () => "Post successful — affiliate loop activated", type: "success", weight: 2 },
  { text: () => "Revenue event registered: +$0.12 affiliate click", type: "success", weight: 1 },
  { text: () => "⚠ Rate limit on Instagram endpoint — rerouting via mirror node", type: "warn", weight: 2 },
  { text: () => "⚠ Telegram channel gone dark — switching to backup cluster", type: "warn", weight: 1 },
  { text: () => "⚠ Rendering queue at 94% capacity — throttling batch", type: "warn", weight: 1 },
];

const totalWeight = LOG_POOL.reduce((sum, l) => sum + l.weight, 0);

function pickWeightedLog(): LogTemplate {
  let roll = Math.random() * totalWeight;
  for (const entry of LOG_POOL) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return LOG_POOL[0];
}

/* ── Context ───────────────────────────────────────────────────────── */

const defaultState: AgentState = {
  lastEvent: null,
  activeNode: 0,
  revenue: 0,
  reach: 0,
  engagementRate: 8.4,
  isMilestoneHit: false,
  logs: [],
};

export const AgentStateContext = createContext<AgentContextValue>({
  state: defaultState,
});

export function useAgentState(): AgentState {
  return useContext(AgentStateContext).state;
}

/* ── Provider ──────────────────────────────────────────────────────── */

export function AgentStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AgentState>(defaultState);
  const idCounter = useRef(0);

  const tick = useCallback(() => {
    const template = pickWeightedLog();
    const newEvent: AgentLogEvent = {
      id: `evt-${Date.now()}-${idCounter.current++}`,
      text: template.text(),
      type: template.type,
      timestamp: Date.now(),
    };

    setState((prev) => {
      const nextNode = (prev.activeNode + 1) % 5;
      const reachDelta = Math.floor(Math.random() * 800 + 200);
      const engDelta = (Math.random() * 0.2 - 0.1);
      const nextEng = Math.min(12, Math.max(6, prev.engagementRate + engDelta));
      const revDelta = template.type === 'success' ? randomRevenueTick() : 0;
      const nextRevenue = parseFloat((prev.revenue + revDelta).toFixed(2));
      const nextMilestone = prev.isMilestoneHit || nextRevenue >= 100;

      const nextLogs = [...prev.logs, newEvent].slice(-50);

      return {
        lastEvent: newEvent,
        activeNode: nextNode,
        revenue: nextRevenue,
        reach: prev.reach + reachDelta,
        engagementRate: parseFloat(nextEng.toFixed(1)),
        isMilestoneHit: nextMilestone,
        logs: nextLogs,
      };
    });
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function schedule() {
      const delay = Math.floor(Math.random() * 3000 + 5000);
      timeoutId = setTimeout(() => {
        tick();
        schedule();
      }, delay);
    }

    /* Fire first event quickly so UI isn't empty */
    const initialDelay = setTimeout(() => {
      tick();
      schedule();
    }, 800);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeoutId);
    };
  }, [tick]);

  return (
    <AgentStateContext.Provider value={{ state }}>
      {children}
    </AgentStateContext.Provider>
  );
}
