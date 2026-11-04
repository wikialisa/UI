// src/App.tsx
import React, { useState, useEffect } from 'react';
import { PrototypeProvider, usePrototype } from './context/PrototypeContext';
import { MODULES_DATA } from './data/modulesData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { InteractivePrototypeBar } from './components/InteractivePrototypeBar';

const AppContent: React.FC = () => {
  const { activeModuleId, setModule } = usePrototype();
  const [currentModuleSlug, setCurrentModuleSlug] = useState<string | null>(null);

  // Sync with URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('module-')) {
        setCurrentModuleSlug(hash);
        const found = MODULES_DATA.find(m => m.slug === hash);
        if (found) {
          setModule(found.id);
        }
      } else {
        setCurrentModuleSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectModule = (slug: string | null) => {
    if (slug) {
      window.location.hash = slug;
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeModule = currentModuleSlug 
    ? MODULES_DATA.find(m => m.slug === currentModuleSlug)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <Header 
        currentModuleId={activeModule ? activeModule.id : null}
        onSelectModule={handleSelectModule}
      />

      {/* Global Interactive Cross-Module Prototype Controller */}
      <InteractivePrototypeBar />

      <main className="flex-1">
        {activeModule ? (
          <ModuleDetailPage module={activeModule} />
        ) : (
          <LandingPage onSelectModule={handleSelectModule} />
        )}
      </main>

      <Footer 
        currentModuleId={activeModule ? activeModule.id : null}
        onSelectModule={handleSelectModule}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PrototypeProvider>
      <AppContent />
    </PrototypeProvider>
  );
};

export default App;
