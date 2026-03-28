import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Leaf, LogOut, History, Home, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi (हिंदी)' },
    { code: 'te', name: 'Telugu (తెలుగు)' }
  ];

  return (
    <nav className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">
              <Leaf className="h-6 w-6 text-white" />
              CropGuard AI
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {user ? (
                <>
                  <Link to="/" className="hover:bg-emerald-500 px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-1">
                    <Home className="w-4 h-4" /> {t('nav.home')}
                  </Link>
                  <Link to="/history" className="hover:bg-emerald-500 px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-1">
                    <History className="w-4 h-4" /> {t('nav.history')}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:bg-emerald-500 px-3 py-2 rounded-md font-medium transition-colors">{t('nav.login')}</Link>
                  <Link to="/register" className="bg-white text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-md font-semibold shadow-sm transition-colors">{t('nav.signup')}</Link>
                </>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative group ml-4 border-l border-emerald-500 pl-4">
              <button className="flex items-center gap-1 hover:text-emerald-200 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="uppercase text-xs font-bold">{i18n.language.split('-')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === lang.code ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-gray-700 hover:bg-emerald-50'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {user && (
              <div className="flex items-center ml-4 space-x-2 pl-4 border-l border-emerald-500">
                <span className="text-sm">{t('nav.hi')}, <span className="font-semibold">{user.username}</span></span>
                <button 
                  onClick={handleLogout}
                  className="ml-2 bg-emerald-700 hover:bg-emerald-800 px-3 py-1 rounded-md text-sm transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" /> {t('nav.logout')}
                </button>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex md:hidden items-center gap-2">
            {/* Language Selector Mobile */}
             <select 
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language.split('-')[0]}
                className="bg-emerald-700 text-white text-xs border-none rounded py-1 px-2 focus:ring-0"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.code.toUpperCase()}</option>
                ))}
              </select>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden pb-3 pt-2">
          {user ? (
            <div className="px-2 space-y-1 sm:px-3">
              <Link to="/" className="block hover:bg-emerald-500 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
              <Link to="/history" className="block hover:bg-emerald-500 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>{t('nav.history')}</Link>
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left block hover:bg-emerald-700 bg-emerald-800 px-3 py-2 rounded-md text-base font-medium mt-2"
              >
                {t('nav.logout')} ({user.username})
              </button>
            </div>
          ) : (
            <div className="px-2 space-y-1 sm:px-3">
              <Link to="/login" className="block hover:bg-emerald-500 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link>
              <Link to="/register" className="block hover:bg-emerald-500 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>{t('nav.signup')}</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
