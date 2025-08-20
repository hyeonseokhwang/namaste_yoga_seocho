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
            <h3 className="font-semibold text-lg text-[#2B5A75]">
              Q. 아엥가 요가는 다른 요가와 무엇이 다른가요?
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              아엥가 요가는 자세의 정확한 정렬과 세밀한 관찰을 중시합니다.
              블록, 벨트, 의자 등 다양한 도구를 활용하여 연령, 체력, 유연성에 관계없이
              누구나 안전하게 요가를 수련할 수 있습니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">
              Q. 요가를 처음 해도 참여할 수 있나요?
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              네. 초보자도 도구의 도움을 받아 올바른 자세를 안전하게 익힐 수 있습니다.
              수련은 단계적으로 진행되며, 개인의 신체적 조건에 맞게 지도됩니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">
              Q. 수련 시 어떤 준비물이 필요한가요?
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              편안한 복장과 함께 매트, 블록, 벨트 등이 사용됩니다.
              센터에서는 대부분의 도구가 제공되므로 개인 준비물은 최소화할 수 있습니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#2B5A75]">
              Q. 건강에 특별한 문제가 있어도 수련이 가능한가요?
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              아엥가 요가는 재활적 측면에서도 유익합니다. 
              단, 특정 질환이나 부상이 있는 경우 반드시 지도자와 상의하고, 
              안전하게 변형된 자세로 수련해야 합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
