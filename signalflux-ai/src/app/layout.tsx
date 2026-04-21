import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AgentStateProvider } from "@/context/AgentStateContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SignalFlux AI — Autonomous Social Intelligence",
  description:
    "Real-time agentic dashboard that intercepts trends, synthesizes content, and tracks revenue autonomously.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-rich-black text-white antialiased font-sans overflow-x-hidden">
        <AgentStateProvider>
          {children}
        </AgentStateProvider>
      </body>
    </html>
  );
}
