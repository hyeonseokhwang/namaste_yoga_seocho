import { useEffect, useState } from 'react';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="w-full bg-white">
      {isMobile ? (
        <div className="w-full">
          {/* 📱 모바일 */}
          <div className="w-full h-[45vh] overflow-hidden">
            <img
              src="/img/bkskofibphoto.jpg"
              alt="B.K.S. Iyengar"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="px-6 py-10 text-gray-800 text-[15px] leading-relaxed">
            <blockquote className="text-center italic text-lg text-gray-700 mb-6">
              <p>
                “I do pray that my ending will be your beginning.
                <br />
                The great rewards and the countless blessings of a life spent
                following the Inward Journey await you.”
              </p>
              <footer className="mt-4 text-sm text-gray-500">
                — <strong>B.K.S. Iyengar</strong>, <em>Light on Life</em>
              </footer>
              <div className="text-xs mt-1 text-gray-400">
                Bellur Krishnamachar Sundararaja Iyengar (1918.12.14 – 2014.08.20)
              </div>
            </blockquote>

            <div className="bg-gray-100 rounded-xl px-4 py-5 shadow-inner">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="block mb-2 font-semibold text-[#2B5A75]">
                  “저는 진심으로 바랍니다. 저의 끝이 당신의 시작이 되기를.”
                </span>
                <span className="block">
                  내면의 여정을 따르는 삶에는 위대한 보상과 셀 수 없는 축복이 기다리고 있습니다.
                </span>
              </p>
              <p className="text-xs text-right text-gray-500 mt-4">
                — <strong>B.K.S. 아엥가</strong>, 『Light on Life』
              </p>
            </div>
          </div>
        </div>
      ) : (
        // 💻 데스크탑
        <div className="w-full bg-black flex justify-center">
          <div
            className="relative w-full max-w-7xl"
            style={{
              aspectRatio: '3 / 2',
              backgroundImage: "url('/img/bkskofibphoto.jpg')",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '60% center',
            }}
          >
            {/* 주변 어둠 처리: 원본 밝기 유지, 중앙은 untouched */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {/* 좌우 */}
              <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-black to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-black to-transparent" />
              {/* 하단 */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </div>

            {/* 텍스트 박스 */}
            <div className="absolute bottom-10 right-10 max-w-xl text-white px-4 py-5 bg-black/20 rounded-lg shadow-lg z-10">
              <blockquote className="italic text-sm sm:text-base md:text-base font-light leading-relaxed tracking-normal text-right mb-3">
                “I do pray that my ending will be your beginning.<br />
                The great rewards and the countless blessings of a life spent
                following the Inward Journey await you.”
              </blockquote>
              <p className="text-xs text-gray-300 text-right mb-1">
                <strong>B.K.S. Iyengar</strong>, <em>Light on Life</em>
              </p>
              <p className="text-[11px] text-gray-400 text-right mb-4">
                Bellur Krishnamachar Sundararaja Iyengar (1918.12.14 – 2014.08.20)
              </p>

              <div className="bg-white/10 px-4 py-2 rounded-md">
                <p className="text-sm leading-relaxed text-right text-gray-100">
                  <span className="block font-semibold text-[#E2E8F0]">
                    “저는 진심으로 바랍니다. 저의 끝이 당신의 시작이 되기를.”
                  </span>
                  <span className="block text-gray-200">
                    내면의 여정을 따르는 삶에는 위대한 보상과 셀 수 없는 축복이 기다리고 있습니다.
                  </span>
                </p>
                <p className="text-xs text-right text-gray-300 mt-2">
                  — <strong>B.K.S. 아엥가</strong>, 『Light on Life』
                </p>
              </div>
            </div>
          </div>
        </div>

      )}
    </section>
  );
}
