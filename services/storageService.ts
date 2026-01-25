
import { DocumentItem, Category, ItemStatus, ServiceItem, ContactMessage, MessageStatus } from '../types';

const DOCS_STORAGE_KEY = 'ise_bir_bax_docs_v2';
const SERVICES_STORAGE_KEY = 'ise_bir_bax_services_v1';
const MESSAGES_STORAGE_KEY = 'ise_bir_bax_messages_v1';
const ADMIN_CREDS_KEY = 'ise_bir_bax_admin_creds_v1';

// Cache for initial data
let initialDocumentsCache: DocumentItem[] | null = null;
let initialServicesCache: ServiceItem[] | null = null;

// Load initial data from static files
const loadInitialDocuments = async (): Promise<DocumentItem[]> => {
  try {
    const response = await fetch('/initial-documents.json');
    if (!response.ok) throw new Error('Failed to load initial documents');
    const data = await response.json();
    return data.map((doc: any) => ({
      ...doc,
      category: doc.category as Category,
      status: doc.status as ItemStatus
    }));
  } catch (error) {
    console.error('Error loading initial documents:', error);
    return [];
  }
};

const loadInitialServices = async (): Promise<ServiceItem[]> => {
  try {
    const response = await fetch('/initial-services.json');
    if (!response.ok) throw new Error('Failed to load initial services');
    return await response.json();
  } catch (error) {
    console.error('Error loading initial services:', error);
    return [];
  }
};

// Get cached initial documents
const getInitialDocuments = async (): Promise<DocumentItem[]> => {
  if (initialDocumentsCache === null) {
    initialDocumentsCache = await loadInitialDocuments();
  }
  return initialDocumentsCache;
};

// Get cached initial services
const getInitialServices = async (): Promise<ServiceItem[]> => {
  if (initialServicesCache === null) {
    initialServicesCache = await loadInitialServices();
  }
  return initialServicesCache;
};

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
        // No data found, try to load from static file synchronously
        // For now, return empty array and let components handle loading
        // This will be improved with proper async handling
        return [];
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
      return [];
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
        // No data found, return empty array for now
        // Initial data will be loaded asynchronously by components
        return [];
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
      // If any error occurs, return empty array
      return [];
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

  // Async methods for loading initial data
  loadInitialDocuments: async (): Promise<DocumentItem[]> => {
    return await getInitialDocuments();
  },

  loadInitialServices: async (): Promise<ServiceItem[]> => {
    return await getInitialServices();
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
