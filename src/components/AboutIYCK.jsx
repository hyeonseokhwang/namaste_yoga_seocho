// src/components/AboutIyck.jsx

import { useEffect, useState } from 'react';
import { Users, CalendarDays, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <section className="about-iyck bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse lg:flex-row gap-12 items-center">
        {/* 텍스트 좌측 (데스크탑 기준) */}
        <div className="text-gray-800 text-[17px] leading-relaxed order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B5A75] mb-8">
            Iyengar Yoga Community Korea (IYCK) 소개
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-[#2B5A75] mt-1" />
              <p>
                <strong>IYCK</strong>는 Iyengar Yoga의 철학과 전통을 바탕으로
                한국에서 정확하고 깊이 있는 요가 수련 문화를 만들어가고자 하는 비영리 단체입니다.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CalendarDays className="w-6 h-6 text-[#2B5A75] mt-1" />
              <p>
                2019년 3월 7일, 뜻을 함께하는 수련자들의 작은 모임으로 시작되어,
                2024년 3월 14일 공식 비영리단체로 설립되었습니다.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Sprout className="w-6 h-6 text-[#2B5A75] mt-1" />
              <p>
                IYCK는 올바른 Iyengar Yoga 수련을 지향하며, 이를 통해
                몸과 마음의 균형과 성장을 함께 나누고 있습니다.
              </p>
            </div>
          </div>
           {/* 자세히 보기 버튼 */}
           <Link
            to="/iyengar/iyck"
            className="inline-block px-6 py-3 bg-[#2B5A75] text-white text-sm font-medium rounded shadow hover:bg-blue-700 transition"
          >
            자세히 보기
          </Link>
        </div>

        {/* 이미지 우측 (데스크탑 기준) */}
        <div className="rounded-lg overflow-hidden shadow-md order-1 lg:order-2 w-full max-h-[500px]">
          <img
            src={images[currentImageIndex]}
            alt={`IYCK practice ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
        </div>
      </div>
    </section>
  );
}
