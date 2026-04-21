'use client';

interface TickerItem {
  text: string;
  color: string;
}

const TICKER_ITEMS: TickerItem[] = [
  { text: '#MedoAI +200% VELOCITY', color: '#ADFF2F' },
  { text: '#QuantumDot_Display TRENDING: TOKYO, SEOUL', color: 'rgba(255,255,255,0.85)' },
  { text: '#AIRobotics +420% VIEW VELOCITY', color: '#ADFF2F' },
  { text: '#MacBookM5Pro SIGNAL: CUPERTINO', color: 'rgba(255,255,255,0.85)' },
  { text: '#DeAnzaARC VIRAL SIGNAL HIGH', color: '#ADFF2F' },
  { text: '#NeuralFashion INTERCEPTED: MILAN', color: 'rgba(255,255,255,0.85)' },
  { text: 'AGENT STATUS: ACTIVE — 14 CHANNELS MONITORED', color: '#2E5BFF' },
  { text: '#AGI_Signals +680% HOURLY', color: '#ADFF2F' },
  { text: 'REVENUE: LIVE TRACKING', color: '#FFB800' },
  { text: '#BioChipLeaked TRENDING: GLOBAL', color: 'rgba(255,255,255,0.85)' },
  { text: '#SynthWave2026 +310% VELOCITY', color: '#ADFF2F' },
  { text: '#CryptoFlux SIGNAL INTERCEPTED: NYC', color: 'rgba(255,255,255,0.85)' },
];

export default function LiveTicker() {
  /* Duplicate array for seamless loop */
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="w-full overflow-hidden flex-shrink-0 flex items-center"
      style={{
        height: 36,
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item.text}-${i}`}
            className="font-mono inline-flex items-center mx-6"
            style={{
              color: item.color,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span
              className="w-1 h-1 rounded-full mr-3 flex-shrink-0"
              style={{ background: item.color, opacity: 0.7 }}
            />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
