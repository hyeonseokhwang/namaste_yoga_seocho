// src/pages/programs/Workshops.jsx

export default function Workshops() {
  return (
    <section className="bg-white py-16 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-[#2B5A75] mb-6">
          Iyengar Yoga 커뮤니티 워크숍과 프로그램 안내
        </h2>

        <p className="mb-4">
          <strong>IYCK</strong>는 정기적인 워크숍과 프로그램을 통해
          수련자들이 Iyengar Yoga의 깊이를 체험하고,
          공동체와 함께 성장할 수 있는 기회를 제공합니다.
        </p>

        <p className="mb-4">
          이 프로그램들은 초보자부터 숙련자까지,
          누구나 참여할 수 있으며 Iyengar Yoga의 철학과 수련을
          실제로 경험할 수 있는 장을 열어갑니다.
        </p>

        <h3 className="text-2xl font-semibold text-[#2B5A75] mt-10 mb-4">
          주요 프로그램
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>정기 워크숍</strong> – 특정 아사나, 호흡법, 수련 주제를 심화 학습</li>
          <li><strong>공개 수업</strong> – 처음 Iyengar Yoga를 접하는 분들을 위한 무료/체험 클래스</li>
          <li><strong>교사 연수</strong> – 공인 교사 및 수련생을 위한 전문적 교육 과정</li>
          <li><strong>커뮤니티 모임</strong> – 회원 간의 교류와 공동체 활동</li>
        </ul>

        <p className="mt-8">
          각 프로그램의 일정과 신청 방법은
          추후 홈페이지 및 커뮤니티 채널을 통해 안내됩니다.
        </p>
      </div>
    </section>
  );
}
