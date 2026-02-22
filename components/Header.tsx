
import React from 'react';
import DualCounter from './DualCounter';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in">
          Peşəkar Xidmət, Sizin üçün!
        </h1>
        <DualCounter />
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://wa.me/994771718614" className="bg-white text-blue-700 px-2 py-1 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition-all">
            Dayanma, Bizə yaz!
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 rounded-t-[50px] md:rounded-t-[100px]"></div>
    </header>
  );
};

export default Header;
