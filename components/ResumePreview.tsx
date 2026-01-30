import React from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-2xl w-[210mm] min-h-[297mm] flex flex-row overflow-hidden" id="resume-canvas">
      {/* Sidebar - Tünd Arxa Fon */}
      <aside className="w-[75mm] bg-[#1e293b] text-white p-8 flex flex-col h-full min-h-[297mm]">
        {/* Profil Şəkli */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden mb-4 shadow-xl">
            <img
              src={data.personalInfo.profileImage || "https://picsum.photos/seed/placeholder/200/200"}
              alt="Profil"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <h1 className="text-2xl font-bold text-center tracking-tight leading-tight">{data.personalInfo.fullName}</h1>
          <p className="text-blue-300 font-medium text-sm mt-1 uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
        </div>

        {/* Əlaqə Məlumatları */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="bg-white/10 p-1.5 rounded"><Mail size={14} /></div>
            <span className="truncate">{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="bg-white/10 p-1.5 rounded"><Phone size={14} /></div>
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="bg-white/10 p-1.5 rounded"><MapPin size={14} /></div>
            <span>{data.personalInfo.address}</span>
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="bg-white/10 p-1.5 rounded"><Linkedin size={14} /></div>
              <span className="truncate">{data.personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>
            </div>
          )}
        </div>

        {/* Bacarıqlar Bölməsi */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Bacarıqlar</h3>
          <ul className="space-y-2">
            {data.skills.map((skill) => (
              <li key={skill.id} className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                {skill.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Dillər Bölməsi */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Dillər</h3>
          <div className="space-y-3">
            {data.languages.map((lang) => (
              <div key={lang.id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{lang.name}</span>
                  <span className="text-gray-400">{lang.proficiency}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 transition-all duration-500"
                    style={{ width: lang.proficiency === 'Ana dili' ? '100%' : lang.proficiency === 'Sərbəst' ? '80%' : lang.proficiency === 'Danışıq' ? '60%' : '30%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbilər Bölməsi */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Hobbilər</h3>
          <div className="flex flex-wrap gap-2">
            {data.hobbies.map((hobby) => (
              <span key={hobby.id} className="bg-white/10 px-2 py-1 rounded text-[11px] text-gray-300">
                {hobby.name}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Əsas Məzmun - Ağ Arxa Fon */}
      <main className="flex-grow bg-white p-12">
        {/* Profil Xülasəsi */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="w-8 h-1 bg-blue-600 rounded"></span> Haqqımda
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
            {data.personalInfo.summary}
          </p>
        </section>

        {/* İş Təcrübəsi */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-blue-600 rounded"></span> İş Təcrübəsi
          </h2>
          <div className="relative border-l-2 border-gray-100 ml-3 space-y-10">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8">
                {/* Zaman xətti nöqtəsi */}
                <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600 shadow-sm"></div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-3">{exp.company} | {exp.location}</p>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Təhsil */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-blue-600 rounded"></span> Təhsil
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex gap-4">
                <div className="w-1.5 h-auto bg-gray-100 rounded"></div>
                <div>
                  <h3 className="text-md font-bold text-gray-800">{edu.degree} - {edu.fieldOfStudy}</h3>
                  <p className="text-sm font-medium text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-tight">{edu.startDate} – {edu.endDate}</p>
                  {edu.description && <p className="text-xs text-gray-500 mt-2">{edu.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResumePreview;
