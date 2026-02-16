
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import CVPage from './pages/CVPage';
import { Category } from './types';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/xidmetlerimiz" element={<ServicesPage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/elaqe" element={<ContactPage />} />
            <Route 
              path="/diplomlar" 
              element={<CategoryPage category={Category.DIPLOMA} title="Diplomlar" />} 
            />
            <Route 
              path="/sertifikatlar" 
              element={<CategoryPage category={Category.CERTIFICATE} title="Sertifikatlar" />} 
            />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-400">İşə Bir Bax</h3>
              <p className="text-gray-400 mt-2">Peşəkar Xidmətlər | Diplom və Sertifikat Çapı</p>
              <p className="text-gray-400 mt-2"> ✆ +994771718614</p>
              <p className="text-gray-400 mt-2"> ✉ +994771718614</p>
              <p className="text-gray-400 mt-2"> ✉ snovruzov@outlook.com</p>
            </div>
            <div className="flex space-x-6 text-sm">
               {/* Social Icons - Hidden on very small screens */}
            <div className="hidden sm:flex items-center space-x-2 sm:space-x-3">
              {/* Instagram Icon */}
              <a href="https://www.instagram.com/ishebirbax" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="m16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* TikTok Icon */}
              <a href="https://www.tiktok.com/@ishebirbax" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                </svg>
              </a>

              {/* Telegram Icon */}
              <a href="https://web.telegram.org/k/#@ishebirbaxchannel" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </a>
            </div>
              <a href="#" className="hover:text-blue-400 transition-colors">Haqqımızda</a>
              <a href="/#/elaqe" className="hover:text-blue-400 transition-colors">Əlaqə</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Məxfilik Siyasəti</a>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} İşə Bir Bax. Bütün hüquqlar qorunur.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
