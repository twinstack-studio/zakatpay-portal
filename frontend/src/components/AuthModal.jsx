import React, { useState, useEffect } from 'react';
import { X, Mail, KeyRound, ArrowRight, Loader2, CheckCircle2, User, Eye, EyeOff, ShieldCheck, RefreshCw } from 'lucide-react';

// Nayi libraries for real Google Login
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Agar aage kabhi jwt ki zaroorat pari

// === KHOOBSURAT GOOGLE ICON ===
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

// MAIN COMPONENT LOGIC
function AuthModalContent({ isOpen, onClose, setUser }) {
  const [step, setStep] = useState('email');
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [justRegistered, setJustRegistered] = useState(false); 

  const API_BASE_URL = 'http://localhost:5001/api/auth'; 

  useEffect(() => {
    let interval;
    if (resendTimer > 0 && step === 'otp') {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer, step]);

  const handleClose = () => {
    setStep('email'); setEmail(''); setOtp(''); setName('');
    setPassword(''); setConfirmPassword(''); setError(''); 
    setResendTimer(0); setJustRegistered(false);
    onClose();
  };

  // ==========================================
  // BUG FIX: HOOK MOVED TO THE TOP!
  // ==========================================
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError('');
      try {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoRes.json();
        const { name, email, sub: googleId } = userInfo;

        const response = await fetch(`${API_BASE_URL}/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, googleId })
        });

        const text = await response.text();
        let data;
        try { data = JSON.parse(text); } catch (err) { data = { message: 'Backend Error: Check URL or Restart Server.' } }

        if (response.ok) {
          const userData = { name: data.user?.name || name, email: data.user?.email || email };
          setUser(userData);
          localStorage.setItem('zakatUser', JSON.stringify(userData));
          handleClose();
        } else {
          setError(data.message || 'Google Login failed on our server.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred during Google Sign-in.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError('Google Sign-In was closed or failed.');
    }
  });

  // ==========================================
  // NOW WE CAN SAFELY USE THE RETURN STATEMENT
  // ==========================================
  if (!isOpen) return null;

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    if (!email) { setError('Please enter your email.'); return; }
    setError(''); setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => { setResendTimer(60); setStep('otp'); setIsLoading(false); }, 1000);
      } else {
        setError(data.message || 'Failed to send OTP.'); setIsLoading(false);
      }
    } catch (err) { setError('Network Error.'); setIsLoading(false); }
  };

  const handleResendOTP = () => {
    setOtp('');
    handleSendOTP();
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length < 4) { setError('Please enter a valid OTP.'); return; }
    setError(''); setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp })
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => { setStep('register'); setIsLoading(false); }, 1500);
      } else {
        setError(data.message || 'Invalid OTP.'); setIsLoading(false);
      }
    } catch (err) { setError('Network Error.'); setIsLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !password || !confirmPassword) { setError('Please fill all fields.'); return; }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) { setError('Password must contain a special character (e.g. @, #, $).'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setJustRegistered(true); 
        setTimeout(() => { setStep('login'); setPassword(''); setIsLoading(false); }, 1500);
      } else {
        setError(data.message || 'Registration failed.'); setIsLoading(false);
      }
    } catch (err) { setError('Network Error.'); setIsLoading(false); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) { setError('Please enter your password.'); return; }
    setError(''); setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          const userData = { name: data.user.name, email: data.user.email };
          setUser(userData); localStorage.setItem('zakatUser', JSON.stringify(userData));
          handleClose(); setIsLoading(false);
        }, 1000);
      } else {
        setError(data.message || 'Invalid email or password.'); setIsLoading(false);
      }
    } catch (err) { setError('Network Error.'); setIsLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="relative w-full max-w-md my-auto bg-[#0a0a0c] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 z-10 shadow-[0_0_50px_rgba(236,72,153,0.15)] animate-fade-in-up">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 to-purple-600"></div>
        <button onClick={handleClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-500 hover:text-white transition-colors p-1"><X size={24} /></button>

        <div className="mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            {step === 'email' && "Let's Get Started"}
            {step === 'otp' && "Verify Email"}
            {step === 'register' && "Create Account"}
            {step === 'login' && (justRegistered ? "Welcome to ZakatPay!" : "Welcome Back")}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {step === 'email' && "Enter your email to receive a one-time password (OTP)."}
            {step === 'otp' && `We've sent a secure OTP to ${email}`}
            {step === 'register' && "Your email is verified. Please set up your profile."}
            {step === 'login' && (justRegistered ? "Registration successful. Please login to continue." : "Please enter your password to login to your dashboard.")}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4 sm:mb-6 flex items-center gap-2">
            <ShieldCheck size={16} className="flex-shrink-0" /> <span className="leading-snug">{error}</span>
          </div>
        )}

        {step === 'email' && (
          <div className="space-y-4">
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
                  <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#13141a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-pink-500 transition-colors" />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Send OTP <ArrowRight size={16} /></>}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Or continue with</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* CUSTOM NATIVE GOOGLE BUTTON */}
            <button 
              type="button" 
              onClick={() => googleLogin()} 
              disabled={isLoading}
              className="w-full bg-[#13141a] border border-white/10 hover:border-white/30 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg flex justify-center items-center gap-3"
            >
              <GoogleIcon /> Continue with Google
            </button>

            <div className="text-center mt-4">
              <button type="button" onClick={() => setStep('login')} className="text-xs text-pink-400 hover:text-white transition-colors font-bold">
                Already have an account? Login here.
              </button>
            </div>
          </div>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Enter OTP</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3.5 text-slate-500" size={18} />
                <input type="text" required placeholder="Enter Code" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-[#13141a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white font-mono tracking-widest text-lg outline-none focus:border-purple-500 transition-colors text-center" />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-white text-purple-700 hover:text-pink-600 font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
              {isLoading ? <Loader2 className="animate-spin text-purple-700" size={18} /> : <>Verify OTP <CheckCircle2 size={16} /></>}
            </button>
            <div className="flex justify-between items-center mt-4">
              <button type="button" onClick={() => setStep('email')} className="text-xs text-slate-500 hover:text-white transition-colors">Change Email</button>
              {resendTimer > 0 ? (
                <span className="text-xs text-slate-500">Resend in {resendTimer}s</span>
              ) : (
                <button type="button" onClick={handleResendOTP} disabled={isLoading} className="text-xs text-pink-400 hover:text-white transition-colors font-bold flex items-center gap-1">
                  {isLoading ? <Loader2 className="animate-spin" size={12}/> : <RefreshCw size={12} />} Resend Code
                </button>
              )}
            </div>
          </form>
        )}

        {step === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-500" size={18} />
                <input type="text" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#13141a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-pink-500 transition-colors text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-4 top-3.5 text-slate-500" size={18} /><input type="email" disabled value={email} className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-slate-400 outline-none cursor-not-allowed text-sm" /></div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3.5 text-slate-500" size={18} />
                <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#13141a] border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:border-pink-500 transition-colors text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-500 hover:text-white">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Confirm Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-3.5 text-slate-500" size={18} />
                <input type={showConfirmPassword ? "text" : "password"} required placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-[#13141a] border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:border-pink-500 transition-colors text-sm" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3.5 text-slate-500 hover:text-white">{showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">{isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Register Account</>}</button>
          </form>
        )}

        {step === 'login' && (
          <div className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email Address</label>
                <div className="relative"><Mail className="absolute left-4 top-3.5 text-slate-500" size={18} /><input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#13141a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-pink-500 transition-colors text-sm" /></div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-3.5 text-slate-500" size={18} />
                  <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#13141a] border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:border-pink-500 transition-colors text-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-500 hover:text-white">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">{isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Login Securely <ArrowRight size={16} /></>}</button>
            </form>

            {!justRegistered && (
              <>
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Or continue with</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
                
                {/* CUSTOM NATIVE GOOGLE BUTTON FOR LOGIN SCREEN AS WELL */}
                <button 
                  type="button" 
                  onClick={() => googleLogin()} 
                  disabled={isLoading}
                  className="w-full bg-[#13141a] border border-white/10 hover:border-white/30 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg flex justify-center items-center gap-3"
                >
                  <GoogleIcon /> Continue with Google
                </button>
                
                <div className="text-center mt-4">
                  <button type="button" onClick={() => setStep('email')} className="text-xs text-pink-400 hover:text-white transition-colors font-bold">Don't have an account? Sign up here.</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ===============================================
// WRAPPER TO PROVIDE GOOGLE CONTEXT TO THE HOOK
// ===============================================
export default function AuthModal(props) {
  // Yahan apni ID daal dein
  const GOOGLE_CLIENT_ID = "528496242536-r9ntmnoiinph7n85e7f8ve6dok85j9c0.apps.googleusercontent.com";
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthModalContent {...props} />
    </GoogleOAuthProvider>
  );
}