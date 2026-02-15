import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ChevronRight,
  AlertCircle,
  Mail,
  MailOpen,
  Flower2,
  Sparkles,
  Flower,
} from "lucide-react";

import mainVideo from "./assets/videos/main.mp4";
import img1 from "./assets/images/1.jpg";
import img2 from "./assets/images/2.jpg";
import img3 from "./assets/images/3.jpg";
import img4 from "./assets/images/4.jpg";

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
    <div
      className={`min-h-screen transition-all duration-1000 flex items-center justify-center p-4 overflow-hidden ${showVideo ? "bg-black" : "bg-[#0a192f]"}`}
    >
      {!showVideo && (
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-10 left-10 text-sky-400/30"
          >
            <Flower2 size={40} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute bottom-20 right-10 text-blue-400/30"
          >
            <Flower size={30} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-1/4 right-20 text-sky-300/20"
          >
            <Sparkles size={25} />
          </motion.div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {!showVideo ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className={`max-w-md w-full ${currentStep === 0 ? "bg-transparent" : "bg-white/95 backdrop-blur-md rounded-[3rem] p-8 border-b-8 border-sky-200 shadow-[0_0_60px_rgba(56,189,248,0.4)]"} text-center z-10 relative`}
          >
            {currentStep === 0 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="cursor-pointer flex flex-col items-center gap-6"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-sky-500 p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(14,165,233,0.4)] border-4 border-white relative"
                >
                  <Mail size={100} className="text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -top-4 -right-4 bg-red-500 rounded-full p-2"
                  >
                    <Heart size={24} className="text-white fill-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <MailOpen size={60} className="text-sky-600 mx-auto" />
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
                  TAM
                </h2>
                <div className="max-h-64 overflow-y-auto px-2 text-left space-y-4 custom-scrollbar">
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                    Hoy no es solo un día más, es una oportunidad para decirte
                    lo que a veces el día a día nos hace guardar. Quería darte
                    las gracias, desde lo más profundo de mi corazón. Gracias por estar ahí cuando el camino
                    se puso difícil, por creer en mí incluso cuando yo mismo
                    dudaba, y por caminar a mi lado con esa paciencia que solo
                    tú tienes. Mi mayor deseo no es que
                    brilles a mi sombra, sino que brilles sola, con toda la
                    intensidad de la que eres capaz. Quiero verte alcanzar cada
                    una de tus metas. Eres
                    mi Princes, tamito.
                  </p>
                </div>
                <button
                  onClick={nextStep}
                  className="mt-8 cursor-pointer group bg-sky-600 hover:bg-sky-700 text-white px-10 py-5 rounded-full font-black flex items-center justify-center gap-3 w-full transition-all shadow-lg transform active:scale-95"
                >
                  <span className="uppercase tracking-widest text-sm">
                    Ver Fotos
                  </span>
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
            {currentStep === 2 && (
              <div className="py-10">
                <Flower2
                  className="text-sky-500 animate-spin-slow mx-auto mb-4"
                  size={40}
                />
                <h2 className="text-2xl font-black text-slate-800 uppercase">
                  ¿Recuerdas?
                </h2>
                {photos.map((pic, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: 1.3,
                      x: i === 0 ? -190 : i === 1 ? 190 : i === 2 ? -290 : 290,
                      y: i === 0 ? -280 : i === 1 ? -280 : i === 2 ? 160 : 160,
                      rotate: i % 2 === 0 ? -15 : 15,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      delay: i * 0.1,
                    }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 z-50"
                  >
                    <img
                      src={pic}
                      className="w-full h-full object-cover rounded-3xl border-8 border-white shadow-2xl"
                      alt="Love"
                    />
                  </motion.div>
                ))}

                <button
                  onClick={nextStep}
                  className="mt-8 cursor-pointer group bg-sky-600 hover:bg-sky-700 text-white px-10 py-5 rounded-full font-black flex items-center justify-center gap-3 w-full transition-all shadow-lg z-10 relative"
                >
                  <span className="tracking-widest text-sm">
                    Quieres recordar más?
                  </span>
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="cinema"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-100 bg-black"
          >
            {videoError ? (
              <div className="text-sky-300 flex flex-col items-center gap-4 text-center p-6">
                <AlertCircle size={60} />
                <p className="text-xl font-bold italic underline">
                  Error al cargar video en assets/videos/main.mp4
                </p>
              </div>
            ) : (
              <div className="w-full max-w-[90vw] md:max-w-md h-[80vh] relative shadow-[0_0_150px_rgba(56,189,248,0.4)]">
                <video
                  ref={videoRef}
                  className="w-full h-full rounded-3xl object-cover border-2 border-white/20"
                  controls
                  playsInline
                >
                  <source src={mainVideo} type="video/mp4" />
                </video>
              </div>
            )}
            <button
              onClick={() => {
                setShowVideo(false);
                setCurrentStep(0);
                setVideoError(false);
              }}
              className="mt-8 cursor-pointer flex items-center gap-2 text-white/30 hover:text-sky-400 transition-all font-black text-xs tracking-[0.4em]"
            >
              ¿De nuevo?
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
