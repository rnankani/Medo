'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Radar,
  Film,
  DollarSign,
  Settings,
} from 'lucide-react';
import { SPRING } from '@/lib/styles';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Radar, label: 'Trend Scout', href: '/scout' },
  { icon: Film, label: 'Video Vault', href: '/vault' },
  { icon: DollarSign, label: 'Revenue', href: '/revenue' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.nav
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{ width: expanded ? 260 : 80 }}
      transition={SPRING}
      className="h-screen sticky top-0 flex-shrink-0 flex flex-col py-8"
      style={{
        zIndex: 40,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div className="px-5 mb-10 flex items-center gap-3" style={{ overflow: 'hidden' }}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(46,91,255,0.2)', border: '1px solid rgba(46,91,255,0.4)' }}
        >
          <span className="text-cobalt font-mono font-bold text-sm">SF</span>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="text-white text-sm font-medium tracking-widest whitespace-nowrap"
            >
              SIGNALFLUX
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <motion.ul
        className="flex flex-col gap-1 px-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <motion.li
              key={item.href}
              variants={{
                hidden: { opacity: 0, x: -12 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={SPRING}
            >
              <button
                onClick={() => router.push(item.href)}
                className="w-full flex items-center gap-4 py-3 px-4 rounded-xl transition-colors duration-200"
                style={{
                  background: isActive ? 'rgba(46,91,255,0.1)' : 'transparent',
                  borderLeft: isActive ? '2px solid #2E5BFF' : '2px solid transparent',
                }}
              >
                <Icon
                  size={20}
                  className="flex-shrink-0"
                  style={{ color: isActive ? '#2E5BFF' : 'rgba(255,255,255,0.5)' }}
                />
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm tracking-wide whitespace-nowrap"
                      style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.7)' }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* Bottom indicator */}
      <div className="mt-auto px-5">
        <div className="flex items-center gap-2" style={{ overflow: 'hidden' }}>
          <div className="w-2 h-2 rounded-full bg-hyper-lime animate-pulse flex-shrink-0" />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-mono text-white/40 tracking-widest whitespace-nowrap"
              >
                AGENT ONLINE
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
