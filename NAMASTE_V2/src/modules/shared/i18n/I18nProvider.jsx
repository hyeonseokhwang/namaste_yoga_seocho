import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Simple i18n context: keeps current language, dictionary maps, and translation helper.
// Extend by adding nested objects; t accepts dot.path (e.g., 'nav.about').

const dictionaries = {
  ko: {
    nav: {
      about: '소개',
      iyengar: 'Iyengar',
      programs: '프로그램',
      teachers: '교사',
      gallery: '갤러리',
      faq: 'FAQ',
      contact: '문의'
    },
    theme: {
      toDark: '다크 모드로 전환',
      toLight: '라이트 모드로 전환'
    },
    lang: {
      switchToKo: '한국어로 보기',
      switchToEn: 'View in English'
    },
    about: {
      eyebrow: 'ABOUT',
      title: 'IYCK 소개',
      highlight: 'IYCK',
      descHtml: '<strong>IYCK</strong>는 Iyengar Yoga 철학과 전통을 기반으로 한국에서 <em>정확하고 깊이 있는 수련 문화</em>를 구축하는 비영리 커뮤니티입니다.',
      p1: '2019년 모임으로 시작 → 2024년 비영리 전환. Pune(RIMYI) 규범을 준수하며 신뢰 기반 성장 구조를 설계합니다.',
      p2: '정렬 · 시퀀스 · 타이밍 · 프롭 통합 지도와 공동체적 피드백 순환을 통해 개인 수련과 교사 역량을 함께 끌어올립니다.',
      more: '전체 소개 보기 →',
      programs: '프로그램',
      chips: ['2019 시작','2024 비영리 등록','Pune 규범 준수','Community Driven']
    },
    hero: {
      title: '깊은 호흡, 고요한 정렬',
      subtitle1: '바쁜 일상과 자극에서 한 발 물러나 <span class="font-semibold text-accent-200/90">정교한 디테일 · 안정된 호흡 · 의식적 정렬</span>을 체험하세요.',
      subtitle2: '지금 여기서 아이엥가 요가를 만나 몸과 마음의 구조를 다시 정렬하는 첫 발을 내딛어 보세요.',
      ctaExperience: '체험 클래스',
      ctaAbout: '단체 소개',
      ctaWhy: 'WHY?',
      aria: '메인 히어로 – 깊은 호흡 고요한 정렬'
    },
    footer: {
      mission: '정확성 · 정렬 · 의식적 호흡 · 프롭의 지혜를 바탕으로 한국 아이엥가 요가 문화를 연구 · 공유하는 비영리 커뮤니티.',
      contact: 'CONTACT',
      quick: 'QUICK LINKS',
      email: '이메일',
  emailOfficial: '공식',
      instagram: '인스타그램',
      location: '위치',
  locationValue: '서울시 양천구 신목로 82, 2층',
      rimyiLink: '리미 본 센터 홈페이지',
      rights: '© 2025 IYCK. All rights reserved.'
    },
    programsPreview: {
      eyebrow: 'PROGRAMS',
      title: 'Upcoming Focus',
      desc: '정확한 아사나와 의식적 호흡을 심화하는 집중 프로그램. 소규모 진행으로 개별 조정과 세밀한 피드백을 제공합니다.',
      categories: ['워크숍','테라퓨틱','호흡','개인세션(예정)'],
      allSchedule: '전체 일정 보기',
      featured: 'FEATURED',
      workshop: 'WORKSHOP',
      countdown: '개최까지',
      session1: '세션1',
      session2: '세션2',
      totalHours: '총시간',
      location: '장소',
      tuition: '수강료',
      contact: '문의',
      email: '이메일',
      details: '상세 / 신청 안내 →',
      pastPhotos: '지난 워크숍 사진',
      disclaimer: '※ 일정/구성은 상황에 따라 일부 조정될 수 있습니다.'
    },
    galleryRibbon: {
      title: 'Practice Gallery',
      viewAll: '전체 보기',
      alt: '수련 이미지'
    },
    teachersPreview: {
      eyebrow: 'TEACHERS',
      title: 'Certified Teachers',
      desc: '공인 교사들은 정렬·시퀀스·호흡 원리에 기반해 세밀하고 안전한 수련을 안내합니다.',
      reshuffle: '무작위 재배치',
      prev: '이전',
      next: '다음',
      fullList: '전체 명단'
    },
  faqPreview: {
      eyebrow: 'FAQ',
      title: 'FAQ Preview',
      more: 'WHY IYENGAR? 전체 FAQ →',
      subtitle: '도구 · 디테일 · 정렬 · 멘토링 · 반복 학습 등 9개 핵심 질문 모두 보기',
      items: [
        { q:'왜 도구를 사용하나요?', a:'도구는 개인의 체형과 유연성에 맞게 안전하고 정확한 정렬을 체득하도록 돕고 수련의 깊이를 확장합니다.' },
        { q:'왜 천천히 진행되나요?', a:'속도보다 의식과 정확성을 통해 신경계 안정 · 내면의 예민한 감각을 깨우기 위한 방식입니다.' },
        { q:'몸이 뻣뻣해도 가능한가요?', a:'정렬과 방향성 중심 접근이라 유연성과 무관하게 도구 도움으로 누구나 시작할 수 있습니다.' }
      ]
  },
    
    programsPage: {
      heroTitle: '프로그램 안내',
      heroDesc: '워크숍 · 공개 수업 · 교사 연수 · 커뮤니티 모임을 통해 Iyengar Yoga의 깊이를 단계적으로 체험합니다. 구조화된 학습과 공동체 경험을 연결합니다.',
  heroThumb1: '구조·정렬을 통한 단계적 확장',
  heroThumb2: '프롭 활용 & 회복 시퀀스',
      types: {
        workshop: ['정기 워크숍','주제·정렬·호흡·시퀀스 집중 심화'],
        intro: ['공개 수업','첫 체험 & 기본 원리 안내'],
        teacher: ['교사 연수','멘토링·티칭 스킬·평가 대비'],
        community: ['커뮤니티 모임','사례 공유 · 질의 · 회복 수련']
      },
    ongoing: '진행중',
    upcoming: '예정',
    manage: { add:'추가', edit:'수정', delete:'삭제', clone:'복제', save:'저장', cancel:'취소', image:'이미지', status:'상태', ongoing:'진행중', upcoming:'예정' },
  tags: { featured: 'FEATURED', workshop: 'WORKSHOP', ongoing: 'ONGOING', upcoming: 'UPCOMING', highlight: 'HIGHLIGHT', past: 'PAST' },
      session1: '세션1', session2: '세션2', totalHours: '총시간', location: '장소', tuition: '수강료', contact: '문의', email: '이메일', focus: '포커스',
      register: '신청 / 문의', disclaimer: '※ 시간/구성은 상황에 따라 일부 조정될 수 있습니다.',
      pastHeading: '지난 워크숍', years: '연도별 기록', highlight: '워크숍 하이라이트', highlightDesc: '2025년 7월 진행된 워크숍의 일부 현장 모습입니다. 전체 사진은 갤러리 전용 보기에서 더 탐색할 수 있습니다.',
      viewAllGallery: '전체 갤러리 보기', highlightNote: '※ 사진 구성은 갤러리 업데이트에 따라 순차 변동될 수 있습니다.'
    },
    galleryPage: {
      title: 'Practice Gallery',
      desc: '워크숍 · 클래스 · 수련 순간들을 아카이브합니다. 아래 버튼으로 전체 / George Dovas 워크숍 전용 보기 전환.',
      all: '전체 보기', george: 'George Dovas 워크숍', goPrograms: '프로그램 보기 →', loading: '불러오는 중…', fail: '불러오기 실패', none: '해당 폴더에서 jpg 이미지를 찾지 못했습니다.', enlarge: '이미지 확대', lightbox: '워크숍 이미지 보기', close: '닫기'
    },
    faqPage: {
      title: '초보 수련자를 위한 안내 – FAQ',
      desc: '아엥가 요가가 생소하신 분들을 위해 자주 묻는 질문을 정리했습니다. 누구나 안전하게 수련을 시작할 수 있도록 도움이 되길 바랍니다.',
      search: '검색', placeholder: '키워드 입력', total: '총', expandAll: '모두 펼치기', collapseAll: '모두 접기'
    },
    // Full FAQ content (numbered). Keep numbers in q for display; strip when needed.
    faqFull: {
      items: [
        { q:'1. 아엥가 요가는 왜 도구를 쓰나요?', a:'도구는 동작을 더 안전하고 정확하게 익히도록 도와줍니다. 개인의 유연성이나 체력에 따라 부담 없이 자세를 익힐 수 있도록 돕고, 수련의 깊이를 확장하는 데에도 유용합니다.' },
        { q:'2. 왜 이렇게 천천히, 디테일하게 가르치나요?', a:'각 자세에 깃든 정렬과 작용을 깊이 이해하고 내면화하기 위해서입니다. 속도보다 의식과 정확성을 중시하는 것이 아엥가 요가의 특징입니다.' },
        { q:'3. 같은 동작을 매번 반복하는 이유는 뭔가요?', a:"반복은 익숙함을 넘어 '깊은 이해'로 나아가기 위한 수련입니다. 동일한 자세도 매번 새로운 관찰과 통찰을 허용합니다." },
        { q:'4. 몸이 뻣뻣해도 할 수 있나요?', a:"물론입니다. 아엥가 요가는 유연성보다 '올바른 방향성'과 '주의 깊은 수련'을 중시합니다. 도구를 통해 각자에게 맞는 방식으로 수련할 수 있습니다." },
        { q:'5. 왜 짧은 반바지를 입나요?', a:'무릎과 허벅지의 정렬을 눈으로 확인하기 위함입니다. 정확한 수련을 위해 관절의 위치와 움직임을 관찰할 수 있는 복장을 권장합니다.' },
        { q:'6. 스탠딩 포즈만 하나요?', a:'아닙니다. 스탠딩 포즈는 모든 자세의 기본이며 몸의 구조를 바로잡는 기초 단계입니다. 그 외에도 전굴, 후굴, 트위스트, 인버전 등 다양한 동작을 체계적으로 익혀갑니다.' },
        { q:'7. 아엥가 요가 선생님은 어떻게 되나요?', a:'공식 멘토 아래에서 수년간의 꾸준한 수련과 교육을 받은 후, 국제 기준에 따라 자격시험을 통해 공인됩니다.' },
        { q:'8. 아엥가 요가에서도 어려운 자세를 하나요?', a:'물론입니다. 기초부터 고급 아사나까지 매우 넓은 범위를 다루며 단계적으로 접근합니다. 깊은 이해와 안전을 우선합니다.' },
        { q:'9. 최종 자세(풀 포즈)를 왜 바로 안 하나요?', a:"모양보다 '안정성과 준비된 상태'를 더 중요하게 보기 때문입니다. 점진적으로 신체를 준비시켜 자세의 본질에 도달합니다." }
      ]
    },
    iyckPage: {
      title: 'IYCK 소개',
      intro: 'Iyengar Yoga 철학과 전통을 기반으로 한국에서 정확하고 깊이 있는 수련 문화를 구축하고 수련자와 교사 모두의 성장 구조를 설계하는 비영리 단체입니다.',
      badges: ['2019 시작','2024 비영리 등록','Pune 규범 준수','Community Driven'],
      ctaAbout: '소개 바로가기',
      ctaOrg: '조직 구성',
      scroll: 'Scroll',
      toc: '이 페이지에서',
      sections: { about:'소개', org:'조직 구성', gallery:'갤러리' },
      orgList: ['회장: 강경희','대외협력: 김정민','실무지원: 김명규, 김옥교','교육지원: 양삼선, 김아람, 김유진','회계: 홍윤서'],
      orgNote: '위 구성원들은 자발적인 참여로 IYCK의 활동을 이끌고 있습니다. 문의나 협력이 필요하시면 커뮤니티 내 담당자와 연락하실 수 있습니다.'
    },
    gurujiPage: {
      title: 'B.K.S. Iyengar',
      subtitle: '현대 요가의 한 축을 세운 세계적 스승, 정렬과 주의 깊음으로 요가를 누구나 접근 가능한 보편적 실천으로 확장한 구루지.',
      badges: ['1918–2014','Light on Yoga','RIMYI 설립','Time 100 (2004)'],
      whoTitle: 'B.K.S. Iyengar는 누구인가요?',
      legacyTitle: '주요 이력',
      heritageTitle: '요가 지도자로서의 유산',
      introParas: [
  'B.K.S. Iyengar (Bellur Krishnamachar Sundararaja Iyengar, 1918–2014, 이하 아엥가 구루지)는 현대 요가를 대표하는 세계적인 요가 스승입니다.  그는 요가를 과학적이고 체계적으로 정립하여, 누구나 안전하게 접근할 수 있도록 길을 연 인물로 널리 알려져 있습니다.',
  '인도에서 태어난 그는 어린 시절 병약했으나, 요가 수련을 통해 스스로를 치유하고 단련했으며,  이후 평생에 걸쳐 요가의 본질과 깊이를 탐구했습니다.  특히 아사나(요가 자세)의 정렬과 정밀한 수행을 통해 신체, 마음, 지성, 감정, 영혼이 조화롭게 연결되는 길을 제시했고,  이를 전 세계 수련자들과 나누며 가르쳤습니다.',
  '아엥가요가는 아엥가 구루지의 철학과 접근 방식을 바탕으로 발전한 수련법으로,  정확한 정렬, 주의 깊은 관찰, 꾸준한 연습을 중시합니다.  또한 블록, 벨트, 의자, 벽 등 다양한 도구를 활용해 연령, 성별, 유연성, 체력, 질환 여부와 관계없이 누구나 요가의 본질과 효과를 경험할 수 있도록 안내합니다.  이러한 접근은 요가의 깊이를 안전하고 체계적으로 전달하는 데 중요한 역할을 했습니다.'
      ],
      legacyList: [
  '1918년 인도 벨루르에서 출생',
  '1934년 스승 T. 크리슈나마차리아에게서 요가를 배우기 시작',
  '1950년대 서양 세계에 요가를 알리기 시작',
  '1966년 현대 요가의 고전으로 불리는 『Light on Yoga』 출간',
  '1975년 인도 푸네에 라마마니 아엥가르 기념 요가 연구소(RIMYI) 설립',
  '2004년 타임지가 선정한 ‘세계에서 가장 영향력 있는 100인’에 포함',
  '2014년 인도 정부로부터 Padma Vibhushan 훈장 수훈'
      ],
      heritageParas: [
  '아엥가 구루지는 생애 끝까지 요가의 길 위에 서 계셨으며, 요가가 단순한 신체 운동이 아니라 삶을 깊이 있게 변화시키는 실천임을 몸소 보여주었습니다.',
  '그가 남긴 가르침은 단순한 수련법이 아니라, 자신의 몸과 마음을 정직하게 바라보고 조율하는 ‘삶의 태도’로 이어지고 있으며, 제자들과 가족들의 변함없는 헌신으로 지금도 살아 전해지고 있습니다.  많은 사람들이 그가 보여준 길 위에서 자신의 균형을 찾고, 스스로를 돌아보는 여정을 계속하고 있습니다.'
      ]
    },
    whatPage: {
      title: 'Iyengar Yoga란 무엇인가요?',
      subtitle: '정렬 · 시퀀스 · 타이밍 3원리를 통해 신체와 의식을 세밀하게 통합하는 전통 수련법.',
      principlesSummary: '핵심 3원리 요약',
      beginnerGuide: '처음 보는 분들을 위한 이해 가이드',
      beginnerDesc: 'Alignment · Props · Sequencing · Timing 네 가지를 시각과 비유로 풀어 아주 처음 접하는 분도 바로 감을 잡도록 구성했습니다.',
      safety: '안전 & 시작 팁'
    },
    teachersPage: {
      title: 'Certified Iyengar Teachers (CIYT)',
      subtitle: '정확성 · 안전성 · 일관성을 기반으로 한 Iyengar Yoga 전통을 공식적으로 전수할 수 있는 인증 교사 명단입니다.',
      snapshot: 'CIYT 한눈에',
      levels: 'CIYT 레벨 구조',
      snapshotBullets: [
        '다년간 개인 수련 & 멘토링 · 공식 평가 통과',
        'RIMYI 국제 가이드라인 준수',
        '지속 교육 · 연수 · 재평가로 역량 유지',
        '“Iyengar Yoga” 명칭 & Certification Mark 사용 권한'
      ],
      snapshotDetails: [
        'Certified Iyengar Yoga Teacher(CIYT)는 B.K.S. Iyengar와 그의 가족이 정립한 아사나와 프라나야마 수련법을 정확하고 안전하게 지도할 수 있도록 정식 인증을 받은 요가 교사를 의미합니다.',
        '전통적 가르침은 RIMYI(인도 본원)의 기준에 따라 엄격하고 체계적인 수련 과정을 거쳐 정통성과 일관성을 유지합니다.',
        'CIYT는 자격 취득 이후에도 지속적인 수련, 교육, 멘토링, 연수를 통해 지도 역량을 유지·발전해야 합니다.'
      ],
      levelsList: ['Level 1','Level 2','Level 3','Level 4'],
      levelDescriptions: [
        '3년 이상 정기 수련 · 멘토링 · 기초 아사나/지도 & 이론 평가 통과',
        'Level 1 이후 심화 · 중급 아사나 & 프라나야마 · 철학 필기 & 지도력 평가',
        'Level 2 이후 상급 수련 · 상급 아사나 & 프라나야마 · 철학/지도 종합 평가',
        '최상급 통합 수련 역량 · RIMYI 직접 평가 관장 단계'
      ],
      levelsNote: '※ 레벨 간 진행은 충분한 기간의 심화 수련과 멘토 평가를 전제로 합니다.',
      snapshotNote: '※ “Iyengar Yoga” 명칭과 Certification Mark는 공인 교사(CIYT)만 사용할 수 있습니다.'
    }
  },
  en: {
    nav: {
      about: 'About',
      iyengar: 'Iyengar',
      programs: 'Programs',
      teachers: 'Teachers',
      gallery: 'Gallery',
      faq: 'FAQ',
      contact: 'Contact'
    },
    theme: {
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode'
    },
    lang: {
      switchToKo: '한국어로 보기',
      switchToEn: 'View in English'
    },
    about: {
      eyebrow: 'ABOUT',
      title: 'About IYCK',
      highlight: 'IYCK',
      descHtml: '<strong>IYCK</strong> is a non-profit community in Korea building an <em>accurate and profound practice culture</em> grounded in the philosophy & tradition of Iyengar Yoga.',
      p1: 'Began as a gathering in 2019 → transitioned to non-profit in 2024. We design a trust-based growth structure aligned with Pune (RIMYI) standards.',
      p2: 'Through integrated teaching of alignment · sequencing · timing · props and a communal feedback loop we elevate both individual practice and teaching capacity.',
      more: 'Read full intro →',
      programs: 'Programs',
      chips: ['Founded 2019','Non-profit 2024','Aligned with Pune','Community Driven']
    },
    hero: {
      title: 'Deep Breath, Quiet Alignment',
      subtitle1: 'Step back from the noise and experience <span class="font-semibold text-accent-200/90">refined detail · steady breath · conscious alignment</span>.',
      subtitle2: 'Meet Iyengar Yoga here & now and take the first step toward re-aligning the structure of body and mind.',
      ctaExperience: 'Intro Class',
      ctaAbout: 'About',
      ctaWhy: 'WHY?',
      aria: 'Main hero – deep breath quiet alignment'
    },
    footer: {
      mission: 'A non-profit community in Korea researching & sharing Iyengar Yoga culture grounded in precision, alignment, conscious breath and the wisdom of props.',
      contact: 'CONTACT',
      quick: 'QUICK LINKS',
  email: 'Email',
  emailOfficial: 'Official',
  instagram: 'Instagram',
  location: 'Location',
  locationValue: '82, Sinmok-ro, Yangcheon-gu, Seoul (2F)',
      rimyiLink: 'RIMYI (Main Institute) – Website',
      rights: '© 2025 IYCK. All rights reserved.'
    },
    programsPreview: {
      eyebrow: 'PROGRAMS',
      title: 'Upcoming Focus',
      desc: 'Focused programs to deepen precise asana and conscious breath. Small groups allow individual adjustments and refined feedback.',
      categories: ['Workshop','Therapeutic','Breath','Private (soon)'],
      allSchedule: 'View all schedule',
      featured: 'FEATURED',
      workshop: 'WORKSHOP',
      countdown: 'Starts in',
      session1: 'Session1',
      session2: 'Session2',
      totalHours: 'Total',
      location: 'Location',
      tuition: 'Tuition',
      contact: 'Contact',
      email: 'Email',
      details: 'Details / Apply →',
      pastPhotos: 'Past workshop photos',
      disclaimer: '※ Schedule/content may adjust slightly.'
    },
    galleryRibbon: {
      title: 'Practice Gallery',
      viewAll: 'View all',
      alt: 'practice image'
    },
    teachersPreview: {
      eyebrow: 'TEACHERS',
      title: 'Certified Teachers',
      desc: 'Certified teachers guide nuanced and safe practice based on principles of alignment, sequencing and breath.',
      reshuffle: 'Reshuffle',
      prev: 'Prev',
      next: 'Next',
      fullList: 'Full list'
    },
  faqPreview: {
      eyebrow: 'FAQ',
      title: 'FAQ Preview',
      more: 'WHY IYENGAR? Full FAQ →',
      subtitle: 'See all 9 core questions: props · detail · alignment · mentoring · iterative learning etc.',
      items: [
        { q:'Why use props?', a:'Props help embody safe, precise alignment across body types & flexibility levels, deepening practice.' },
        { q:'Why slow pace?', a:'To awaken subtle perception & stabilize the nervous system through awareness and precision over speed.' },
        { q:'Can stiff bodies start?', a:'Yes. Alignment & directional approach with prop support allows anyone to begin irrespective of flexibility.' }
      ]
  },
    programsPage: {
      heroTitle: 'Programs Overview',
      heroDesc: 'Experience the depth of Iyengar Yoga progressively through workshops, intro classes, teacher mentoring and community gatherings. Structured learning meets shared practice.',
  heroThumb1: 'Progressive expansion through structure & alignment',
  heroThumb2: 'Prop intelligence & restorative sequencing',
      types: {
        workshop: ['Workshops','Deep focus on themes · alignment · breath · sequencing'],
        intro: ['Intro Classes','First experience & core principles'],
        teacher: ['Teacher Training','Mentoring · teaching skill · exam prep'],
        community: ['Community Meets','Case sharing · Q&A · restorative']
      },
    ongoing: 'Ongoing',
    upcoming: 'Upcoming',
    manage: { add:'Add', edit:'Edit', delete:'Delete', clone:'Clone', save:'Save', cancel:'Cancel', image:'Image', status:'Status', ongoing:'Ongoing', upcoming:'Upcoming' },
  tags: { featured: 'FEATURED', workshop: 'WORKSHOP', ongoing: 'ONGOING', upcoming: 'UPCOMING', highlight: 'HIGHLIGHT', past: 'PAST' },
      session1: 'Session1', session2: 'Session2', totalHours: 'Total', location: 'Location', tuition: 'Tuition', contact: 'Contact', email: 'Email', focus: 'Focus',
      register: 'Register', disclaimer: '※ Schedule/content may adjust slightly.',
      pastHeading: 'Past Workshops', years: 'By Year', highlight: 'Workshop Highlight', highlightDesc: 'Selected moments from the July 2025 workshop. Explore the full gallery for more images.',
      viewAllGallery: 'View full gallery', highlightNote: '※ Image order may update as gallery expands.'
    },
    galleryPage: {
      title: 'Practice Gallery',
      desc: 'Archiving workshop, class and practice moments. Use the buttons to toggle All / George Dovas focused view.',
      all: 'View All', george: 'George Dovas Workshop', goPrograms: 'View Programs →', loading: 'Loading…', fail: 'Load failed', none: 'No jpg images found in this folder.', enlarge: 'Enlarge image', lightbox: 'Workshop image viewer', close: 'Close'
    },
    faqPage: {
      title: 'Beginner Guidance – FAQ',
      desc: 'A collection of frequently asked questions for those new to Iyengar Yoga. We hope it supports a safe and grounded start.',
      search: 'Search', placeholder: 'Enter keyword', total: 'Total', expandAll: 'Expand all', collapseAll: 'Collapse all'
    },
    faqFull: {
      items: [
        { q:'1. Why does Iyengar Yoga use props?', a:'Props enable safer and more precise learning of actions & alignment across body types and flexibility levels, expanding the depth of practice.' },
        { q:'2. Why is the pace slow and detailed?', a:'To deeply absorb alignment, actions and direction. Iyengar Yoga prioritizes awareness and precision over speed.' },
        { q:'3. Why repeat the same poses so often?', a:'Repetition refines perception and converts familiarity into integrated understanding—each time reveals new layers.' },
        { q:'4. Can I practice if my body is stiff?', a:'Yes. Directional alignment and attentive work (with prop support) allow anyone to begin regardless of flexibility.' },
        { q:'5. Why the short shorts?', a:'They allow visual observation of knees and thighs for accurate alignment. Clear view supports precise adjustments.' },
        { q:'6. Do we only do standing poses?', a:'No. Standing poses build structural foundations. Forward bends, backbends, twists, inversions and restoratives are learned progressively.' },
        { q:'7. How do teachers get certified?', a:'Through years of consistent practice & mentoring under authorized guidance, followed by assessment under international standards.' },
        { q:'8. Are advanced poses included?', a:'Yes. The method spans foundational to advanced asana with a phased, safe progression emphasizing depth and clarity.' },
        { q:'9. Why not jump straight to the final (full) pose?', a:'Stability and preparedness come before final form. Gradual preparation reveals the essence without strain.' }
      ]
    },
    iyckPage: {
      title: 'About IYCK',
      intro: 'A non-profit building an accurate, deep Iyengar Yoga practice culture in Korea—designing growth structures for both practitioners and teachers.',
      badges: ['Founded 2019','Non-profit 2024','Aligned with Pune','Community Driven'],
      ctaAbout: 'Read Intro',
      ctaOrg: 'Organization',
      scroll: 'Scroll',
      toc: 'On this page',
      sections: { about:'About', org:'Organization', gallery:'Gallery' },
      orgList: ['President: Kyunghee Kang','External Relations: Jungmin Kim','Operations: Myungkyu Kim, Okgyo Kim','Education Support: Samsun Yang, Aram Kim, Yujin Kim','Accounting: Yunseo Hong'],
      orgNote: 'These members voluntarily support IYCK activities. For inquiries or collaboration, contact the relevant coordinator.'
    },
    gurujiPage: {
      title: 'B.K.S. Iyengar',
      subtitle: 'A global teacher who shaped modern yoga—broadening access through alignment, precision and mindful depth.',
      badges: ['1918–2014','Light on Yoga','Founded RIMYI','Time 100 (2004)'],
      whoTitle: 'Who is B.K.S. Iyengar?',
      legacyTitle: 'Major Milestones',
      heritageTitle: 'Legacy as a Teacher',
      introParas: [
        'B.K.S. Iyengar (1918–2014) was a seminal modern yoga master who systematically codified practice so it became safely accessible to a wide population.',
        'Born sickly, he transformed his own health through sustained practice and dedicated his life to exploring the depth and integrity of asana & pranayama—showing how alignment integrates body, breath, mind and emotion.',
        'The Iyengar method emphasizes precision, mindful observation and consistency, using props to meet individual conditions while preserving the central experiential principles.'
      ],
      legacyList: [
        '1918 Born in Bellur, India',
        '1934 Begins study with T. Krishnamacharya',
        '1950s Starts widely introducing yoga in the West',
        '1966 Publishes Light on Yoga',
        '1975 Founds RIMYI in Pune, India',
        '2004 Named to TIME 100 most influential',
        '2014 Receives Padma Vibhushan'
      ],
      heritageParas: [
        'Iyengar taught into the final years of his life, demonstrating yoga as a transformative discipline—not mere physical exercise.',
        'His teaching legacy centers on “honest observation + iterative alignment” and continues worldwide through dedicated students and family.'
      ]
    },
    whatPage: {
      title: 'What is Iyengar Yoga?',
      subtitle: 'A traditional method integrating body and awareness via the triad: Alignment · Sequencing · Timing.',
      principlesSummary: 'Core Principles Summary',
      beginnerGuide: 'Beginner-Friendly Understanding Guide',
      beginnerDesc: 'Alignment · Props · Sequencing · Timing mapped visually so first-timers grasp the method quickly.',
      safety: 'Safety & Starting Tips'
    },
    teachersPage: {
      title: 'Certified Iyengar Teachers (CIYT)',
      subtitle: 'Officially certified teachers authorized to transmit the Iyengar Yoga tradition with precision, safety and consistency.',
      snapshot: 'CIYT at a Glance',
      levels: 'CIYT Level Structure',
      snapshotBullets: [
        'Years of personal practice & mentoring; formal assessment',
        'Adherence to RIMYI international guidelines',
        'Ongoing education, workshops & re-assessment',
        'Authorization to use “Iyengar Yoga” name & Certification Mark'
      ],
      snapshotDetails: [
        'A Certified Iyengar Yoga Teacher (CIYT) is formally assessed to convey asana & pranayama with precision and safety according to the Iyengar family standards.',
        'Authenticity is maintained through structured progression aligned with RIMYI criteria for depth, integrity and consistency.',
        'Post-certification, CIYTs sustain and evolve skill through continuous practice, study and mentoring.'
      ],
      levelsList: ['Level 1','Level 2','Level 3','Level 4'],
      levelDescriptions: [
        '≥3 years steady practice + mentoring; foundational asana & teaching + theory assessment',
        'Post L1: intermediate asana & pranayama; philosophy & teaching evaluation',
        'Post L2: advanced practice; comprehensive higher asana/pranayama & pedagogy assessment',
        'Highest integrative capacity; overseen directly with RIMYI evaluation'
      ],
      levelsNote: '※ Progression requires sufficient immersive practice time and mentor evaluation.',
      snapshotNote: '※ The “Iyengar Yoga” name & Certification Mark are reserved for certified teachers.'
    }
  }
};

