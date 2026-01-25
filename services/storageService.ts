
import { DocumentItem, Category, ItemStatus, ServiceItem, ContactMessage, MessageStatus } from '../types';

const DOCS_STORAGE_KEY = 'ise_bir_bax_docs_v2';
const SERVICES_STORAGE_KEY = 'ise_bir_bax_services_v1';
const MESSAGES_STORAGE_KEY = 'ise_bir_bax_messages_v1';
const ADMIN_CREDS_KEY = 'ise_bir_bax_admin_creds_v1';

const initialDocs: DocumentItem[] = [
  {
    id: '1',
    title: 'Bakı Dövlət Universiteti - Bakalavr',
    description: 'İnformasiya Texnologiyaları üzrə fərqlənmə diplomu.',
    imageUrl: 'https://picsum.photos/seed/diploma1/800/600',
    category: Category.DIPLOMA,
    status: ItemStatus.VISIBLE,
    createdAt: Date.now() - 1000000
  },
  {
    id: '2',
    title: 'Google Data Analytics Professional',
    description: 'Data analitikası üzrə beynəlxalq dərəcəli sertifikat.',
    imageUrl: 'https://picsum.photos/seed/cert1/800/600',
    category: Category.CERTIFICATE,
    status: ItemStatus.VISIBLE,
    createdAt: Date.now() - 500000
  }
];

const initialServices: ServiceItem[] = [
  {
    id: 's1',
    title: 'Diplom Çapı',
    description: 'Yüksək keyfiyyətli kağızlarda diplomların peşəkar çapı.',
    imageUrl: 'https://picsum.photos/seed/diploma-print/800/600',
    highlights: ['Laminasiya PULSUZ', 'Yüksək Keyfiyy'],
    createdAt: Date.now()
  },
  {
    id: 's2',
    title: 'Sertifikat Çapı',
    description: 'Beynəlxalq standartlara uyğun sertifikatların dizaynı və çapı.',
    imageUrl: 'https://picsum.photos/seed/certificate-print/800/600',
    highlights: ['Sürətli Çatdırılma', 'Xüsusi Dizayn'],
    createdAt: Date.now()
  }
];

export const storageService = {
  // Admin Credentials
  getAdminCreds: () => {
    const data = localStorage.getItem(ADMIN_CREDS_KEY);
    return data ? JSON.parse(data) : { username: 'admin', password: 'admin123' };
  },

  updateAdminCreds: (creds: { username: string; password: string }) => {
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(creds));
  },

  // Document Management
  getDocuments: (): DocumentItem[] => {
    try {
      let data = localStorage.getItem(DOCS_STORAGE_KEY);
      if (!data) {
        // Check for old storage key and migrate
        const oldKey = 'ise_bir_bax_docs';
        const oldData = localStorage.getItem(oldKey);
        if (oldData) {
          try {
            const parsedOldData = JSON.parse(oldData);
            // Migrate to new key
            localStorage.setItem(DOCS_STORAGE_KEY, oldData);
            localStorage.removeItem(oldKey);
            return parsedOldData;
          } catch (e) {
            // If old data is corrupted, fall back to initial
          }
        }
        // No data found, initialize with initial docs
        localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(initialDocs));
        return initialDocs;
      }
      const parsedData = JSON.parse(data);
      // Ensure all documents have required fields
      const validData = parsedData.filter((doc: any) => 
        doc && typeof doc === 'object' && doc.id && doc.title && doc.imageUrl
      );
      if (validData.length !== parsedData.length) {
        // If some documents are invalid, save the valid ones
        localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(validData));
        return validData;
      }
      return parsedData;
    } catch (e) {
      // If any error occurs, reset to initial
      localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(initialDocs));
      return initialDocs;
    }
  },

  getVisibleDocuments: (): DocumentItem[] => {
    return storageService.getDocuments().filter(d => d.status === ItemStatus.VISIBLE);
  },

  addDocument: (doc: Omit<DocumentItem, 'id' | 'createdAt' | 'status'>): DocumentItem => {
    const docs = storageService.getDocuments();
    const newDoc: DocumentItem = {
      ...doc,
      id: Math.random().toString(36).substr(2, 9),
      status: ItemStatus.VISIBLE,
      createdAt: Date.now()
    };
    const updated = [newDoc, ...docs];
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(updated));
    return newDoc;
  },

  updateDocument: (id: string, updates: Partial<DocumentItem>): void => {
    const docs = storageService.getDocuments();
    const updated = docs.map(d => d.id === id ? { ...d, ...updates } : d);
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(updated));
  },

  setStatus: (id: string, status: ItemStatus): void => {
    storageService.updateDocument(id, { status });
  },

  hardDeleteDocument: (id: string): void => {
    const docs = storageService.getDocuments();
    const updated = docs.filter(d => d.id !== id);
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(updated));
  },

  // Service Management
  getServices: (): ServiceItem[] => {
    try {
      const data = localStorage.getItem(SERVICES_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(initialServices));
        return initialServices;
      }
      const parsedData = JSON.parse(data);
      // Ensure all services have required fields
      const validData = parsedData.filter((service: any) => 
        service && typeof service === 'object' && service.id && service.title && service.description && service.imageUrl
      );
      if (validData.length !== parsedData.length) {
        // If some services are invalid, save the valid ones
        localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(validData));
        return validData;
      }
      return parsedData;
    } catch (e) {
      // If any error occurs, reset to initial
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(initialServices));
      return initialServices;
    }
  },

  addService: (service: Omit<ServiceItem, 'id' | 'createdAt'>): ServiceItem => {
    const services = storageService.getServices();
    const newService: ServiceItem = {
      ...service,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    const updated = [newService, ...services];
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updated));
    return newService;
  },

  updateService: (id: string, updates: Partial<ServiceItem>): void => {
    const services = storageService.getServices();
    const updated = services.map(s => s.id === id ? { ...s, ...updates } : s);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updated));
  },

  deleteService: (id: string): void => {
    const services = storageService.getServices();
    const updated = services.filter(s => s.id !== id);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updated));
  },

  // Message Management
  getMessages: (): ContactMessage[] => {
    const data = localStorage.getItem(MESSAGES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): void => {
    const messages = storageService.getMessages();
    const newMessage: ContactMessage = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      status: MessageStatus.UNREAD,
      createdAt: Date.now()
    };
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify([newMessage, ...messages]));
  },

  updateMessageStatus: (id: string, status: MessageStatus): void => {
    const messages = storageService.getMessages();
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
  },

  deleteMessage: (id: string): void => {
    const messages = storageService.getMessages();
    const updated = messages.filter(m => m.id !== id);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
  }
};
