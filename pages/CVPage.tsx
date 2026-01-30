import React, { useState } from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import { INITIAL_DATA } from '../constants';
import { ResumeData } from '../types';
import { Download, FileText, Layout, Eye } from 'lucide-react';

const CVPage: React.FC = () => {
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-20">
      {/* Başlıq */}
      <header className="bg-white border-b sticky top-20 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Layout size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Öz CV'ni Yarat</h1>
              <p className="text-xs text-gray-500 font-medium">Professional CV Dizayn Sistemi</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === 'editor' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText size={16} /> Redaktor
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Eye size={16} /> Baxış
              </button>
            </div>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition shadow-lg active:scale-95"
            >
              <Download size={18} />
              PDF olaraq Yüklə
            </button>
          </div>
        </div>
      </header>

      {/* Əsas Məzmun Sahəsi */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr,210mm] gap-12 items-start justify-center">
          {/* Redaktor Tərəfi */}
          <div className={`${activeTab === 'editor' ? 'block' : 'hidden xl:block'} no-print`}>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">İnteraktiv İş Sahəsi</h3>
            </div>
            <ResumeForm data={data} setData={setData} />
          </div>

          {/* Baxış Tərəfi */}
          <div className={`${activeTab === 'preview' ? 'block' : 'hidden xl:block'} flex justify-center sticky top-28`}>
            <div className="origin-top scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-[1] xl:scale-[0.95] 2xl:scale-[1] transition-transform duration-300">
              <ResumePreview data={data} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobil Alt Naviqasiya */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around md:hidden no-print shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'editor' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <FileText size={20} />
          <span className="text-[10px] font-bold">REDAKTOR</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'preview' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Eye size={20} />
          <span className="text-[10px] font-bold">BAXIŞ</span>
        </button>
      </nav>

      {/* PDF Çıxarışı üçün arxa fon */}
      <div className={`fixed inset-0 bg-white z-[9999] ${isExporting ? 'flex' : 'hidden'} items-center justify-center`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold">Yüksək Keyfiyyətli PDF Hazırlanır...</h2>
          <p className="text-gray-500">A4 Çap üçün optimallaşdırılır</p>
        </div>
      </div>
    </div>
  );
};

export default CVPage;
