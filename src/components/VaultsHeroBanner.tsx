import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images directly
import bannerImg1 from '../assets/vaults_hero_banners/image_01.png';
import bannerImg2 from '../assets/vaults_hero_banners/image_02.png';
import bannerImg3 from '../assets/vaults_hero_banners/image_03.png';

const bannerImages = [
  bannerImg1,
  bannerImg2,
  bannerImg3
];

// getImageUrl function is no longer needed with direct imports
// const getImageUrl = (path: string) => { ... };

export default function VaultsHeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
  };

  useEffect(() => {
    if (bannerImages.length <= 1) return; // Don't start timer if only one or no images
    const timer = setTimeout(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, bannerImages.length]); // Add bannerImages.length to dependencies

  // Variants for image animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    if (newDirection > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
    }
  };

  if (bannerImages.length === 0) {
    return null; // Don't render anything if there are no images
  }

  return (
    <div className="relative w-full overflow-hidden mb-12 group" style={{ paddingTop: '28.125%' /* 32:9 Aspect Ratio (9/32 * 100) */ }}>
      <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
        <motion.img
          key={currentIndex} // Important for AnimatePresence to detect changes
          src={bannerImages[currentIndex]} // Use the imported image variable directly
          alt={`Hero Banner ${currentIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
        />
      </AnimatePresence>

      {bannerImages.length > 1 && (
        <>
          <button 
            onClick={() => paginate(-1)}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-30 z-10"
            disabled={isAnimating}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => paginate(1)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-30 z-10"
            disabled={isAnimating}
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-primary-400 scale-125' : 'bg-white/50 hover:bg-white'}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 