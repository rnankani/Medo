'use client';

import LiveTicker from '@/components/LiveTicker';
import Sidebar from '@/components/Sidebar';
import BentoGrid from '@/components/BentoGrid';
import ToastSystem from '@/components/ToastSystem';

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-rich-black">
      {/* Live intelligence ticker — full width */}
      <LiveTicker />

      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <Sidebar />

        {/* Dashboard grid */}
        <main className="flex-1 min-h-0 overflow-hidden">
          <BentoGrid />
        </main>
      </div>

      {/* Toast overlay */}
      <ToastSystem />
    </div>
  );
}
