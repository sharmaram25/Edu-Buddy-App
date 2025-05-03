import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Key } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(uniqueId.trim());
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">Welcome Back</h1>
            <p className="text-neutral-600">Enter your unique ID to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Unique ID"
              type="text"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              placeholder="Enter your unique ID"
              startIcon={<Key size={18} />}
              required
            />
            
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                Continue
              </Button>
            </div>
            
            <div className="text-center text-sm text-neutral-600">
              <p>Don't have an ID? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Register here</Link></p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};