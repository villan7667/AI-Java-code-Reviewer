import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Tag, Button, Tooltip, ConfigProvider, theme } from 'antd'
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  FileCode, 
  Clock, 
  HardDrive, 
  Code2,
  ListCheck
} from 'lucide-react'

// Animated Score Ring Component
function ScoreRing({ score }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? '#06b6d4' : score >= 50 ? '#f59e0b' : '#f43f5e'

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="w-36 h-36 -rotate-90">
        <circle cx="72" cy="72" r={radius} stroke="#1e293b" strokeWidth="10" fill="none" />
        <motion.circle
          cx="72" cy="72" r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold tracking-tight text-white">{score}</span>
        <span className="text-[11px] text-slate-400 font-mono">/ 100</span>
      </div>
    </div>
  )
}

// Custom Icon List Block
function ListBlock({ title, items, tone, icon: Icon }) {
  const toneStyles = {
    good: {
      border: 'border-emerald-500/30 bg-emerald-950/20',
      iconColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
    },
    bad: {
      border: 'border-rose-500/30 bg-rose-950/20',
      iconColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20'
    },
    warn: {
      border: 'border-amber-500/30 bg-amber-950/20',
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
    },
    info: {
      border: 'border-sky-500/30 bg-sky-950/20',
      iconColor: 'text-sky-400',
      badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/20'
    },
  }

  const currentTone = toneStyles[tone] || toneStyles.info

  if (!items || items.length === 0) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-5 backdrop-blur-md ${currentTone.border}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${currentTone.iconColor}`} />
        <h4 className="font-semibold text-slate-100 text-base">{title}</h4>
      </div>
      <ul className="space-y-2 text-sm text-slate-300">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function ReviewReport({ review }) {
  const [copied, setCopied] = useState(false)

  if (!review) return null

  const handleCopyCode = () => {
    if (review.optimizedCode) {
      navigator.clipboard.writeText(review.optimizedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 font-sans text-slate-100 mt-8"
      >
        
        {/* Main Score & File Details Grid Header */}
        <div className="relative rounded-3xl bg-slate-950/80 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <ScoreRing score={review.overallScore} />

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm w-full">
              
              <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                <p className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" /> File Name
                </p>
                <p className="font-semibold text-slate-200 truncate text-xs sm:text-sm font-mono">
                  {review.fileName || 'Snippet'}
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                <p className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
                  <Code2 className="w-3.5 h-3.5 text-purple-400" /> Language
                </p>
                <Tag color="purple" className="!font-mono !text-xs !m-0 !px-2">
                  {review.language || 'Code'}
                </Tag>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                <p className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Time Complexity
                </p>
                <p className="font-semibold text-cyan-300 font-mono text-xs sm:text-sm">
                  {review.timeComplexity || 'N/A'}
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                <p className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
                  <HardDrive className="w-3.5 h-3.5 text-amber-400" /> Space Complexity
                </p>
                <p className="font-semibold text-amber-300 font-mono text-xs sm:text-sm">
                  {review.spaceComplexity || 'N/A'}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Pros, Cons, Security & Performance Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <ListBlock title="Pros & Strengths" items={review.pros} tone="good" icon={CheckCircle2} />
          <ListBlock title="Cons & Concerns" items={review.cons} tone="bad" icon={AlertTriangle} />
          <ListBlock title="Security Audits" items={review.securityIssues} tone="warn" icon={ShieldAlert} />
          <ListBlock title="Performance Suggestions" items={review.performanceSuggestions} tone="info" icon={Zap} />
        </div>

        {/* Clean Code Section */}
        <ListBlock title="Clean Code & Architecture" items={review.cleanCodeSuggestions} tone="info" icon={ListCheck} />

        {/* Refactored Optimized Code Snippet Card */}
        {review.optimizedCode && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-slate-950/80 border border-indigo-500/30 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h4 className="font-semibold text-slate-100 text-base">Optimized Code Suggestion</h4>
              </div>

              {/* Copy Code Action Button */}
              <Tooltip title={copied ? 'Copied to clipboard!' : 'Copy Code'}>
                <Button
                  size="small"
                  onClick={handleCopyCode}
                  icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  className="!bg-slate-900 !border-slate-800 hover:!border-indigo-500 !text-slate-300"
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </Tooltip>
            </div>

            {/* Syntax Highlight Container */}
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 p-4 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed whitespace-pre-wrap m-0">
                <code>{review.optimizedCode}</code>
              </pre>
            </div>
          </motion.div>
        )}

      </motion.div>
    </ConfigProvider>
  )
}