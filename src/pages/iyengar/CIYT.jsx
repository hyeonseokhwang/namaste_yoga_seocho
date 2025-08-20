// src/pages/iyengar/CIYT.jsx
export default function CIYT() {
  return (
    <section className="bg-white py-16 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2B5A75] mb-6">
          공인 Iyengar Yoga 교사(CIYT)란?
        </h2>

        <p className="mb-4">
          <strong>Certified Iyengar Yoga Teacher(CIYT)</strong>는 B.K.S. Iyengar와 그의 가족이
          정립한 아사나와 프라나야마 수련법을 정확하고 안전하게 지도할 수 있도록 정식 인증을
          받은 요가 교사를 의미합니다.
        </p>

        <p className="mb-4">
          B.K.S. Iyengar와 그의 가족이 남긴 전통적 가르침은 정통성과 일관성을 갖고 전수되기
          위해 RIMYI(인도 본원)의 기준에 따라 엄격하고 체계적인 수련 과정을 거쳐야 합니다.
        </p>

        <p className="mb-6">
          CIYT는 자격 취득 이후에도 지속적인 수련, 교육, 멘토링, 연수를 통해 지도 역량을
          유지·발전해야 하며, 전 세계 CIYT 체계는 RIMYI의 가이드라인에 따라 통합적으로 운영됩니다.
        </p>

        <div className="bg-gray-50 border-l-4 border-[#2B5A75] p-4 rounded mb-10">
          <p className="text-sm text-gray-700">
            ※ <strong>참고</strong>: “Iyengar Yoga” 명칭과 Certification Mark는 공인 교사(CIYT)만 사용할 수 있습니다.
            현재 CIYT의 지도 아래 수련 중이거나 멘토링 이수 사실은 언급할 수 있으나,
            스스로를 “Iyengar Yoga 교사”로 소개하는 등 혼동을 줄 수 있는 표현은 삼가야 합니다.
          </p>
        </div>

        {/* 인증 레벨 섹션 */}
        <h3 className="text-2xl font-semibold text-[#2B5A75] mb-4">
          CIYT 인증 레벨과 과정
        </h3>

        {/* Level 1 */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Level 1</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>공인 교사와 3년 이상의 정기 수련</li>
            <li>공인 멘토의 지도 아래 멘토링 프로그램 참여</li>
            <li>
              공식 평가(Assessment) 통과
              <span className="block text-sm text-gray-600">
                (기초 아사나 수행, 수업 지도 평가, 요가 이론 필기 시험)
              </span>
            </li>
          </ul>
        </div>

        {/* Level 2 */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Level 2</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Level 1 인증 이후 심화 수련 과정 이수</li>
            <li>중급 아사나 및 프라나야마 수행</li>
            <li>요가 철학 필기 시험 및 지도력 평가 포함</li>
          </ul>
        </div>

        {/* Level 3 */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Level 3</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Level 2 인증 이후 상급 수련 과정 이수</li>
            <li>상급 아사나 및 프라나야마 수행</li>
            <li>철학 이론 필기 시험 및 지도력 평가 포함</li>
          </ul>
        </div>

        {/* Level 4 */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Level 4</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Level 3 인증 이후 최상급 수련 과정 이수</li>
            <li>최상급 아사나 및 요가 철학에 대한 통합적 이해 요구</li>
            <li>Level 4부터는 RIMYI(인도 본원)에서 직접 인증 평가를 관장</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
