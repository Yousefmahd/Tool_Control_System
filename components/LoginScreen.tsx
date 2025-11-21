import { useState } from 'react';
import { Lock, User, Eye, EyeOff, Wrench, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { mockUsers } from '../data/mockData';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Check if user exists in mockUsers
      const user = mockUsers.find(
        u => u.username.toLowerCase() === username.toLowerCase()
      );

      if (!user) {
        setError('Invalid username or password');
        setIsLoading(false);
        return;
      }

      // Check if user is a student (students cannot access the system)
      if (user.role === 'Student') {
        setError('Students do not have access to this system. Only administrators, lab engineers, and supervisors can sign in.');
        setIsLoading(false);
        return;
      }

      // Validate password
      if (password === 'password') {
        onLogin(username, password);
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800);
  };

  const quickLoginUser = (userUsername: string) => {
    setUsername(userUsername);
    setPassword('password');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-aviation-primary)] via-[var(--color-aviation-secondary)] to-[var(--color-neutral-700)] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl text-white">Tool Control</h1>
              <p className="text-lg text-white/80">Inventory Management System</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl text-white mb-2">Multi-Workshop Management</h3>
              <p className="text-white/80">
                Manage tools across Aviation, Mechanical, and Electrical workshops with role-based access control.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl text-white mb-2">Complete Tracking</h3>
              <p className="text-white/80">
                Track tool assignments, locations, maintenance schedules, and full movement history.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl text-white mb-2">Educational Tasks</h3>
              <p className="text-white/80">
                Create and manage student tasks with printable task cards and learning objectives.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="mb-8">
            <h2 className="text-3xl text-[var(--color-neutral-900)] mb-2">Welcome Back</h2>
            <p className="text-[var(--color-neutral-600)]">
              Sign in to access the Tool Control System
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-neutral-400)]" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pl-10"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-neutral-400)]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--color-aviation-primary)] hover:bg-[var(--color-aviation-primary-dark)] text-white h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-[var(--color-neutral-500)]">
              © 2025 Tool Control & Inventory Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}