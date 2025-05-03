import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AtSign, User, Copy, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const id = await register(name, email);
      setUniqueId(id);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (uniqueId) {
      await navigator.clipboard.writeText(uniqueId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            <h1 className="text-3xl font-bold text-primary-600 mb-2">Get Started</h1>
            <p className="text-neutral-600">Create your account to organize your academic life</p>
          </div>
          
          {!uniqueId ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                startIcon={<User size={18} />}
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                startIcon={<AtSign size={18} />}
                required
              />
              
              <div className="pt-2">
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                >
                  Register
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                <h3 className="font-medium text-primary-800 mb-2">Your Unique ID</h3>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded border border-primary-200 font-mono text-lg">
                    {uniqueId}
                  </code>
                  <Button
                    variant="outline"
                    onClick={copyToClipboard}
                    icon={copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <p className="mt-2 text-sm text-primary-700">
                  Save this ID securely. You'll need it to log in to your account.
                </p>
              </div>
              
              <Button
                fullWidth
                onClick={() => navigate('/login')}
              >
                Continue to Login
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};