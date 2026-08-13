import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Form, Input, Button, Alert, ConfigProvider, theme } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Code2, 
  User, 
  ShieldCheck 
} from 'lucide-react'
import TechBackground from '../components/TechBackground'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formMode, setFormMode] = useState('login')

  const handleSubmit = async (values) => {
    setError('')
    setLoading(true)
    try {
      if (formMode === 'login') {
        await login(values.email, values.password)
        navigate('/dashboard')
      } else {
        navigate('/register')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleModeSwitch = (mode) => {
    if (mode === 'register') {
      navigate('/register')
    } else {
      setFormMode('login')
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Input: {
            colorBgContainer: 'rgba(15, 23, 42, 0.5)',
            colorBorder: '#334155',
            colorTextPlaceholder: '#64748b',
            borderRadius: 12,
            controlHeight: 46,
            activeBorderColor: '#6366f1',
            hoverBorderColor: '#818cf8',
          },
          Button: {
            borderRadius: 12,
            controlHeight: 46,
          },
        },
      }}
    >
      <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 font-sans overflow-hidden">
        
        {/* Fullscreen Visible Cyber Tech Background */}
        <TechBackground />

        {/* Floating Glassmorphism Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10"
        >
          {/* Outer Cyber Neon Glow Ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-pink-500/40 rounded-3xl blur-2xl opacity-80" />

          {/* Card Body */}
          <div className="relative bg-slate-950/75 border border-slate-700/60 rounded-3xl p-8 shadow-[0_0_50px_rgba(99,102,241,0.15)] backdrop-blur-xl overflow-hidden">
            
            {/* Top Logo Badge with Breathing Glow */}
            <div className="flex justify-center mb-6">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/50 relative"
              >
                <Code2 className="w-6 h-6 relative z-10" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-indigo-500 rounded-2xl blur-md"
                />
              </motion.div>
            </div>

            {/* Interactive Animated Toggle Switcher */}
            <div className="relative flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80 mb-8">
              <motion.div 
                className="absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
                initial={false}
                animate={{
                  left: formMode === 'login' ? '0.375rem' : '50%',
                  width: 'calc(50% - 0.375rem)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />

              <button
                type="button"
                onClick={() => handleModeSwitch('login')}
                className={`relative z-10 w-1/2 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${
                  formMode === 'login' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeSwitch('register')}
                className={`relative z-10 w-1/2 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${
                  formMode === 'register' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>

            {/* Title Header */}
            <div className="text-center mb-6 space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome Back
              </h1>
              <p className="text-slate-400 text-sm">
                Log in to run static audits & optimize your code.
              </p>
            </div>

            {/* Error Alert */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6"
                >
                  <Alert
                    message={error}
                    type="error"
                    showIcon
                    className="!bg-rose-950/40 !border-rose-900/60 !text-rose-300 rounded-xl"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Enter a valid email address' },
                ]}
                className="mb-4"
              >
                <Input
                  prefix={<Mail className="w-4 h-4 text-slate-400 mr-2" />}
                  placeholder="name@example.com"
                  size="large"
                  className="!text-slate-100 placeholder:!text-slate-500 font-medium"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
                className="mb-6"
              >
                <Input.Password
                  prefix={<Lock className="w-4 h-4 text-slate-400 mr-2" />}
                  placeholder="••••••••"
                  size="large"
                  className="!text-slate-100 placeholder:!text-slate-500 font-medium"
                />
              </Form.Item>

              <Form.Item className="!mb-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  icon={!loading && <ArrowRight className="w-4 h-4" />}
                  iconPosition="end"
                  className="!h-12 !text-base !font-semibold !bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-500 hover:!to-purple-500 !border-none shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                </Button>
              </Form.Item>

              <div className="text-center pt-2">
                <p className="text-xs sm:text-sm text-slate-400">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 transition"
                  >
                    Create account
                  </Link>
                </p>
              </div>

            </Form>

          </div>
        </motion.div>
      </div>
    </ConfigProvider>
  )
}