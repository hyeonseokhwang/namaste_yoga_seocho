// Centralized programs/workshops data configuration
export const featuredWorkshop = {
  id: 'eyal-2025-09',
  // Default (ko) values
  dateLabel: '2025 SEPTEMBER',
  title: 'Eyal Shifroni 선생님 9월 워크숍',
  summary: '첫 공식 한국 방문. Iyengar Yoga 정렬·프롭·시퀀스·티칭 통합 접근을 3일 집중 구조로 체험합니다.',
  startDate: '2025-09-12T09:30:00+09:00',
  totalHours: 15,
  sessions: [
    '9/12 14:00–17:00',
    '9/13 09:30–12:30 · 14:30–16:30',
    '9/14 09:30–12:30 · 14:30–16:30'
  ],
  location: '공간 920 (강남 역삼로9길 20 B1)',
  tuition: '429,000원 (VAT 포함)',
  contacts: '김명규 · 홍윤서 · 김아람',
  email: 'iyengaryogacommunitykorea@gmail.com',
  focus: '정렬·프롭 통합 / 주제별 시퀀스 / 카운터 & 회복',
  images: [
    '/img/class/KakaoTalk_20250818_091833656_02.jpg',
    '/img/class/KakaoTalk_20250818_091833656_01.jpg'
  ],
  // English overrides (merged at runtime when lang==='en')
  en: {
    title: 'September Workshop with Eyal Shifroni',
    summary: 'First official visit to Korea. 3‑day intensive integrating alignment, props, sequencing & teaching in the Iyengar method.',
    sessions: [
      'Sep 12 14:00–17:00',
      'Sep 13 09:30–12:30 · 14:30–16:30',
      'Sep 14 09:30–12:30 · 14:30–16:30'
    ],
    location: 'Space 920 (Yeoksam-ro 9-gil 20 B1, Gangnam)',
    tuition: '₩429,000 (VAT incl.)',
    contacts: 'Myungkyu Kim · Yunseo Hong · Aram Kim',
    focus: 'Integrated alignment/props · Thematic sequences · Counter & Restorative'
  }
};

export const pastWorkshops = {
  '2025': [ '7월 19–20일 — George Dovas 선생님 (서울) 사진' ],
  '2024': [ '11월 — 홍귀석 선생님 워크숍', '7월 — Justin Herold 선생님 (멘토십 준비반)', '4월 — Justin Herold 선생님 (멘토십 준비반)' ],
  '2023': [ '10월 — Justin Herold 선생님', '4월 — 홍귀석 선생님' ],
};

// English timeline strings
export const pastWorkshopsEn = {
  '2025': [ 'July 19–20 — George Dovas (Seoul) photos' ],
  '2024': [ 'November — Workshop with Teacher Hong Gwiseok', 'July — Justin Herold (Mentorship Track)', 'April — Justin Herold (Mentorship Track)' ],
  '2023': [ 'October — Justin Herold', 'April — Teacher Hong Gwiseok' ],
};

// Additional upcoming workshops
export const moreUpcoming = [
  {
    id: 'justin-2025-11',
    dateLabel: '2025 NOVEMBER',
    title: 'Justin Herold · Satida 워크숍 (멘토십 과정)',
    summary: '멘토십 과정 학생 대상 3일 집중 수업. 논리적 아사나 설명과 기본기를 중시하는 지도 방식으로 심화 수련.',
    startDate: '2025-11-07T10:00:00+09:00',
    totalHours: 18,
    sessions: [
      '11/7(금) 10:00–13:00 · 14:30–17:30',
      '11/8(토) 10:00–13:00 · 14:30–17:30',
      '11/9(일) 10:00–13:00 · 14:30–17:30'
    ],
    location: '아이엥가요가 커뮤니티 코리아 (서울시 양천구 신목로 82 2층)',
    tuition: '500,000원 (VAT 포함)',
    contacts: '강경희 010-3340-7633 · 김유진 010-7126-5586 · 김정민 010-5633-6878',
    email: 'iyengaryogacommunitykorea@gmail.com',
    focus: '멘토십 집중 / 기본기 · 설명 · 태도',
    images: [
      'https://res.cloudinary.com/drzjmobkb/image/upload/f_auto,q_auto,w_1600/gallery/gtbpbtaufyczgicdr3jb.jpg'
    ],
    en: {
      title: 'Justin Herold · Satida Workshop (Mentorship Track)',
      summary: '3‑day intensive for mentorship-track students. Logical articulation of asana with emphasis on fundamentals & teaching attitude.',
      sessions: [
        'Nov 7 (Fri) 10:00–13:00 · 14:30–17:30',
        'Nov 8 (Sat) 10:00–13:00 · 14:30–17:30',
        'Nov 9 (Sun) 10:00–13:00 · 14:30–17:30'
      ],
      location: 'Iyengar Yoga Community Korea (82, Sinmok-ro 2F, Yangcheon-gu, Seoul)',
      tuition: '₩500,000 (VAT incl.)',
      contacts: 'Kyunghee Kang 010-3340-7633 · Yujin Kim 010-7126-5586 · Jungmin Kim 010-5633-6878',
      focus: 'Mentorship intensive · Fundamentals · Explanation · Attitude'
    }
  }
];
