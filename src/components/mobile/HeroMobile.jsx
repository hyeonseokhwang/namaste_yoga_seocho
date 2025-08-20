export default function HeroMobile() {
  return (
    <section className="w-full bg-white">
      <div className="w-full h-[60vh] overflow-hidden">
        <img
          src="/img/iyanga.jpg"
          alt="B.K.S. Iyengar"
          className="object-cover w-full h-full grayscale"
        />
      </div>

      <div className="px-4 py-10 text-center text-gray-800">
        <blockquote className="italic text-lg leading-relaxed mb-4">
          “I do pray that my ending will be your beginning.<br />
          The great rewards and the countless blessings of a life spent following the Inward Journey await you.”
        </blockquote>
        <p className="text-sm mb-2 text-gray-600">
          <strong>B.K.S. Iyengar</strong>, <em>Light on Life</em><br />
          <span className="text-xs">Bellur Krishnamachar Sundararaja Iyengar (1918.12.14 – 2014.08.20)</span>
        </p>
        <blockquote className="text-base leading-relaxed">
          “저는 진심으로 바랍니다. 저의 끝이 당신의 시작이 되기를.<br />
          내면의 여정을 따르는 삶에는 위대한 보상과 셀 수 없는 축복이 기다리고 있습니다.”
        </blockquote>
        <p className="text-sm mt-2 text-gray-600">
          <strong>B.K.S. 아엥가</strong>, 『Light on Life』
        </p>
      </div>
    </section>
  );
}
