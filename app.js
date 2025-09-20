import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Forum from './components/Forum';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import PostDetail from './components/PostDetail';
import Members from './components/Members';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for session on mount
  useEffect(() => {
    const checkSession = async () => {
      // Check for session_id in URL fragment (from Google OAuth)
      const fragment = window.location.hash.substring(1);
      const params = new URLSearchParams(fragment);
      const sessionId = params.get('session_id');

      if (sessionId) {
        // Process Google OAuth session
        try {
          setLoading(true);
          const response = await axios.post(`${API}/auth/session`, null, {
            params: { session_id: sessionId },
            withCredentials: true
          });
          
          setUser(response.data.user);
          toast.success('Login successful!');
          
          // Clean URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Session processing failed:', error);
          toast.error('Authentication failed');
        } finally {
          setLoading(false);
        }
      } else {
        // Check for existing session
        try {
          const response = await axios.get(`${API}/auth/me`, {
            withCredentials: true
          });
          setUser(response.data);
        } catch (error) {
          // No active session
          console.log('No active session');
        } finally {
          setLoading(false);
        }
      }
    };

    checkSession();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#010101] flex items-center justify-center">
        <div className="text-white text-xl">Carregando Guild Origem...</div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-[#010101] text-white">
      <Router>
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forum" element={<Forum user={user} />} />
          <Route path="/post/:id" element={<PostDetail user={user} />} />
          <Route path="/members" element={<Members />} />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} 
          />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
