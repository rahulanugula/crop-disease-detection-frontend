import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, User, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-emerald-50/30">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div>
          <div className="mx-auto h-16 w-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('login.subtitle')}{' '}
            <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
              {t('login.create_account')}
            </Link>
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow-xl shadow-emerald-100 rounded-2xl sm:px-10 border border-emerald-50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 animate-in shake-in duration-300">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('login.username')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-gray-50 transition-all focus:bg-white"
                    placeholder={t('login.username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('login.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-gray-50 transition-all focus:bg-white"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white transition-all transform active:scale-[0.98] ${isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200'}`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                t('login.sign_in')
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
