import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, AlertCircle, MailOpen, Flower2, Sparkles, Flower } from 'lucide-react';

import mainVideo from './assets/videos/main.mp4';
import img1 from './assets/images/1.jpg';
import img2 from './assets/images/2.jpg';
import img3 from './assets/images/3.jpg';
import img4 from './assets/images/4.jpg';

const photos = [img1, img2, img3, img4];

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => setVideoError(true));
    }
  }, [showVideo]);

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
    else setShowVideo(true);
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 flex items-center justify-center p-4 overflow-hidden ${showVideo ? 'bg-black' : 'bg-[#0a192f]'}`}>
      
      {/* Decoración de fondo: Flores flotando */}
      {!showVideo && (
        <div className="fixed inset-0 pointer-events-none">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 text-sky-400/30"><Flower2 size={40} /></motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-20 right-10 text-blue-400/30"><Flower size={30} /></motion.div>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-1/4 right-20 text-sky-300/20"><Sparkles size={25} /></motion.div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showVideo ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-[3rem] shadow-[0_0_60px_rgba(56,189,248,0.4)] p-8 text-center border-b-8 border-sky-200 z-10 relative"
          >
            {currentStep === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="relative inline-block">
                  <MailOpen size={80} className="text-sky-600 mx-auto" />
                  <Heart className="absolute -top-2 -right-2 text-blue-500 fill-blue-500 animate-pulse" size={24} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Nuestra Historia</h2>
                <div className="max-h-64 overflow-y-auto px-2 text-left space-y-4 custom-scrollbar">
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {/* Aquí pones tu texto largo */}
                    Desde el primer día que te vi, supe que serías alguien especial... (reemplaza con tu texto real)
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <div className="py-10">
                <div className="flex justify-center mb-6"><Flower2 className="text-sky-500 animate-spin-slow" size={40} /></div>
                <h2 className="text-2xl font-bold text-slate-800">Tú haces mi mundo más brillante</h2>
                
                {/* Fotos que salen de la card */}
                {photos.map((pic, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      scale: 1, 
                      x: i === 0 ? -160 : i === 1 ? 160 : i === 2 ? -150 : 150,
                      y: i === 0 ? -220 : i === 1 ? -240 : i === 2 ? 100 : 120,
                      rotate: i === 0 ? -15 : i === 1 ? 15 : i === 2 ? -5 : 10
                    }}
                    transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-50"
                  >
                    <img 
                      src={pic} 
                      className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-2xl" 
                      alt="Momentos"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            <button 
              onClick={nextStep}
              className="mt-8 group bg-sky-600 hover:bg-sky-700 text-white px-10 py-5 rounded-full font-black flex items-center justify-center gap-3 w-full transition-all shadow-[0_10px_20px_rgba(2,132,199,0.3)] transform active:scale-95"
            >
              <span className="uppercase tracking-widest">{currentStep === 0 ? "Ver Fotos" : "Abrir mi Corazón"}</span>
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        ) : (
          /* MODO CINE */
          <motion.div 
            key="cinema" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 flex flex-col items-center justify-center z-[100] bg-black"
          >
            {videoError ? (
              <div className="text-sky-300 flex flex-col items-center gap-4 text-center p-6">
                <AlertCircle size={60} />
                <p className="text-xl font-bold">¡Lo siento! El video no se pudo cargar.</p>
                <p className="text-sm opacity-60 italic">Verifica: src/assets/videos/main.mp4</p>
              </div>
            ) : (
              <div className="w-full max-w-[90vw] md:max-w-md h-[80vh] relative shadow-[0_0_100px_rgba(56,189,248,0.3)]">
                <video 
                  ref={videoRef}
                  className="w-full h-full rounded-3xl object-cover"
                  controls
                  playsInline
                >
                  <source src={mainVideo} type="video/mp4" />
                </video>
              </div>
            )}
            <button 
              onClick={() => { setShowVideo(false); setCurrentStep(0); setVideoError(false); }}
              className="mt-8 flex items-center gap-2 text-white/40 hover:text-sky-400 transition-all font-bold uppercase text-xs tracking-[0.3em]"
            >
              <Heart size={14} className="fill-current" /> Volver a empezar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}