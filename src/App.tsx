import { ThemeProvider } from './context/ThemeProvider';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-ivory dark:bg-[#0c0f24] text-midnight dark:text-cream font-sans selection:bg-gold/30 selection:text-midnight dark:selection:text-cream transition-colors duration-200 relative overflow-x-hidden">
        <MainLayout>
          <Home />
        </MainLayout>
      </div>
    </ThemeProvider>
  );
}
