import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiMapPin, FiPhone, FiCalendar, FiAward, FiEdit3, FiGithub, FiLinkedin, FiTwitter, FiLogOut, FiArrowLeft, FiPlus, FiStar, } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from "../Features/TodoSlice";
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FormContent = memo(({
  showLogin,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  showPassword,
  setShowPassword,
  handleSubmit,
  setShowLogin
}) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    {!showLogin && (
      <div>
        <label className="text-white/70 text-sm mb-2 block">Full Name</label>
        <div className="relative">
          <FiUser className="absolute left-4 top-3.5 text-white/40" />
          <input
            type="text"
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-white/30 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!showLogin}
          />
        </div>
      </div>
    )}

    <div>
      <label className="text-white/70 text-sm mb-2 block">Email Address</label>
      <div className="relative">
        <FiMail className="absolute left-4 top-3.5 text-white/40" />
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-white/30 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
    </div>

    <div>
      <label className="text-white/70 text-sm mb-2 block">Password</label>
      <div className="relative">
        <FiLock className="absolute left-4 top-3.5 text-white/40" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-white/30 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-3.5 text-white/40 hover:text-white/60"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>

    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
    >
      {showLogin ? 'Sign In' : 'Create Account'}
    </motion.button>

    <div className="text-center">
      <button
        type="button"
        onClick={() => {
          setShowLogin(!showLogin);
          setEmail("");
          setPassword("");
          setName("");
        }}
        className="text-white/60 hover:text-white text-sm"
      >
        {showLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
      </button>
    </div>

    {/* Social Login Section */}
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-[#0f172a] text-white/40">Or continue with</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {['Google', 'GitHub'].map((provider) => (
        <motion.button
          key={provider}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
        >
          <img
            src={`https://www.google.com/favicon.ico`}
            alt={provider}
            className="w-5 h-5"
          />
          <span className="text-white/80">{provider}</span>
        </motion.button>
      ))}
    </div>
  </form>
));

function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user)


  const handleSubmit = (e) => {
    e.preventDefault();
    if (showLogin) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(loginUser({ email, name, password }));
    }
    setIsAuthenticated(true);
  };

  return (
    <div>
      <AnimatePresence>
        {!userData.isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-50 inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20"
            >
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-teal-300 to-cyan-300 text-transparent bg-clip-text mb-6">
                {showLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <FormContent
                showLogin={showLogin}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                name={name}
                setName={setName}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleSubmit={handleSubmit}
                setShowLogin={setShowLogin}
              />
            </motion.div>
          </motion.div>
        ) : (
        <Navigate to="/home"/>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;