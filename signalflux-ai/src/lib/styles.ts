export const glassCardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
  borderTop: '1px solid rgba(255,255,255,0.15)',
  borderLeft: '1px solid rgba(255,255,255,0.10)',
  borderRight: '1px solid rgba(255,255,255,0.05)',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
};

export const glassCard =
  'relative overflow-hidden';

export const SPRING = { type: 'spring' as const, stiffness: 120, damping: 14 };
