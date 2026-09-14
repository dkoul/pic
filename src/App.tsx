import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Intro } from './pages/Intro';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { History } from './pages/History';
import { Share } from './pages/Share';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/share/:publicId" element={<Share />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
