
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DocCard from '../components/DocCard';
import { storageService } from '../services/storageService';
import { DocumentItem, ServiceItem } from '../types';

// Declare Glider.js types
declare global {
  interface Window {
    Glider: new (element: HTMLElement, options?: any) => any;
  }
}

const HomePage: React.FC = () => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  const logos = [
    "https://i.imgur.com/LJiWqLZ.png",
    "https://i.imgur.com/SwvjkRv.png",
    "https://i.imgur.com/BJBeqe1.png",
    "https://i.imgur.com/LJiWqLZ.png",
    "https://i.imgur.com/SwvjkRv.png",
    "https://i.imgur.com/BJBeqe1.png",
    "https://i.imgur.com/SwvjkRv.png",
    "https://i.imgur.com/BJBeqe1.png",
    "https://i.imgur.com/SwvjkRv.png",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load data from Firestore
        const [docsData, servicesData] = await Promise.all([
          storageService.getVisibleDocuments(),
          storageService.getServices()
        ]);

        setDocs(docsData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to initial data
        const [initialDocs, initialServices] = await Promise.all([
          storageService.loadInitialDocuments(),
          storageService.loadInitialServices()
        ]);
        setDocs(initialDocs);
        setServices(initialServices);
      }
    };

    loadData();
  }, []);

  // Separate useEffect for Glider.js initialization
  useEffect(() => {
    if (services.length > 0) {
      // Initialize Glider.js for services slider
      const initializeGlider = () => {
        if (window.Glider && document.getElementById('services-glider')) {
          try {
            const glider = new window.Glider(document.getElementById('services-glider')!, {
              slidesToShow: 1,
              slidesToScroll: 1,
              draggable: true,
              dots: '.glider-dots-services',
              arrows: {
                prev: '.glider-prev-services',
                next: '.glider-next-services'
              },
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                }
              ]
            });

            // Auto-scroll functionality for infinite loop
            let autoScrollInterval: ReturnType<typeof setTimeout>;
            
            const startAutoScroll = () => {
              autoScrollInterval = setInterval(() => {
                try {
                  const currentSlide = glider.slide || 0;
                  const originalSlidesCount = services.length;
                  
                  if (currentSlide >= originalSlidesCount - 1) {
                    // Reset to beginning when reaching the end of original slides
                    glider.scrollItem(0, false);
                  } else {
                    glider.scrollItem(currentSlide + 1, true);
                  }
                } catch (e) {
                  // If glider operations fail, stop auto-scroll
                  stopAutoScroll();
                }
              }, 3000); // Auto-scroll every 3 seconds
            };

            const stopAutoScroll = () => {
              if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
              }
            };

            // Start auto-scroll
            startAutoScroll();

            // Pause auto-scroll on hover
            const gliderElement = document.getElementById('services-glider');
            if (gliderElement) {
              gliderElement.addEventListener('mouseenter', stopAutoScroll);
              gliderElement.addEventListener('mouseleave', startAutoScroll);
              
              // Also pause on touch for mobile
              gliderElement.addEventListener('touchstart', stopAutoScroll);
              gliderElement.addEventListener('touchend', () => {
                setTimeout(startAutoScroll, 2000); // Resume after touch
              });
            }

            // Pause on button interactions
            const prevBtn = document.querySelector('.glider-prev-services');
            const nextBtn = document.querySelector('.glider-next-services');
            
            if (prevBtn) {
              prevBtn.addEventListener('click', () => {
                stopAutoScroll();
                setTimeout(startAutoScroll, 5000); // Resume after 5 seconds
              });
            }
            
            if (nextBtn) {
              nextBtn.addEventListener('click', () => {
                stopAutoScroll();
                setTimeout(startAutoScroll, 5000); // Resume after 5 seconds
              });
            }
          } catch (e) {
            // If Glider.js fails to initialize, the slider will still show as a regular flex container
            console.warn('Glider.js initialization failed, falling back to static layout');
          }
        }
      };
      
      // Initialize after a short delay to ensure DOM is ready
      setTimeout(initializeGlider, 100);
    }
  }, [services]); // Depend on services to re-initialize when they load

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <section className="bg-transparent border-t border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Gücümüzü Sizdən Alırıq</h2>
          <div className="overflow-hidden relative">
            <div className="flex whitespace-nowrap" style={{
              animation: 'scroll 20s linear infinite'
            }}>
              {logos.map((logo, index) => (
                <img key={index} src={logo} alt={`Client Logo ${index + 1}`} className="h-[3cm] w-auto mx-4 flex-shrink-0" />
              ))}
              {logos.map((logo, index) => (
                <img key={`dup-${index}`} src={logo} alt={`Client Logo ${index + 1}`} className="h-[3cm] w-auto mx-4 flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Services Slider Section */}
      {services.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Xidmətlərimiz</h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
            </div>
            
            <div className="glider-contain">
              <div className="glider" id="services-glider">
                {/* Duplicate slides for infinite loop effect */}
                {services.concat(services).map((service, index) => (
                  <div key={`${service.id}-${index}`} className="glider-slide service-card">
                    <div className="bg-gray-50 rounded-2xl p-6 h-full flex flex-col">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title} 
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.highlights.map((highlight, idx) => (
                          <span 
                            key={idx} 
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
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
                ))}
              </div>
              
              <button aria-label="Previous" className="glider-prev glider-prev-services">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button aria-label="Next" className="glider-next glider-next-services">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div role="tablist" className="glider-dots glider-dots-services"></div>
            </div>
          </div>
        </section>
      )}

      <main id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sizin Üçün</h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
        </div>

        {docs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-gray-500 text-lg">Hələ heç bir sənəd əlavə edilməyib.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-start">
            {docs.map(doc => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </main>

      <style>{`
        /* Glider.js Clean Carousel Styles */
        .glider-contain {
          position: relative;
        }
        
        .glider {
          overflow: hidden;
        }
        
        /* Fallback for when Glider.js is not available */
        .glider:not(.glider-track) {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }
        
        .glider:not(.glider-track) .glider-slide {
          flex: 0 0 auto;
          width: 100%;
          max-width: 350px;
        }
        
        @media (min-width: 768px) {
          .glider:not(.glider-track) .glider-slide {
            width: calc(50% - 15px);
          }
        }
        
        @media (min-width: 1024px) {
          .glider:not(.glider-track) .glider-slide {
            width: calc(33.33% - 15px);
          }
        }
        
        .glider-track {
          display: flex;
        }
        
        .glider-slide {
          flex: 0 0 auto;
          padding: 0 15px;
          transition: transform 0.3s ease;
        }
        
        .glider-slide.service-card {
          width: 100%;
          max-width: 350px;
        }
        
        /* All slides are equally bright and sharp */
        .glider-slide {
          opacity: 1 !important;
          transform: scale(1) !important;
          filter: none !important;
        }
        
        /* Navigation buttons */
        .glider-prev, .glider-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #374151;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .glider-prev:hover, .glider-next:hover {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
          transform: translateY(-50%) scale(1.1);
        }
        
        .glider-prev {
          left: -25px;
        }
        
        .glider-next {
          right: -25px;
        }
        
        /* Dots */
        .glider-dots {
          display: flex;
          justify-content: center;
          margin-top: 30px;
        }
        
        .glider-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #d1d5db;
          margin: 0 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .glider-dot:hover {
          background: #9ca3af;
        }
        
        .glider-dot.active {
          background: #3b82f6;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .glider-prev, .glider-next {
            width: 40px;
            height: 40px;
          }
          
          .glider-prev {
            left: -20px;
          }
          
          .glider-next {
            right: -20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
