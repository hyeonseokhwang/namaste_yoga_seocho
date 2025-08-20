// src/pages/Teachers.jsx

export default function Teachers() {
  const teacherList = [
    {
      name: "홍정순 (Jennifer Hong)",
      location: "서울",
      phone: "82 50 7136 3212",
      email: "jshong3212@gmail.com",
      instagram: "https://www.instagram.com/metayogalife"
    },
    {
      name: "김아람 (Aram Kim)",
      location: "서울",
      phone: "82 10 3066 8458",
      email: "yogaram.kim@gmail.com",
      instagram: "https://www.instagram.com/yogaram.kim"
    },
    {
      name: "김정민 (Jung-Min Kim)",
      location: "서울",
      phone: "82 10 5633 6878",
      email: "iyengaryogamin@gmail.com",
      website: "https://www.iyengaryogamin.com",
      instagram: "https://www.instagram.com/iyengaryogamin"
    },
    {
      name: "황정인 (Jungin Hwang)",
      location: "산청/온라인",
      phone: "82 10 3999 4486",
      email: "jungin.k.hwang@gmail.com",
      instagram: "https://www.instagram.com/yogasings/"
    },
    {
      name: "강경희 (Mia Kang)",
      location: "서울 / 나마스테 서초 요가원",
      phone: "82 10 3340 7633",
      email: "iyengaryogaseoul.mia@gmail.com",
      instagram: "https://www.instagram.com/iyengar_namaste_yoga_studio"
    },
    {
      name: "김명규 (Luie Kim)",
      location: "서울",
      phone: "82 10 9391 3800",
      email: "yoga.mkkim@gmail.com",
      instagram: "https://www.instagram.com/yoga.luie"
    },
    {
      name: "김옥교 (Okgya Kim)",
      location: "부산 / 단지요가 (부산시 수영구 수영로 570)",
      phone: "82 10 8723 3708",
      email: "daniyogaiyengar@gmail.com",
      blog: "https://blog.naver.com/danjiyoga",
      instagram: "https://www.instagram.com/danjiyoga/",
      facebook: "https://www.facebook.com/okayakim/"
    },
    {
      name: "양삼선 (Samsun Yang)",
      location: "부산 / 디얀요가원 (부산시 동래구)",
      phone: "82 10 2243 8207",
      email: "dhanyoga@daum.net",
      blog: "https://blog.naver.com/dhyanyoga"
    },
    {
      name: "김유진 (Youjin Kim)",
      location: "서울 / 요가 사다나 (서울시 양천구 신목로 82, 2층)",
      phone: "82 2 2646 0605",
      email: "ujin0124@gmail.com",
      instagram: "https://www.instagram.com/iyengaryoga_sadhana_seoul",
      facebook: "https://www.facebook.com/iyengaryoga_practicer_ujin"
    }
  ];

  return (
    <section className="bg-white py-16 px-6 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-[#2B5A75] mb-10">한국 Iyengar Yoga 공인 인증 교사 명단</h2>

        <ul className="space-y-8">
          {teacherList.map((teacher, idx) => (
            <li key={idx} className="border-b pb-6">
              <p className="text-xl font-semibold text-[#2B5A75]">{teacher.name}</p>
              <p className="text-sm text-gray-600">{teacher.location}</p>
              <p className="text-sm">📞 {teacher.phone}</p>
              <p className="text-sm">📧 {teacher.email}</p>
              <div className="flex flex-wrap gap-4 mt-2">
                {teacher.website && (
                  <a href={teacher.website} className="text-blue-600 text-sm underline" target="_blank" rel="noreferrer">
                    Website
                  </a>
                )}
                {teacher.instagram && (
                  <a href={teacher.instagram} className="text-blue-600 text-sm underline" target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                )}
                {teacher.facebook && (
                  <a href={teacher.facebook} className="text-blue-600 text-sm underline" target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                )}
                {teacher.blog && (
                  <a href={teacher.blog} className="text-blue-600 text-sm underline" target="_blank" rel="noreferrer">
                    Blog
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
