
import { DocumentItem, Category, ItemStatus, ServiceItem, ContactMessage, MessageStatus } from '../types';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';

const DOCS_COLLECTION = 'documents';
const SERVICES_COLLECTION = 'services';
const MESSAGES_COLLECTION = 'messages';
const ADMIN_COLLECTION = 'admin';

// Cache for initial data
let initialDocumentsCache: DocumentItem[] | null = null;
let initialServicesCache: ServiceItem[] | null = null;

// Load initial data from static files (for fallback)
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
  getAdminCreds: async (): Promise<{ username: string; password: string }> => {
    try {
      const adminDoc = await getDocs(collection(db, ADMIN_COLLECTION));
      if (!adminDoc.empty) {
        const data = adminDoc.docs[0].data();
        return { username: data.username || 'admin', password: data.password || 'admin123' };
      }
      return { username: 'admin', password: 'admin123' };
    } catch (error) {
      console.error('Error getting admin creds:', error);
      return { username: 'admin', password: 'admin123' };
    }
  },

  updateAdminCreds: async (creds: { username: string; password: string }): Promise<void> => {
    try {
      const adminRef = doc(db, ADMIN_COLLECTION, 'creds');
      await updateDoc(adminRef, creds);
    } catch (error) {
      console.error('Error updating admin creds:', error);
    }
  },

  // Document Management
  getDocuments: async (): Promise<DocumentItem[]> => {
    try {
      const q = query(collection(db, DOCS_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const docs: DocumentItem[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() } as DocumentItem);
      });
      if (docs.length === 0) {
        // Load initial data if empty
        const initial = await getInitialDocuments();
        for (const item of initial) {
          await addDoc(collection(db, DOCS_COLLECTION), item);
        }
        return initial;
      }
      return docs;
    } catch (error) {
      console.error('Error getting documents:', error);
      return await getInitialDocuments();
    }
  },

  getVisibleDocuments: async (): Promise<DocumentItem[]> => {
    const docs = await storageService.getDocuments();
    return docs.filter(d => d.status === ItemStatus.VISIBLE);
  },

  addDocument: async (docData: Omit<DocumentItem, 'id' | 'createdAt' | 'status'>): Promise<DocumentItem> => {
    const newDoc: Omit<DocumentItem, 'id'> = {
      ...docData,
      status: ItemStatus.VISIBLE,
      createdAt: Date.now()
    };
    const docRef = await addDoc(collection(db, DOCS_COLLECTION), newDoc);
    return { id: docRef.id, ...newDoc };
  },

  updateDocument: async (id: string, updates: Partial<DocumentItem>): Promise<void> => {
    const docRef = doc(db, DOCS_COLLECTION, id);
    await updateDoc(docRef, updates);
  },

  setStatus: async (id: string, status: ItemStatus): Promise<void> => {
    await storageService.updateDocument(id, { status });
  },

  hardDeleteDocument: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, DOCS_COLLECTION, id));
  },

  // Service Management
  getServices: async (): Promise<ServiceItem[]> => {
    try {
      const q = query(collection(db, SERVICES_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const services: ServiceItem[] = [];
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() } as ServiceItem);
      });
      if (services.length === 0) {
        // Load initial data if empty
        const initial = await getInitialServices();
        for (const item of initial) {
          await addDoc(collection(db, SERVICES_COLLECTION), item);
        }
        return initial;
      }
      return services;
    } catch (error) {
      console.error('Error getting services:', error);
      return await getInitialServices();
    }
  },

  addService: async (serviceData: Omit<ServiceItem, 'id' | 'createdAt'>): Promise<ServiceItem> => {
    const newService: Omit<ServiceItem, 'id'> = {
      ...serviceData,
      createdAt: Date.now()
    };
    const docRef = await addDoc(collection(db, SERVICES_COLLECTION), newService);
    return { id: docRef.id, ...newService };
  },

  updateService: async (id: string, updates: Partial<ServiceItem>): Promise<void> => {
    const docRef = doc(db, SERVICES_COLLECTION, id);
    await updateDoc(docRef, updates);
  },

  deleteService: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, SERVICES_COLLECTION, id));
  },

  // Async methods for loading initial data
  loadInitialDocuments: async (): Promise<DocumentItem[]> => {
    return await getInitialDocuments();
  },

  loadInitialServices: async (): Promise<ServiceItem[]> => {
    return await getInitialServices();
  },

  // Message Management
  getMessages: async (): Promise<ContactMessage[]> => {
    try {
      const q = query(collection(db, MESSAGES_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const messages: ContactMessage[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as ContactMessage);
      });
      return messages;
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  },

  addMessage: async (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<void> => {
    const newMessage: Omit<ContactMessage, 'id'> = {
      ...msg,
      status: MessageStatus.UNREAD,
      createdAt: Date.now()
    };
    await addDoc(collection(db, MESSAGES_COLLECTION), newMessage);
  },

  updateMessageStatus: async (id: string, status: MessageStatus): Promise<void> => {
    const docRef = doc(db, MESSAGES_COLLECTION, id);
    await updateDoc(docRef, { status });
  },

  deleteMessage: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, MESSAGES_COLLECTION, id));
  }
};
