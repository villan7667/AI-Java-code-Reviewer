import { motion } from 'framer-motion'

export default function TechBackground() {
  // Generate floating digital nodes
  const nodes = Array.from({ length: 20 })

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-950">
      
      {/* 1. Cyber Grid Matrix SVG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415525_1px,transparent_1px),linear-gradient(to_bottom,#33415525_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_80%,transparent_100%)]" />

     

      {/* 3. Glowing Corner Cyber Radar Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/25 rounded-full blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[150px]"
      />

      {/* 4. Floating Tech Glowing Particles / Data Nodes */}
      {nodes.map((_, i) => {
        const size = Math.random() * 4 + 2
        return (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 900),
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [null, -150, -300],
              opacity: [null, 0.9, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 4,
            }}
            style={{ width: `${size}px`, height: `${size}px` }}
            className={`absolute rounded-full shadow-[0_0_8px_currentColor] ${
              i % 3 === 0
                ? 'bg-cyan-400 text-cyan-400'
                : i % 3 === 1
                ? 'bg-indigo-400 text-indigo-400'
                : 'bg-pink-400 text-pink-400'
            }`}
          />
        )
      })}
    </div>
  )
}