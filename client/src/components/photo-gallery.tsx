import { motion } from "framer-motion";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Beautiful birthday cake",
    title: "Sweet Moments"
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Colorful balloons",
    title: "Celebration Vibes"
  },
  {
    src: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Princess crown",
    title: "Royal Elegance"
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Pink roses bouquet",
    title: "Love & Flowers"
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Birthday celebration sparklers",
    title: "Magical Sparkle"
  },
  {
    src: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Beautiful gift boxes",
    title: "Special Surprises"
  }
];

export default function PhotoGallery() {
  return (
    <div className="grid md:grid-cols-3 gap-6" data-testid="photo-gallery">
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -10 }}
          viewport={{ once: true }}
          data-testid={`photo-${index}`}
        >
          <div className="relative overflow-hidden">
            <img 
              src={photo.src} 
              alt={photo.alt}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.p 
                className="text-white font-script text-xl font-semibold"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {photo.title}
              </motion.p>
            </motion.div>
          </div>

          {/* Decorative Border Animation */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent rounded-3xl pointer-events-none"
            whileHover={{ 
              borderColor: "hsl(330, 100%, 71%)",
              boxShadow: "0 0 30px rgba(255, 105, 180, 0.5)"
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating Hearts on Hover */}
          <motion.div
            className="absolute top-4 right-4 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ❤️
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
