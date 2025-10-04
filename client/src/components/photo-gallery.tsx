import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import photo1 from "@assets/WhatsApp Image 2025-10-04 at 9.23.58 AM_1759550067134.jpeg";
import photo2 from "@assets/WhatsApp Image 2025-10-04 at 9.23.57 AM_1759550067134.jpeg";
import photo3 from "@assets/a86c66c0-ac33-499a-b3da-48d30d0ca5f1_1759550074855.jfif";

const photos = [
  { id: 1, src: photo1, alt: "Анастасия 1" },
  { id: 2, src: photo2, alt: "Анастасия 2" },
  { id: 3, src: photo3, alt: "Анастасия 3" },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto" data-testid="photo-gallery">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-5xl md:text-6xl font-bold gradient-text mb-4">
          Галерея Воспоминаний 📸
        </h2>
        <p className="text-xl text-muted-foreground">
          Драгоценные моменты с тобой ✨
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedPhoto(photo.id)}
            data-testid={`photo-${photo.id}`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-primary/20 hover:border-primary/50 transition-all duration-300">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Decorative corners */}
              <motion.div
                className="absolute top-2 left-2 text-2xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute top-2 right-2 text-2xl"
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute bottom-2 left-2 text-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💖
              </motion.div>
              <motion.div
                className="absolute bottom-2 right-2 text-2xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                💖
              </motion.div>
            </div>

            {/* Floating hearts */}
            <motion.div
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl opacity-0 group-hover:opacity-100"
              animate={{ y: [-10, -30, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
          data-testid="lightbox-modal"
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setSelectedPhoto(null)}
            data-testid="close-lightbox"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos.find(p => p.id === selectedPhoto)?.src}
              alt={photos.find(p => p.id === selectedPhoto)?.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl border-4 border-primary/30"
            />
            
            {/* Decorative sparkles around the enlarged photo */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  rotate: [0, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
