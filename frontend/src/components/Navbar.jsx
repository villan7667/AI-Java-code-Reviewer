import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Drawer, Dropdown, Avatar, ConfigProvider, theme } from 'antd'
import { motion } from 'framer-motion'
import { 
  Code2, 
  History, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Home
} from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  // Custom Dark Dropdown Items for Desktop
  const userMenuItems = [
    {
      key: 'header',
      disabled: true,
      label: (
        <div className="px-1 py-1 border-b border-slate-800 mb-1">
          <p className="text-slate-200 font-semibold text-xs truncate">{user?.fullName || 'User'}</p>
          <p className="text-slate-500 text-[11px] truncate">{user?.email || ''}</p>
        </div>
      ),
    },
    {
      key: 'profile',
      icon: <User className="w-4 h-4 text-indigo-400" />,
      label: <Link to="/profile" className="text-slate-300 font-medium">My Profile</Link>,
    },
    {
      key: 'history',
      icon: <History className="w-4 h-4 text-purple-400" />,
      label: <Link to="/history" className="text-slate-300 font-medium">Review History</Link>,
    },
    {
      type: 'divider',
      className: '!bg-slate-800 !my-1.5',
    },
    {
      key: 'logout',
      icon: <LogOut className="w-4 h-4 text-rose-400" />,
      label: <span className="text-rose-400 font-medium">Logout Account</span>,
      onClick: handleLogout,
    },
  ]

const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/dashboard', label: 'Review Code', icon: <Code2 className="w-4 h-4" /> },
    { path: '/history', label: 'History', icon: <History className="w-4 h-4" /> },
    { path: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ]


  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Dropdown: {
            colorBgElevated: '#0f172a', // Slate-900 background
            colorText: '#cbd5e1', // Slate-300
            borderRadiusLG: 16,
            paddingBlock: 6,
            controlItemBgHover: '#1e293b', // Slate-800 hover
          },
        },
      }}
    >
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 px-4 sm:px-8 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center gap-2.5 text-lg sm:text-xl font-black tracking-tight">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25"
            >
              <Code2 className="w-5 h-5" />
            </motion.div>
            <span className="bg-clip-text gradient-text">
              AI Code Reviewer
            </span>
          </Link>

          {/* Desktop Navigation Links & User Controls */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {user ? (
              <>
                {/* Nav Links */}
                <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative flex items-center gap-2 py-1.5 px-3.5 rounded-lg font-medium transition-all duration-200 ${
                        isActive(link.path)
                          ? 'text-indigo-300 bg-indigo-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Stylish Desktop Profile Dropdown Button */}
                <Dropdown 
                  menu={{ items: userMenuItems }} 
                  placement="bottomRight" 
                  trigger={['click']}
                  overlayClassName="custom-desktop-dropdown"
                  dropdownRender={(menu) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="bg-slate-900/95 border border-slate-800/90 rounded-2xl shadow-2xl backdrop-blur-xl p-1.5 min-w-[200px]"
                    >
                      {menu}
                    </motion.div>
                  )}
                >
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-slate-900 border border-slate-800/90 hover:border-indigo-500/50 transition cursor-pointer shadow-md group"
                  >
                    <Avatar className="!bg-gradient-to-tr !from-indigo-600 !to-purple-600 !text-slate-100 font-bold !text-xs !w-7 !h-7 flex items-center justify-center border border-indigo-400/30">
                      {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                    </Avatar>
                    <span className="text-slate-200 font-medium text-xs max-w-[120px] truncate">
                      {user.fullName?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-transform duration-200 group-hover:translate-y-0.5" />
                  </motion.button>
                </Dropdown>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 text-slate-300 hover:text-indigo-400 font-medium transition px-3 py-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                <Link to="/register">
                  <Button 
                    type="primary" 
                    shape="round"
                    icon={<Sparkles className="w-4 h-4" />}
                    className="!h-10 !px-5 !bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-500 hover:!to-purple-500 !border-none !font-semibold shadow-md shadow-indigo-500/20 hover:scale-105 transition-all"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
            aria-label="Toggle Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Ant Design Drawer for Mobile Navigation */}
        <Drawer
          title={
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>Menu</span>
            </div>
          }
          placement="right"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          closeIcon={<X className="w-5 h-5 text-slate-400" />}
          styles={{
            header: { backgroundColor: '#020617', borderColor: '#1e293b' },
            body: { backgroundColor: '#020617', padding: '1.25rem' },
          }}
          width={280}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              {user ? (
                <>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 mb-4">
                    <Avatar className="!bg-indigo-600 !text-slate-100 font-bold">
                      {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="text-slate-200 font-semibold text-sm truncate">{user.fullName || 'User'}</p>
                      <p className="text-slate-500 text-xs truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                          isActive(link.path)
                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                            : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                        }`}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-3 pt-4">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      block 
                      size="large" 
                      shape="round" 
                      icon={<LogIn className="w-4 h-4" />}
                      className="!bg-slate-900 !text-slate-200 !border-slate-800 mb-3"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      block 
                      type="primary" 
                      size="large" 
                      shape="round" 
                      icon={<UserPlus className="w-4 h-4" />}
                      className="!bg-indigo-600 !border-none"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {user && (
              <div className="pt-6 border-t border-slate-800">
                <Button
                  danger
                  block
                  shape="round"
                  icon={<LogOut className="w-4 h-4" />}
                  onClick={handleLogout}
                  className="!bg-rose-950/30 !border-rose-900/50 hover:!bg-rose-900/50"
                >
                  Logout Account
                </Button>
              </div>
            )}
          </div>
        </Drawer>
      </motion.nav>
    </ConfigProvider>
  )
}