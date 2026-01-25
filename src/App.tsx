import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Loadingpage from './pages/Loadingpage';
import BlogLayout from './pages/BlogLayout';
import CreateBlogPage from "@/pages/CreateBlogPage";


const HomePage = lazy(() => import('./pages/HomePage'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const PracticePage = lazy(() => import('./pages/PracticePage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const JobPage = lazy(() => import('./pages/JobPage'));
const PointsPage = lazy(() => import('./pages/PointsPage'));

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors'>
      <Header />
      <main>
        <Suspense fallback={<Loadingpage />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/job" element={<JobPage />} />
            <Route path="/points" element={<PointsPage />} />
            <Route path="/blog" element={<Navigate to="/blog/1" replace />} />
            <Route path="/blog/:id" element={<BlogLayout />} />
            <Route path="/blogs/new" element={<CreateBlogPage />} />

          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;