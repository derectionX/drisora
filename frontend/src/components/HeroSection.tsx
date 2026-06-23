import { motion } from 'framer-motion';
import heroVideo from '@/assets/hero-video.mp4';

const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Drisora luxury jewelry cinematic background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.12) translate(-3%, -3%)', transformOrigin: 'center center' }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.20)' }} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl md:text-5xl font-light tracking-[0.15em] text-primary-foreground mb-6"
        >
          Quiet Luxury, Bold Presence.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans text-sm md:text-base tracking-[0.25em] uppercase text-primary-foreground/80 mb-10"
        >
          Modern jewelry for everyday elegance.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={scrollToProducts}
          className="px-10 py-3 border border-primary-foreground/60 text-primary-foreground font-sans text-xs tracking-[0.2em] uppercase hover:bg-primary-foreground hover:text-primary transition-all duration-300"
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