const I18nContext = createContext(null);

export function I18nProvider({ children }){
  const [lang, setLang] = useState(()=> {
    try {
      const urlLang = new URL(window.location.href).searchParams.get('lang');
      return urlLang || localStorage.getItem('iyck_lang') || 'ko';
    } catch { return 'ko'; }
  });
  useEffect(()=> { localStorage.setItem('iyck_lang', lang); }, [lang]);
  // Keep URL ?lang= synchronized (replaceState to avoid history spam)
  useEffect(()=>{
    try {
      const u = new URL(window.location.href);
      if(u.searchParams.get('lang') !== lang){
        u.searchParams.set('lang', lang);
        window.history.replaceState({}, '', u.toString());
      }
    } catch {}
  }, [lang]);
  const toggleLang = ()=> setLang(l => l === 'ko' ? 'en' : 'ko');

  const t = useMemo(()=> {
    const dict = dictionaries[lang] || dictionaries.ko;
    const missingLogged = new Set();
    return function translate(path, fallback){
      if(!path) return '';
      const parts = path.split('.');
      let cur = dict;
      for(const p of parts){
        if(cur && typeof cur === 'object' && p in cur) cur = cur[p];
        else {
          if(!missingLogged.has(path)){
            // Log once per key (dev aid)
            // eslint-disable-next-line no-console
            console.warn('[i18n] Missing key:', path);
            missingLogged.add(path);
          }
          return fallback ?? path;
        }
      }
      return cur;
    };
  }, [lang]);

  const value = useMemo(()=> ({ lang, setLang, toggleLang, t, dict: dictionaries[lang] }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(){
  const ctx = useContext(I18nContext);
  if(!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
