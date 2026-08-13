import { useEffect, useState } from 'react'
import api from '../api/axios'
import TechBackground from '../components/TechBackground'
import { Form, Input, Button, Alert, Avatar, ConfigProvider, theme } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  Save, 
  ShieldCheck, 
  Calendar, 
  Sparkles,
  Code2
} from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' }) // { text: '', type: 'success' | 'error' }
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/user/me')
      .then((res) => {
        setUser(res.data)
        setFullName(res.data.fullName || '')
      })
      .catch((err) => console.error('Failed to load profile:', err))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (values) => {
    setMessage({ text: '', type: '' })
    setSaving(true)
    try {
      const res = await api.put('/user/me', { fullName: values.fullName })
      setUser(res.data)
      setFullName(res.data.fullName)
      
      // Update local storage user reference
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}')
      localStorage.setItem('user', JSON.stringify({ ...existingUser, fullName: res.data.fullName }))
      
      setMessage({ text: 'Profile updated successfully!', type: 'success' })
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Failed to update profile. Please try again.', 
        type: 'error' 
      })
    } finally {
      setSaving(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name[0].toUpperCase()
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Input: {
            colorBgContainer: 'rgba(15, 23, 42, 0.5)',
            colorBorder: '#334155',
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
      <div className="relative min-h-screen w-full px-4 sm:px-6 py-12 font-sans text-slate-100 overflow-hidden">
        
        {/* Fullscreen Visible Cyber Tech Background */}
        <TechBackground />

        <div className="max-w-xl mx-auto space-y-8 relative z-10">
          
          {/* Header Title */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>User Account Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight gradient-text">
              My Profile Settings
            </h1>
            <p className="text-slate-400 text-sm">
              Manage your personal details and account preferences.
            </p>
          </motion.div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="bg-slate-950/75 border border-slate-800 rounded-3xl p-8 space-y-6 animate-pulse backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-800" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-1/3 bg-slate-800 rounded-md" />
                  <div className="h-4 w-1/2 bg-slate-800/60 rounded-md" />
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="h-10 bg-slate-800/60 rounded-xl" />
                <div className="h-10 bg-slate-800/60 rounded-xl" />
              </div>
            </div>
          )}

          {/* Main Card Workspace */}
          {!loading && user && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer Cyber Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

              <div className="relative bg-slate-950/75 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(99,102,241,0.15)] backdrop-blur-xl space-y-6 overflow-hidden">
                
                {/* Profile Header Banner */}
                <div className="flex items-center gap-4 pb-6 border-b border-slate-800/80">
                  <div className="relative">
                    <Avatar className="!w-16 !h-16 !bg-gradient-to-tr !from-indigo-600 !via-purple-600 !to-pink-500 !text-white font-extrabold !text-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 border-2 border-indigo-400/40">
                      {getInitials(fullName)}
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center" title="Account Active">
                      <Sparkles className="w-2.5 h-2.5 text-slate-950" />
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <h2 className="text-xl font-bold text-white truncate">
                      {fullName || 'Developer'}
                    </h2>
                    <p className="text-xs text-indigo-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <Code2 className="w-3.5 h-3.5" /> Verified Reviewer
                    </p>
                  </div>
                </div>

                {/* Status Alert Banner */}
                <AnimatePresence mode="wait">
                  {message.text && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert
                        message={message.text}
                        type={message.type === 'success' ? 'success' : 'error'}
                        showIcon
                        className={`rounded-xl ${
                          message.type === 'success' 
                            ? '!bg-emerald-950/40 !border-emerald-900/60 !text-emerald-300' 
                            : '!bg-rose-950/40 !border-rose-900/60 !text-rose-300'
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Profile Update Form */}
                <Form
                  layout="vertical"
                  initialValues={{ fullName }}
                  onFinish={handleSave}
                  requiredMark={false}
                >
                  {/* Email Field (Read-Only) */}
                  <div className="mb-5 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" /> Email Address
                    </label>
                    <div className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 font-mono text-sm flex items-center justify-between">
                      <span className="truncate">{user.email}</span>
                      <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60 font-sans">
                        Primary
                      </span>
                    </div>
                  </div>

                  {/* Full Name Field */}
                  <Form.Item
                    label={
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-400" /> Full Name
                      </span>
                    }
                    name="fullName"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                    className="mb-6"
                  >
                    <Input
                      prefix={<User className="w-4 h-4 text-slate-500 mr-2" />}
                      placeholder="Your Full Name"
                      size="large"
                      onChange={(e) => setFullName(e.target.value)}
                      className="!text-slate-100 placeholder:!text-slate-500 font-medium"
                    />
                  </Form.Item>

                  {/* Optional Metadata Row */}
                  {user.createdAt && (
                    <div className="mb-6 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" /> Member Since
                      </span>
                      <span className="text-slate-300 font-semibold">
                        {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Form.Item className="!mb-0">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={saving}
                      block
                      size="large"
                      icon={!saving && <Save className="w-4 h-4" />}
                      className="!h-12 !text-base !font-semibold !bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-500 hover:!to-purple-500 !border-none shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02]"
                    >
                      {saving ? 'Saving Changes...' : 'Save Profile Changes'}
                    </Button>
                  </Form.Item>

                </Form>

              </div>
            </motion.div>
          )}

        </div>
      </div>
    </ConfigProvider>
  )
}