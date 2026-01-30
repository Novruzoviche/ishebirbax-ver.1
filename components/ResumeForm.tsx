import React, { useRef } from 'react';
import { ResumeData, Experience, Education, Skill, Language, Hobby } from '../types';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, Globe, Heart, Camera, Image as ImageIcon } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  setData: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, setData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('profileImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    };
    setData({ ...data, experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setData({
      ...data,
      experiences: data.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    setData({ ...data, experiences: data.experiences.filter(exp => exp.id !== id) });
  };

  const SectionHeader: React.FC<{ icon: React.ReactNode, title: string }> = ({ icon, title }) => (
    <div className="flex items-center gap-2 mb-6 border-b pb-2">
      <div className="text-blue-600">{icon}</div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
  );

  return (
    <div className="space-y-12 p-6 bg-white rounded-xl shadow-lg">
      {/* Şəxsi Məlumat */}
      <section>
        <SectionHeader icon={<User size={24} />} title="Şəxsi Məlumatlar" />

        {/* Profil Şəkli Yükləmə */}
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
              {data.personalInfo.profileImage ? (
                <img src={data.personalInfo.profileImage} alt="Profil" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110"
              title="Şəkli dəyişdir"
            >
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-grow space-y-2 text-center sm:text-left">
            <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Profil Şəkli</h4>
            <p className="text-xs text-gray-500 mb-3">CV-niz üçün pəşəkar bir şəkil seçin. Tövsiyə olunan formatlar: JPG, PNG.</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={triggerFileInput}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition shadow-sm flex items-center gap-2 mx-auto sm:mx-0"
            >
              <ImageIcon size={16} className="text-blue-600" />
              Şəkil Seç
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Tam Adınız"
            value={data.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Vəzifə"
            value={data.personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="E-poçt"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Telefon"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Ünvan / Şəhər"
            value={data.personalInfo.address}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="LinkedIn Profil Linki"
            value={data.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
          />
        </div>
        <div className="mt-4 relative">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-600">Pəşəkar Xülasə</label>
          </div>
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            placeholder="Pəşəkar fəaliyyətiniz haqqında qısa məlumat yazın..."
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          />
        </div>
      </section>

      {/* Təcrübə */}
      <section>
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <div className="flex items-center gap-2">
            <div className="text-blue-600"><Briefcase size={24} /></div>
            <h2 className="text-xl font-bold text-gray-800">İş Təcrübəsi</h2>
          </div>
          <button
            onClick={addExperience}
            className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={16} /> Əlavə et
          </button>
        </div>
        <div className="space-y-6">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative group">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  className="p-2 border border-gray-200 rounded bg-white"
                  placeholder="Şirkət"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
                <input
                  className="p-2 border border-gray-200 rounded bg-white"
                  placeholder="Vəzifə"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                />
                <input
                  className="p-2 border border-gray-200 rounded bg-white"
                  placeholder="Başlama (məs: 2020-01)"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
                <input
                  className="p-2 border border-gray-200 rounded bg-white"
                  placeholder="Bitmə (və ya 'İndiyədək')"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-500 uppercase">Öhdəliklər və Nailiyyətlər</span>
                </div>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg h-24 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                  placeholder="Vəzifəniz və əsas uğurlarınız haqqında yazın..."
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Təhsil */}
      <section>
        <SectionHeader icon={<GraduationCap size={24} />} title="Təhsil" />
        {data.education.map((edu) => (
          <div key={edu.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
            <input
              className="p-2 border border-gray-200 rounded bg-white"
              placeholder="Müəssisə / Universitet"
              value={edu.institution}
              onChange={(e) => setData({...data, education: data.education.map(ed => ed.id === edu.id ? {...ed, institution: e.target.value} : ed)})}
            />
            <input
              className="p-2 border border-gray-200 rounded bg-white"
              placeholder="Dərəcə (məs: Bakalavr)"
              value={edu.degree}
              onChange={(e) => setData({...data, education: data.education.map(ed => ed.id === edu.id ? {...ed, degree: e.target.value} : ed)})}
            />
          </div>
        ))}
      </section>

      {/* Bacarıqlar */}
      <section>
        <SectionHeader icon={<Code size={24} />} title="Bacarıqlar" />
        <div className="flex flex-wrap gap-2">
          {data.skills.map(skill => (
            <div key={skill.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm group">
              <input
                className="bg-transparent border-none focus:outline-none w-auto min-w-[60px]"
                value={skill.name}
                onChange={(e) => setData({...data, skills: data.skills.map(s => s.id === skill.id ? {...s, name: e.target.value} : s)})}
              />
              <button onClick={() => setData({...data, skills: data.skills.filter(s => s.id !== skill.id)})} className="text-gray-400 hover:text-red-500">
                <Trash2 size={12}/>
              </button>
            </div>
          ))}
          <button
            onClick={() => setData({...data, skills: [...data.skills, { id: Date.now().toString(), name: 'Yeni Bacarıq' }]})}
            className="px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:bg-gray-50"
          >
            + Bacarıq Əlavə Et
          </button>
        </div>
      </section>

      {/* Dillər və Hobbilər */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <SectionHeader icon={<Globe size={24} />} title="Dillər" />
          <div className="space-y-2">
            {data.languages.map(lang => (
              <div key={lang.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded group">
                <input className="bg-transparent border-none flex-grow" value={lang.name} onChange={(e) => setData({...data, languages: data.languages.map(l => l.id === lang.id ? {...l, name: e.target.value} : l)})}/>
                <select
                  className="bg-transparent border border-gray-200 rounded text-xs p-1"
                  value={lang.proficiency}
                  onChange={(e) => setData({...data, languages: data.languages.map(l => l.id === lang.id ? {...l, proficiency: e.target.value as any} : l)})}
                >
                  <option>Başlanğıc</option>
                  <option>Danışıq</option>
                  <option>Sərbəst</option>
                  <option>Ana dili</option>
                </select>
              </div>
            ))}
          </div>
        </section>
        <section>
          <SectionHeader icon={<Heart size={24} />} title="Hobbilər" />
          <div className="flex flex-wrap gap-2">
            {data.hobbies.map(hobby => (
              <div key={hobby.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                <input
                  className="bg-transparent border-none focus:outline-none w-auto min-w-[60px]"
                  value={hobby.name}
                  onChange={(e) => setData({...data, hobbies: data.hobbies.map(h => h.id === hobby.id ? {...h, name: e.target.value} : h)})}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeForm;
