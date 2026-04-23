import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from "./components";
import HomePage from './pages/HomePage';
import ProjectDetail from './pages/ProjectDetail';
import './index.scss';

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
          <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
      </div>
    </Router>
    );
}

export default App;