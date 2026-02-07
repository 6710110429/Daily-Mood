import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a name to enter your garden.');
      return;
    }
    onLogin(username.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center border-2 border-green-100">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Leaf size={48} className="text-garden-accent" />
          </div>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Flower Journal</h1>
        <p className="text-slate-500 mb-8 font-sans">Plant a seed for your daily emotions.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label htmlFor="username" className="block text-sm font-semibold text-slate-600 mb-2 ml-1">
              Who is gardening today?
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all font-sans text-lg"
              placeholder="Your Name"
              autoComplete="off"
            />
            {error && <p className="text-red-400 text-sm mt-2 ml-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-garden-accent hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
          >
            Enter Garden
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;