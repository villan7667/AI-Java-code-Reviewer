import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import api from '../api/axios'
import ReviewReport from '../components/ReviewReport'
import TechBackground from '../components/TechBackground'
import { Input, Button, Alert, Segmented, ConfigProvider, theme } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, 
  UploadCloud, 
  FileCode, 
  Sparkles, 
  CheckCircle2, 
  Cpu,
  Trash2,
  Terminal
} from 'lucide-react'

export default function Dashboard() {
  const [code, setCode] = useState('')
  const [fileName, setFileName] = useState('pasted-code.java')
  const [uploadFile, setUploadFile] = useState(null)
  const [mode, setMode] = useState('paste')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    setUploadFile(file)
    setFileName(file.name)
    setMode('upload')
    setError('')
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'text/x-java-source': ['.java'], 
      'application/javascript': ['.js', '.jsx'], 
      'text/plain': ['.java', '.js', '.jsx', '.ts', '.tsx'] 
    },
    maxFiles: 1,
    disabled: loading
  })

  const handleReset = () => {
    setCode('')
    setFileName('pasted-code.java')
    setUploadFile(null)
    setResult(null)
    setError('')
  }

  const handleSubmit = async () => {
    if (loading) return
    setError('')
    setResult(null)
    setLoading(true)

    try {
      let responseData
      if (mode === 'upload' && uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile)
        const res = await api.post('/review/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        responseData = res.data
      } else {
        const res = await api.post('/review/submit', { sourceCode: code, fileName })
        responseData = res.data
      }
      setResult(responseData)
    } catch (err) {
      setError(err.response?.data?.message || 'Review failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = mode === 'upload' ? !!uploadFile : code.trim().length > 0

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Input: {
            colorBgContainer: 'rgba(15, 23, 42, 0.5)',
            colorBorder: '#334155',
            borderRadius: 12,
            controlHeight: 42,
            activeBorderColor: '#6366f1',
          },
          Button: {
            borderRadius: 12,
            controlHeight: 46,
          },
        },
      }}
    >
      <div className="relative min-h-screen w-full px-4 sm:px-6 py-10 font-sans text-slate-100 overflow-hidden">
        
        {/* Fullscreen Visible Cyber Tech Background */}
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
                <Cpu className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
                <span>AI Static Code Auditor</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tightg gradient-text">
                Review Your Code
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Paste snippet or upload <code className="text-indigo-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800 font-mono">.java</code> / <code className="text-indigo-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800 font-mono">.js</code> files for instant deep analysis.
              </p>
            </div>

            {/* Segmented Mode Switcher */}
            <div className="bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/90 shadow-xl backdrop-blur-xl">
              <Segmented
                value={mode}
                onChange={(value) => setMode(value)}
                disabled={loading}
                options={[
                  {
                    label: (
                      <div className="flex items-center gap-2 px-2 py-1 font-semibold text-xs sm:text-sm">
                        <Code2 className="w-4 h-4 text-indigo-400" />
                        <span>Paste Code</span>
                      </div>
                    ),
                    value: 'paste',
                  },
                  {
                    label: (
                      <div className="flex items-center gap-2 px-2 py-1 font-semibold text-xs sm:text-sm">
                        <UploadCloud className="w-4 h-4 text-purple-400" />
                        <span>Upload File</span>
                      </div>
                    ),
                    value: 'upload',
                  },
                ]}
                className="!bg-slate-900/90 !p-1"
              />
            </div>
          </motion.div>

          {/* Code Workspace Card */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

            <div className="relative bg-slate-950/75 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(99,102,241,0.15)] backdrop-blur-xl space-y-6">
              
              {/* Reset Header Action */}
              {(code || uploadFile) && (
                <div className="flex justify-end">
                  <button
                    onClick={handleReset}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Workspace</span>
                  </button>
                </div>
              )}

              {mode === 'paste' ? (
                /* Paste Mode */
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileCode className="w-5 h-5 text-indigo-400" />
                    <Input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="File name (e.g. Solution.java)"
                      className="!bg-slate-900/70 !text-slate-100 !border-slate-800 font-mono text-sm"
                      disabled={loading}
                    />
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 focus-within:border-indigo-500/60 transition-all">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Paste your Java or JavaScript source code here..."
                      rows={14}
                      disabled={loading}
                      className="w-full bg-transparent p-4 font-mono text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none resize-y leading-relaxed disabled:opacity-50"
                    />
                  </div>
                </div>
              ) : (
                /* Drag & Drop Upload Mode */
                <div
                  {...getRootProps()}
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                      : uploadFile
                      ? 'border-emerald-500/60 bg-emerald-950/10'
                      : 'border-slate-800 bg-slate-900/40 hover:border-indigo-500/50 hover:bg-slate-900/80'
                  }`}
                >
                  <input {...getInputProps()} />
                  
                  <div className="flex flex-col items-center justify-center space-y-3">
                    {uploadFile ? (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-2">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <p className="text-emerald-400 font-semibold text-base">
                          {uploadFile.name}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {(uploadFile.size / 1024).toFixed(1)} KB — Click or drag to replace file
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                          <UploadCloud className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="text-slate-200 font-semibold text-base">
                            Drag & drop your source file here
                          </p>
                          <p className="text-slate-500 text-xs mt-1">
                            Supports <span className="text-indigo-400 font-mono">.java</span>, <span className="text-purple-400 font-mono">.js</span>, or <span className="text-pink-400 font-mono">.jsx</span> files
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Error Banner */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Alert
                      message={error}
                      type="error"
                      showIcon
                      className="!bg-rose-950/40 !border-rose-900/60 !text-rose-300 rounded-xl"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Action Bar */}
              <div className="flex justify-end pt-2">
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                  loading={loading}
                  size="large"
                  icon={!loading && <Sparkles className="w-4 h-4" />}
                  className="!h-12 !px-8 !text-base !font-semibold !bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-500 hover:!to-purple-500 !border-none shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] disabled:!opacity-40"
                >
                  {loading ? 'Running AI Audit...' : 'Start AI Code Review'}
                </Button>
              </div>

            </div>
          </motion.div>

          {/* AI Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-950/80 border border-indigo-500/40 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400 animate-bounce">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-slate-100 font-semibold text-lg">Analyzing Code Quality & Vulnerabilities</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Checking performance metrics, complexity, static security, and clean code refactoring...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Report Results View */}
          {result && <ReviewReport review={result} />}

        </div>
      </div>
    </ConfigProvider>
  )
}