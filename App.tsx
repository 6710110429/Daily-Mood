import React, { useState, useEffect } from 'react';
import { User } from './types';
import { getCurrentUser, loginUser, logoutUser } from './services/storageService';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    const newUser = loginUser(username);
    setUser(newUser);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-bounce text-garden-accent text-2xl font-bold">Loading your garden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;