// src/components/AboutIyck.jsx

import { useEffect, useState } from 'react';

export default function AboutIyck() {
  const images = [
    '/img/practice1.jpg',
    '/img/practice2.jpg',
    '/img/practice3.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about-iyck bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* 좌측 이미지 */}
        <div className="rounded-lg overflow-hidden shadow-md order-2 md:order-1">
          <img
            src={images[currentImageIndex]}
            alt={`IYCK practice ${currentImageIndex + 1}`}
            className="w-full h-auto object-cover transition-opacity duration-1000"
          />
        </div>

        {/* 우측 텍스트 */}
        <div className="text-gray-800 text-lg leading-relaxed order-1 md:order-2">
          <h2 className="text-3xl font-bold text-[#2B5A75] mb-6">Iyengar Yoga Community Korea (IYCK) 소개</h2>
          <p className="mb-4">
            Iyengar Yoga Community Korea (IYCK)는 Iyengar Yoga의 철학과 전통을 바탕으로 한국에서
            정확하고 깊이 있는 요가 수련 문화를 만들어가고자 하는 비영리 단체입니다.
          </p>
          <p className="mb-4">
            2019년 3월 7일, 뜻을 함께하는 수련자들의 작은 모임으로 시작되어, 2024년 3월 14일
            공식 비영리단체로 설립되었습니다.
          </p>
          <p>
            IYCK는 올바른 Iyengar Yoga 수련을 지향하며, 이를 통해 몸과 마음의 균형과 성장을 함께 나누고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
