// src/pages/FAQ.jsx

export default function FAQ() {
  return (
    <section className="bg-white py-16 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#2B5A75] mb-8">
          초보 수련자를 위한 안내 – FAQ
        </h2>

        <p className="mb-10 text-gray-700">
          아엥가 요가가 생소하신 분들을 위해 자주 묻는 질문을 정리했습니다.
          누구나 안전하게 수련을 시작할 수 있도록 도움이 되길 바랍니다.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">1. 아엥가 요가는 왜 도구를 쓰나요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              도구는 동작을 더 안전하고 정확하게 익히도록 도와줍니다. 개인의 유연성이나 체력에 따라 부담 없이
              자세를 익힐 수 있도록 돕고, 수련의 깊이를 확장하는 데에도 유용합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">2. 왜 이렇게 천천히, 디테일하게 가르치나요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              각 자세에 깃든 정렬과 작용을 깊이 이해하고 내면화하기 위해서입니다. 속도보다 의식과 정확성을
              중시하는 것이 아엥가 요가의 특징입니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">3. 같은 동작을 매번 반복하는 이유는 뭔가요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              반복은 익숙함을 넘어 '깊은 이해'로 나아가기 위한 수련입니다. 동일한 자세도 매번 새로운 관찰과
              통찰을 허용합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">4. 몸이 뻣뻣해도 할 수 있나요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              물론입니다. 아엥가 요가는 유연성보다 '올바른 방향성'과 '주의 깊은 수련'을 중시합니다. 도구를 통해
              각자에게 맞는 방식으로 수련할 수 있습니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">5. 왜 짧은 반바지를 입나요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              무릎과 허벅지의 정렬을 눈으로 확인하기 위함입니다. 정확한 수련을 위해 관절의 위치와 움직임을
              관찰할 수 있는 복장을 권장합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">6. 스탠딩 포즈만 하나요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              아닙니다. 스탠딩 포즈는 모든 자세의 기본이며 몸의 구조를 바로잡는 기초 단계입니다. 그 외에도
              전굴, 후굴, 트위스트, 인버전(거꾸로 서는 자세) 등 다양한 동작을 체계적으로 익혀갑니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">7. 아엥가 요가 선생님은 어떻게 되나요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              공식 멘토 아래에서 수년간의 꾸준한 수련과 교육을 받은 후, 국제 기준에 따라 자격시험을 통해
              공인됩니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">8. 아엥가 요가에서도 어려운 자세를 하나요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              물론입니다. 아엥가 요가는 기초부터 고급 아사나까지 매우 넓은 범위의 동작을 다룹니다. 단계적으로
              접근하며, 깊은 이해와 안전을 우선합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">9. 최종 자세(풀 포즈)를 왜 바로 안 하나요?</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              모양보다 '안정성과 준비된 상태'를 더 중요하게 보기 때문입니다. 점진적으로 신체를 준비시켜
              자세의 본질에 도달하는 방식입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
