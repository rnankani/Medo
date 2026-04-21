export const TREND_POOL = [
  '#QuantumDot_Display', '#MedoAI', '#NeuralFashion', '#AIRobotics',
  '#MacBookM5Pro', '#DeAnzaARC', '#SynthWave2026', '#BioChipLeaked',
  '#ZeroLatencyAR', '#FusionEnergyBreach', '#AGI_Signals', '#CryptoFlux',
  '#HoloLens3Drop', '#NvidiaB3Series', '#OpenSourceLLM'
];

export const randomTrend = (): string =>
  TREND_POOL[Math.floor(Math.random() * TREND_POOL.length)];

export const randomPct = (): number =>
  Math.floor(Math.random() * 800 + 120);

export const randomRevenueTick = (): number =>
  parseFloat((Math.random() * 0.35 + 0.05).toFixed(2));
