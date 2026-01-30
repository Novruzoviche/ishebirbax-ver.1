
export enum Category {
  DIPLOMA = 'Diploma',
  CERTIFICATE = 'Sertifikat'
}

export enum ItemStatus {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  DELETED = 'deleted'
}

export enum MessageStatus {
  UNREAD = 'unread',
  READ = 'read',
  REPLIED = 'replied'
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  status: ItemStatus;
  createdAt: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  highlights: string[]; // e.g. ["Laminasiya PULSUZ", "Ucuz qiymət"]
  createdAt: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: number;
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}

// CV Types
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Başlanğıc' | 'Danışıq' | 'Sərbəst' | 'Ana dili';
}

export interface Hobby {
  id: string;
  name: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    profileImage: string;
    summary: string;
  };
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  hobbies: Hobby[];
}

export type SectionType = 'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'hobbies';
