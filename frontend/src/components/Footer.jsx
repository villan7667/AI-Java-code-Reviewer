import React from 'react';
import { Mail, Heart, Code2 } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800 font-sans overflow-hidden">
      
      {/* Background Tech Effects using your Tailwind Config */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Radial Gradient using your extended theme */}
        <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-primary/5 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-accent">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold gradient-text">AI Code Reviewer</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automated code analysis, vulnerability scanning, and real-time security insights powered by AI.
            </p>
            <div className="flex space-x-3 pt-2">
              {[
                { Icon: FaGithub, label: 'GitHub', href: "https://github.com/villan7667" },
                { Icon: FaTwitter, label: 'Twitter', href: "https://my-portfolio-766709-villan-react.netlify.app/" },
                { Icon: FaLinkedin, label: 'LinkedIn', href: "https://www.linkedin.com/in/ankit-kumar-766709hsgf/" },
                { Icon: Mail, label: 'Email', href: "mailto:hsgf7667@gmail.com" }
              ].map(({ Icon, label, href }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="relative group p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-accent hover:border-accent/40 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 relative z-10" />
                  <div className="absolute inset-0 rounded-lg bg-accent/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {[
            { 
              title: "Navigation", 
              links: [
                { name: "Home", href: "/" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "Review History", href: "/history" },
                { name: "Profile", href: "/profile" }
              ]
            },
            { 
              title: "Features", 
              links: [
                { name: "Static Analysis", href: "#" },
                { name: "Security Auditing", href: "#" },
                { name: "Bug Fix Hints", href: "#" },
                { name: "Multi-Language", href: "#" }
              ]
            },
            { 
              title: "Account", 
              links: [
                { name: "Login", href: "/login" },
                { name: "Register", href: "/register" }
              ]
            }
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">{section.title}</h4>
              <ul className="space-y-2.5 text-sm font-mono">
                {section.links.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="relative inline-block text-slate-400 hover:text-accent transition-colors duration-200 group">
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Footer Bottom Bar */}
        <div className="  relative z-10 border-t  border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} AI CODE REVIEWER. ALL RIGHTS RESERVED.UNDER @villan7667</p>
          <div className="flex items-center gap-1.5 mt-3 sm:mt-0 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <span>BUILT FOR DEVELOPERS</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            <span className="gradient-text text-xs" >ViLLaN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;