
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Card, Typography } from 'antd'
import { motion } from 'framer-motion'

import { 
  Zap, 
  ShieldCheck, 
  Code2, 
  ArrowRight, 
  LogIn, 
  Cpu, 
  CheckCircle2, 
  Terminal, 
  Sparkles,
  History,
  FileSearch,
  Lock
} from 'lucide-react'
import TechBackground from '../components/TechBackground'

const { Title, Paragraph, Text } = Typography

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const floatAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export default function Landing() {
  
  const { user } = useAuth()
  const features = [
    { 
      icon: <Zap className="w-6 h-6 text-amber-400" />, 
      title: 'Real-Time AI Audits', 
      desc: 'Receive an instant 0–100 quality score with line-by-line pros, cons, and refactoring tips.' 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />, 
      title: 'Security Vulnerability Detection', 
      desc: 'Identify SQL injections, unhandled exceptions, and memory leaks before pushing to production.' 
    },
    { 
      icon: <Code2 className="w-6 h-6 text-purple-400" />, 
      title: 'Smart Code Refactoring', 
      desc: 'Get clean, production-ready code output adhering to Java and ES6+ standards.' 
    },
    { 
      icon: <FileSearch className="w-6 h-6 text-indigo-400" />, 
      title: 'Multi-Language Support', 
      desc: 'Upload or paste Java (.java) or JavaScript (.js/.jsx) code files for deep static analysis.' 
    },
    { 
      icon: <History className="w-6 h-6 text-pink-400" />, 
      title: 'Review History Tracking', 
      desc: 'Access saved audits, past score metrics, and refactored code snippets anytime in your dashboard.' 
    },
    { 
      icon: <Lock className="w-6 h-6 text-emerald-400" />, 
      title: 'Secure Authentication', 
      desc: 'JWT-powered account protection ensuring your source code snippets remain completely private.' 
    },
  ]

  return (
    <div className="relative min-h-screen max-w-6xl mx-auto px-4 py-16 font-sans text-slate-100 overflow-hidden">
      
      {/* 1. Fullscreen Cyber Tech Background */}
      <TechBackground />

      {/* Hero Header Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
        
        {/* Animated Badge */}
        <motion.div 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="inline-block"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-inner text-indigo-300 text-xs sm:text-sm font-mono">
            <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Next-Gen AI Analysis Engine</span>
          </div>
        </motion.div>

        {/* Animated Title */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeInUp}>
          <Title 
            level={1} 
            style={{ margin: 0 }}
            className="!text-5xl sm:!text-6xl md:!text-7xl !font-extrabold !tracking-tight !leading-[1.1]"
          >
            <span className="gradient-text bg-clip-text ">
              Instant Code Reviews
            </span>
            <br />
            <span className="text-slate-300 text-2xl sm:text-4xl md:text-5xl font-mono font-light">
              for Clean & Secure Software.
            </span>
          </Title>
        </motion.div>

        {/* Subtitle */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeInUp}>
          <Paragraph className="!text-slate-400 !text-base sm:!text-lg !leading-relaxed max-w-2xl mx-auto">
            Paste or upload your <Text code className="!text-cyan-300 !bg-slate-900/80 !border-slate-800 font-mono">.java</Text> or <Text code className="!text-cyan-300 !bg-slate-900/80 !border-slate-800 font-mono">.js</Text> snippets to run automatic static analysis, detect vulnerabilities, and receive refactored code instantly.
          </Paragraph>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeInUp} className="pt-2">
          <div className="flex flex-wrap justify-center items-center gap-4">
            
            {/* If logged in -> go to /dashboard. If not -> go to /register */}
            <Link to={user ? "/dashboard" : "/register"}>
              <Button 
                type="primary" 
                size="large" 
                shape="round"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="end"
                className="!h-12 !px-8 !text-base !font-semibold !bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-500 hover:!to-purple-500 !border-none shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
              >
                {user ? 'Go to Dashboard' : 'Start Free Review'}
              </Button>
            </Link>

            {/* If logged in -> hide or redirect to /dashboard. If not -> go to /login */}
            {user ? (
              <Link to="/dashboard">
                <Button 
                  size="large" 
                  shape="round"
                  icon={<Code2 className="w-4 h-4" />}
                  className="!h-12 !px-8 !text-base !font-medium !bg-slate-950/80 !text-slate-200 !border-slate-700 hover:!border-indigo-500 hover:!text-indigo-400 backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  Review Code Now
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button 
                  size="large" 
                  shape="round"
                  icon={<LogIn className="w-4 h-4" />}
                  className="!h-12 !px-8 !text-base !font-medium !bg-slate-950/80 !text-slate-200 !border-slate-700 hover:!border-indigo-500 hover:!text-indigo-400 backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </Button>
              </Link>
            )}

          </div>
        </motion.div>
      </div>

      {/* Animated Live Code Audit Preview Terminal */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-14 max-w-5xl mx-auto relative z-10"
      >
        <motion.div {...floatAnimation} className="relative rounded-3xl p-0.5 bg-gradient-to-b from-indigo-500/40 via-slate-800/50 to-purple-500/20 shadow-2xl">
          <div className="bg-slate-950/90 rounded-[22px] p-5 sm:p-6 border border-slate-800/80 backdrop-blur-xl">
            
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" /> MultiLanguageAudit.java / .js
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Sparkles className="w-3 h-3" /> Live Score: 96/100
              </span>
            </div>

            {/* Terminal Body: 2x2 Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-4 pt-5 font-mono text-xs sm:text-sm">
              
              {/* Java Original */}
              <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800 text-slate-400 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-slate-500 text-xs mb-2 flex items-center justify-between">
                    <span>// Original Java Code</span>
                    <span className="text-[10px] text-rose-400/80 font-sans bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/40">Legacy Loop</span>
                  </div>
                  <p className="text-rose-400/90">
                    <span className="text-purple-400">for</span>(int i=0; i&lt;list.size(); i++) &#123;
                  </p>
                  <p className="pl-4 text-slate-400">System.out.println(list.get(i));</p>
                  <p className="text-rose-400/90">&#125;</p>
                </div>
                <div className="text-[11px] text-slate-500 font-sans border-t border-slate-800/80 pt-2">
                  Issue: Re-evaluating list size on every iteration step.
                </div>
              </div>

              {/* Java Refactored */}
              <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-500/30 text-indigo-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-indigo-400 text-xs mb-2 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Refactored Stream (Java)
                  </div>
                  <p className="text-emerald-300">
                    list.forEach(System.out::println);
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 font-sans border-t border-indigo-500/20 pt-2">
                  Optimization: Reduced O(N) lookup overhead with concise method references.
                </div>
              </div>

              {/* JS Original */}
              <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800 text-slate-400 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-slate-500 text-xs mb-2 flex items-center justify-between">
                    <span>// Legacy JavaScript</span>
                    <span className="text-[10px] text-amber-400/80 font-sans bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">ES5 Var</span>
                  </div>
                  <p className="text-rose-400/90">
                    <span className="text-purple-400">var</span> greeting = <span className="text-amber-300">"Hello, "</span> + name + <span className="text-amber-300">"!"</span>;
                  </p>
                  <p className="text-slate-400">console.log(greeting);</p>
                </div>
                <div className="text-[11px] text-slate-500 font-sans border-t border-slate-800/80 pt-2">
                  Issue: Unscoped variable definition and string concatenation.
                </div>
              </div>

              {/* JS Refactored */}
              <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-500/30 text-indigo-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-indigo-400 text-xs mb-2 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Modern ES6+ Syntax (JS)
                  </div>
                  <p className="text-emerald-300">
                    <span className="text-purple-400">const</span> greeting = <span className="text-amber-300 font-mono">`Hello, ${name}!`</span>;
                  </p>
                  <p className="text-emerald-300">console.log(greeting);</p>
                </div>
                <div className="text-[11px] text-slate-400 font-sans border-t border-indigo-500/20 pt-2">
                  Modernization: Uses const scoping and template string literals.
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Expanded Project Features Section Grid */}
      <div className="mt-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Everything You Need for Automated Code Quality
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Powered by advanced static analysis and AI to give you deep insights into every line of code.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Card 
                bordered={false}
                className="!bg-slate-950/75 !border !border-slate-800/80 hover:!border-indigo-500/50 transition-all duration-300 rounded-2xl shadow-xl backdrop-blur-xl h-full group"
              >
                <div className="p-2 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 flex items-center justify-center border border-slate-700/60 group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ margin: 0 }} className="!text-slate-100 !text-lg !font-semibold">
                    {feature.title}
                  </Title>
                  <Paragraph className="!text-slate-400 !text-xs sm:!text-sm !m-0 !leading-relaxed">
                    {feature.desc}
                  </Paragraph>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}