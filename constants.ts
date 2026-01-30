import { ResumeData } from './types';

export const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: "Aydın Məmmədov",
    jobTitle: "Baş Məhsul Dizayneri",
    email: "aydin.mammadov@example.com",
    phone: "+994 (50) 123-45-67",
    address: "Bakı, Azərbaycan",
    linkedin: "linkedin.com/in/aydin-design",
    profileImage: "https://picsum.photos/seed/aydin/400/400",
    summary: "İstifadəçi mərkəzli rəqəmsal həllərin yaradılmasında 8 ildən çox təcrübəyə malik fədakar Məhsul Dizayneri. Yüksək təsirli məhsulların çatdırılması üçün çarpaz funksional komandalara rəhbərlik etmək bacarığı. UI/UX dizaynı, prototipləşdirmə və istifadəçi araşdırması sahəsində ekspert."
  },
  experiences: [
    {
      id: "1",
      company: "TexnoNova Həllləri",
      position: "Baş Dizayner",
      location: "Bakı, Azərbaycan",
      startDate: "2020-03",
      endDate: "İndiyədək",
      description: "Flaqman mobil tətbiqinin yenidən dizaynına rəhbərlik etmişəm, nəticədə istifadəçi cəlbediciliyi 40% artmışdır. 5 dizaynerdan ibarət komandanı idarə etmiş və mühəndislik komandaları ilə sıx əməkdaşlıq etmişəm.",
      current: true
    },
    {
      id: "2",
      company: "Kreativ Nəbz Agentliyi",
      position: "UX Dizayner",
      location: "Gəncə, Azərbaycan",
      startDate: "2016-06",
      endDate: "2020-02",
      description: "Böyük müştərilər üçün hərtərəfli dizayn sistemləri hazırlamışam. Məlumatbara əsaslanan dizayn qərarları vermək üçün 100-dən çox istifadəçi müsahibəsi və istifadə qabiliyyəti testləri keçirmişəm.",
      current: false
    }
  ],
  education: [
    {
      id: "1",
      institution: "Azərbaycan Dövlət Rəssamlıq Akademiyası",
      degree: "Bakalavr",
      fieldOfStudy: "Qrafik Dizayn",
      startDate: "2012",
      endDate: "2016",
      description: "Tipografiya və rəqəmsal qarşılıqlı əlaqəyə fokuslanmışam."
    }
  ],
  skills: [
    { id: "1", name: "İstifadəçi İnterfeysi (UI) Dizaynı" },
    { id: "2", name: "İstifadəçi Təcrübəsi (UX) Dizaynı" },
    { id: "3", name: "Figma və Adobe Creative Suite" },
    { id: "4", name: "Prototipləşdirmə" },
    { id: "5", name: "React və Tailwind CSS" },
    { id: "6", name: "Agile Metodologiyası" }
  ],
  languages: [
    { id: "1", name: "Azərbaycan dili", proficiency: "Ana dili" },
    { id: "2", name: "İngilis dili", proficiency: "Sərbəst" },
    { id: "3", name: "Rus dili", proficiency: "Danışıq" }
  ],
  hobbies: [
    { id: "1", name: "Mənzərə Fotoqrafiyası" },
    { id: "2", name: "Velosiped sürmək" },
    { id: "3", name: "Kulinariya" }
  ]
};
