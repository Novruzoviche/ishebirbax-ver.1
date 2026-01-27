
import React, { useEffect, useState } from 'react';
import { storageService } from '../services/storageService';
import { ServiceItem } from '../types';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load services from Firestore
        const servicesData = await storageService.getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
        // Fallback to initial data
        const initialServices = await storageService.loadInitialServices();
        setServices(initialServices);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Diplom və Sertifikat Çapı – <span className="text-blue-600">Laminasiya Pulsuz</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Biz sizə peşəkar diplom və sertifikat çapı xidmətlərini təklif edirik. 
            Bütün çap işləri üçün laminasiya xidməti tamamilə <span className="font-bold text-emerald-600">pulsuzdur!</span> 
            Sürətli çatdırılma və münasib qiymətlərimizlə xidmətinizdəyik.
          </p>
        </section>

        <div className="flex flex-wrap gap-8 justify-center">
          {services.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 w-full">
              <p className="text-gray-500 text-lg">Hələ heç bir xidmət əlavə edilməyib.</p>
            </div>
          ) : (
            services.map((service) => (
              <div 
                key={service.id} 
                className="flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] group overflow-hidden"
              >
                <img src={service.imageUrl} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
                    {service.highlights.map((highlight, idx) => (
                      <span 
                        key={idx} 
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                          highlight.toLowerCase().includes('pulsuz') 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;
