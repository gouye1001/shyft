import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Enterprise from './pages/Enterprise';
import Help from './pages/Help';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { ToastContainer, useToast } from './components/Toast';
import { AppProvider } from './src/context/AppContext';

export type Page = 'home' | 'features' | 'pricing' | 'login' | 'signup' | 'dashboard' | 'forgotPassword' | 'about' | 'contact' | 'enterprise' | 'help' | 'terms' | 'privacy';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const toast = useToast();

  // Page transition effect
  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 200);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Check if in dashboard/auth pages (no navbar/footer)
  const isFullscreenPage = currentPage === 'dashboard';
  const isAuthPage = ['login', 'signup', 'forgotPassword'].includes(currentPage);

  const renderPage = () => {
    const pageProps = {
      onNavigate: navigate,
      onShowToast: toast.addToast,
    };

    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'features': return <Features />;
      case 'pricing': return <Pricing onNavigate={navigate} />;
      case 'login': return <Login {...pageProps} />;
      case 'signup': return <Signup {...pageProps} />;
      case 'dashboard': return <Dashboard onNavigate={navigate} />;
      case 'forgotPassword': return <ForgotPassword {...pageProps} />;
      case 'about': return <About onNavigate={navigate} />;
      case 'contact': return <Contact onNavigate={navigate} onShowToast={toast.addToast} />;
      case 'enterprise': return <Enterprise onNavigate={navigate} onShowToast={toast.addToast} />;
      case 'help': return <Help />;
      case 'terms': return <Terms />;
      case 'privacy': return <Privacy />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <AppProvider>
      <div className="font-sans text-zinc-300 bg-black overflow-x-hidden min-h-screen flex flex-col noise-overlay">
        {/* Toast Notifications */}
        <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

        {/* Navigation - hidden on fullscreen pages */}
        {!isFullscreenPage && (
          <Navbar currentPage={currentPage} onNavigate={navigate} />
        )}

        {/* Main Content with transition */}
        <main
          className={`
            flex-grow transition-all duration-200
            ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
          `}
        >
          {renderPage()}
        </main>

        {/* Footer - hidden on fullscreen and auth pages */}
        {!isFullscreenPage && !isAuthPage && (
          <Footer onNavigate={navigate} />
        )}
      </div>
    </AppProvider>
  );
}