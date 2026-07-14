import React from 'react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { PremiumPanchang } from './components/sections/PremiumPanchang';
import { WhyChooseAstroVed } from './components/sections/WhyChooseAstroVed';
import { LiveHorologicalStream } from './components/unwantedsections/LiveHorologicalStream';
import { SpecialEvents } from './components/sections/SpecialEvents';
import { AIReports } from './components/sections/AIReports';
import { TrustTicker } from './components/sections/TrustTicker';
import { UptimesDowntimes } from './components/unwantedsections/UptimesDowntimes';
import { PersonalGuidance } from './components/sections/PersonalGuidance';
import { TimingEvaluation } from './components/unwantedsections/TimingEvaluation';
import { TrustStats } from './components/sections/TrustStats';
import { PersonalizedSolutions } from './components/sections/PersonalizedSolutions';
import { PersonalizedSupport } from './components/sections/PersonalizedSupport';
import { RitualAnimatedBeam } from './components/unwantedsections/RitualAnimatedBeam';
import { AncestralHealing } from './components/unwantedsections/AncestralHealing';
import { DailyRadar } from './components/sections/DailyRadar';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { LeadCapture } from './components/unwantedsections/LeadCapture';
import { Footer } from './components/sections/Footer';
import { scrollToSection } from './utils/scroll';
import ClickSpark from './components/ui/ClickSpark';
import { ScrollToTop } from './components/ui/ScrollToTop';

import { HoverGlow } from './components/ui/HoverGlow';
import Particles from './components/ui/Particles';

const particleColors = ['#f59e0b', '#8b5cf6', '#e0e7ff'];

function ParticlesBackground() {
    const { theme } = useTheme();
    return (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-50 dark:opacity-100">
            <Particles
                particleColors={particleColors}
                particleCount={theme === 'dark' ? 100 : 30}
                particleSpread={12}
                speed={0.15}
                particleBaseSize={300}
                moveParticlesOnHover={true}
                particleHoverFactor={3.5}
                alphaParticles={true}
                disableRotation={false}
                sizeRandomness={1.5}
                cameraDistance={25}
            />
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <HoverGlow />
            <ScrollToTop />
            <ClickSpark sparkColor="#f59e0b" sparkSize={12} sparkRadius={24} sparkCount={12} duration={500} />
            <div className="min-h-screen bg-ivory dark:bg-[#0c0f24] text-midnight dark:text-cream font-sans selection:bg-gold/30 selection:text-midnight dark:selection:text-cream transition-colors duration-200 relative overflow-x-hidden">

                {/* Abstract global glowing orbs */}
                <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/10 dark:bg-gold/5 blur-[120px] pointer-events-none z-0" />
                <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple/10 dark:bg-indigo/10 blur-[150px] pointer-events-none z-0" />

                {/* Global Particles Background Layer */}
                <ParticlesBackground />

                <Navbar />

                <main className="relative z-10">
                    {/* <HeroSection /> */}
                    <SpecialEvents />
                    <PersonalGuidance />
                    <PersonalizedSolutions />
                    <PersonalizedSupport />
                    {/* <UptimesDowntimes /> */}
                    {/* <LiveHorologicalStream /> */}
                    {/* <RitualAnimatedBeam /> */}
                    <PremiumPanchang />
                    <WhyChooseAstroVed />
                    <AIReports />
                    <TrustTicker />
                    <DailyRadar onCalculateChart={(zodiac) => { scrollToSection('birth-form'); }} />
                    {/* <AncestralHealing /> */}
                    {/* <TimingEvaluation /> */}
                    <Testimonials />
                    <TrustStats />
                    {/* <LeadCapture /> */}
                    <FAQ />
                </main>

                <Footer />

            </div>
        </ThemeProvider>
    );
}
