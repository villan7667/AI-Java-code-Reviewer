import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import ReviewReport from '../components/ReviewReport'
import TechBackground from '../components/TechBackground'
import { Input, Select, Modal, Tag, ConfigProvider, theme } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  History as HistoryIcon, 
  Search, 
  FileCode, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Code2,
  Filter,
  X
} from 'lucide-react'

// Card entrance animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function History() {
  const [reviews, setReviews] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest') // 'newest' | 'highest' | 'lowest'

  useEffect(() => {
    api.get('/review/history')
      .then((res) => setReviews(res.data || []))
      .catch((err) => console.error('Failed to fetch review history:', err))
      .finally(() => setLoading(false))
  }, [])

  // Filter and Sort Logic
  const filteredReviews = useMemo(() => {
    let result = [...reviews]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (r) => 
          r.fileName?.toLowerCase().includes(q) || 
          r.language?.toLowerCase().includes(q)
      )
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'highest') {
      result.sort((a, b) => b.overallScore - a.overallScore)
    } else if (sortBy === 'lowest') {
      result.sort((a, b) => a.overallScore - b.overallScore)
    }

    return result
  }, [reviews, searchQuery, sortBy])

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Input: {
            colorBgContainer: 'rgba(15, 23, 42, 0.65)',
            colorBorder: '#334155',
            borderRadius: 12,
            controlHeight: 42,
            activeBorderColor: '#6366f1',
          },
          Select: {
            colorBgContainer: 'rgba(15, 23, 42, 0.65)',
            colorBorder: '#334155',
            borderRadius: 12,
            controlHeight: 42,
          },
          Modal: {
            colorBgElevated: '#020617',
            borderRadiusLG: 24,
          },
        },
      }}
    >
      <div className="relative min-h-screen w-full px-4 sm:px-6 py-10 font-sans text-slate-100 overflow-hidden">
        
        {/* Fullscreen Cyber Background */}
        <TechBackground />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-2">
                <HistoryIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Audit Repository</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight gradient-text">
                Review History
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Access your past AI security audits, complexity reports, and refactored code snippets.
              </p>
            </div>

            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-xs sm:text-sm text-white shadow-lg shadow-indigo-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>New Code Audit</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Search & Sort Controls */}
          {reviews.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-950/75 p-3 rounded-2xl border border-slate-800/90 backdrop-blur-xl shadow-xl"
            >
              <Input
                placeholder="Search by filename or language..."
                prefix={<Search className="w-4 h-4 text-slate-400 mr-2" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                className="!text-slate-100 placeholder:!text-slate-500 font-medium"
              />

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <Filter className="w-4 h-4 text-slate-400 ml-1 hidden sm:block" />
                <Select
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  options={[
                    { label: 'Most Recent', value: 'newest' },
                    { label: 'Highest Score', value: 'highest' },
                    { label: 'Lowest Score', value: 'lowest' },
                  ]}
                  className="w-full sm:w-44"
                />
              </div>
            </motion.div>
          )}

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-3 animate-pulse backdrop-blur-md"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-1/2 bg-slate-800 rounded-lg" />
                    <div className="h-6 w-16 bg-slate-800 rounded-full" />
                  </div>
                  <div className="h-4 w-1/3 bg-slate-800/60 rounded-md" />
                </div>
              ))}
            </div>
          )}

          {/* Empty History State */}
          {!loading && reviews.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-12 text-center shadow-2xl backdrop-blur-xl space-y-4 max-w-md mx-auto"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
                <Code2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-slate-100 font-bold text-lg">No Audit History Found</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  You haven't submitted any code snippets for AI review yet.
                </p>
              </div>
              <Link to="/dashboard" className="inline-block pt-2">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-indigo-500/20"
                >
                  <span>Submit Code Snippet</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* No Filter Results State */}
          {!loading && reviews.length > 0 && filteredReviews.length === 0 && (
            <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-slate-400 text-sm">
              No review records match your search criteria.
            </div>
          )}

          {/* Review Cards Grid */}
          {!loading && filteredReviews.length > 0 && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-4"
            >
              {filteredReviews.map((r) => (
                <motion.div key={r.id || r._id} variants={itemVariants}>
                  <motion.button
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(r)}
                    className="w-full text-left bg-slate-950/75 border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl p-5 transition-all duration-300 shadow-xl backdrop-blur-xl group relative overflow-hidden"
                  >
                    {/* Corner Subtle Glow Highlight */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-tr-2xl pointer-events-none" />

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/40 group-hover:scale-110 transition shrink-0">
                          <FileCode className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-semibold text-slate-200 text-sm truncate group-hover:text-indigo-300 transition">
                            {r.fileName || 'Untitled Snippet'}
                          </h3>
                          {r.language && (
                            <Tag color="purple" className="!font-mono !text-[10px] !m-0 !px-1.5 !py-0.5">
                              {r.language}
                            </Tag>
                          )}
                        </div>
                      </div>

                      {/* Score Tag */}
                      <div className={`px-3 py-1 rounded-full border font-mono font-bold text-xs shrink-0 ${getScoreColor(r.overallScore)}`}>
                        Score: {r.overallScore}/100
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-900 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Full Detailed Report Modal */}
          <Modal
            open={!!selected}
            onCancel={() => setSelected(null)}
            footer={null}
            width={900}
            centered
            closeIcon={<X className="w-5 h-5 text-slate-400 hover:text-white" />}
            styles={{
              content: {
                backgroundColor: 'rgba(2, 6, 23, 0.95)',
                border: '1px solid rgba(51, 65, 85, 0.8)',
                backdropFilter: 'blur(24px)',
                padding: '1.5rem',
              },
            }}
          >
            {selected && (
              <div className="pt-2">
                <ReviewReport review={selected} />
              </div>
            )}
          </Modal>

        </div>
      </div>
    </ConfigProvider>
  )
}