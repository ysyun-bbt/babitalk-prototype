const { useState } = React;

// ── Constants ──────────────────────────────────────────────
const TABS = [
  "추천", "미리결제", "레이저/고주파", "레이저리프팅",
  "반영구/문신제거", "가슴", "거상", "남자성형", "모발이식", "기타"
];

const SUB_ITEMS = ["전체", "고주파", "레이저"];

const FILTER_CHIPS = [
  { id: "sort",    label: "인기순" },
  { id: "price",   label: "가격" },
  { id: "beauty",  label: "뷰티고민" },
  { id: "area",    label: "지역" },
  { id: "kakao",   label: "카톡" },
  { id: "special", label: "✨기획전" },
];

// ── Mock Data ──────────────────────────────────────────────
// picsum.photos/seed/{n}/90/90 으로 카드별 다른 이미지 사용
function img(n) { return `https://picsum.photos/seed/${n}/90/90`; }

const CARDS_BY_TAB = [
  // 0. 추천
  [
    { name: "울쎄라 600샷 + 써마지 FLX 얼굴 전체", desc: "탄력 + 리프팅 동시 케어 패키지", location: "서울 강남구", clinic: "JK성형외과", price: 890000, discountRate: 42, img: img(10), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "2,341" },
    { name: "인모드 FX 얼굴 전체 콜라겐 재생", desc: "1회로 즉각 리프팅 효과 체험", location: "서울 압구정역", clinic: "청담 뷰티클리닉", price: 450000, discountRate: 38, img: img(11), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "1,872" },
    { name: "리쥬란 힐러 5.0 전얼굴 피부재생", desc: "연어DNA 성분으로 탄력 회복", location: "서울 신논현역", clinic: "라인성형외과", price: 320000, discountRate: 30, img: img(12), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "988" },
    { name: "피코슈어 토닝 + 색소 제거 5회 패키지", desc: "색소·잡티·모공 집중 케어", location: "서울 역삼역", clinic: "피부과학의원", price: 680000, discountRate: 33, img: img(13), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "3,102" },
    { name: "보툴리눔 톡신 사각턱 + 종아리 세트", desc: "당일 시술 가능, 무통 마취 크림 제공", location: "서울 강남구", clinic: "미인클리닉", price: 199000, discountRate: 50, img: img(14), badges: [{ label: "미리결제", type: "fill" }], rating: 4.9, reviewCount: "5,440" },
    { name: "히알루론산 필러 코+이마 2부위 패키지", desc: "자연스러운 입체감 연출", location: "서울 압구정로데오", clinic: "아름다운나라피부과", price: 590000, discountRate: 25, img: img(15), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.7, reviewCount: "1,234" },
    { name: "쥬비덤 볼루마 광대·볼 볼륨 필러", desc: "FDA 승인 제품 사용, 즉시 확인 가능", location: "서울 청담동", clinic: "스킨클리닉 청담", price: 750000, discountRate: 20, img: img(16), badges: [{ label: "미리결제", type: "fill" }], rating: 4.8, reviewCount: "876" },
    { name: "레이저 제모 겨드랑이 + 비키니 패키지", desc: "통증 최소화 알렉산드라이트 레이저", location: "서울 서초구", clinic: "365mc피부과", price: 280000, discountRate: 45, img: img(17), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "2,891" },
    { name: "아쿠아필링 + 피부장벽 앰플 케어 1회", desc: "즉각적인 수분 광채 피부 연출", location: "서울 마포구", clinic: "닥터클리닉 홍대점", price: 129000, discountRate: 28, img: img(18), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "654" },
    { name: "써마지 FLX 눈가+이마 탄력 케어", desc: "고주파로 즉각 팽팽한 피부", location: "서울 강남구", clinic: "뷰클리닉", price: 550000, discountRate: 35, img: img(19), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "1,432" },
  ],

  // 1. 미리결제
  [
    { name: "[미리결제 단독] 인모드 FX 얼굴+목 세트", desc: "미리결제 시 15% 추가 할인", location: "서울 강남구", clinic: "JK성형외과", price: 620000, discountRate: 48, img: img(20), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "1,987" },
    { name: "[미리결제] 피코 레이저 토닝 10회", desc: "선결제 특가, 기간내 자유 예약", location: "서울 압구정역", clinic: "아름다운나라피부과", price: 990000, discountRate: 44, img: img(21), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.7, reviewCount: "3,241" },
    { name: "[선결제 특가] 울쎄라 300샷 이마·눈가", desc: "1년 유효 기간, 분할 사용 가능", location: "서울 청담동", clinic: "청담뷰티의원", price: 480000, discountRate: 52, img: img(22), badges: [{ label: "미리결제", type: "fill" }], rating: 4.8, reviewCount: "2,108" },
    { name: "[미리결제 전용] 리쥬란 3cc 전얼굴", desc: "선결제 고객 무료 콜라겐 앰플 증정", location: "서울 신사동", clinic: "스킨앤뷰티클리닉", price: 310000, discountRate: 38, img: img(23), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "782" },
    { name: "[선불 특가] 보톡스 이마+눈가+미간 전부위", desc: "3부위 동시 시술 특가", location: "서울 역삼역", clinic: "강남미인클리닉", price: 149000, discountRate: 55, img: img(24), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.9, reviewCount: "6,321" },
    { name: "[미리결제 단독] 써마지 전얼굴 400샷", desc: "당일 취소 불가, 일정 변경 1회 가능", location: "서울 강남구", clinic: "바비톡성형외과", price: 880000, discountRate: 40, img: img(25), badges: [{ label: "미리결제", type: "fill" }], rating: 4.7, reviewCount: "1,543" },
    { name: "[선결제 한정] 엑셀V 레이저 5회", desc: "혈관·홍조·색소 동시 개선", location: "서울 반포동", clinic: "서울피부과의원", price: 750000, discountRate: 33, img: img(26), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "987" },
    { name: "[미리결제] 히알루론산 필러 전부위 선택", desc: "1cc부터 원하는 부위 선택 가능", location: "서울 압구정로데오", clinic: "닥터뷰티의원", price: 420000, discountRate: 30, img: img(27), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.6, reviewCount: "1,102" },
    { name: "[선불특가] 레이저 제모 전신 10회", desc: "3년 무제한 추가 시술 보장", location: "서울 강남구", clinic: "레이저피부과", price: 1490000, discountRate: 60, img: img(28), badges: [{ label: "미리결제", type: "fill" }], rating: 4.8, reviewCount: "4,521" },
    { name: "[미리결제 단독] 아쿠아필링 8회 패키지", desc: "피부 타입별 맞춤 앰플 선택 가능", location: "서울 마포구", clinic: "홍대피부관리의원", price: 680000, discountRate: 43, img: img(29), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "763" },
  ],

  // 2. 레이저/고주파
  [
    { name: "울쎄라 600샷 얼굴 전체 1회 체험가", desc: "집속형 초음파 리프팅, 즉각 탄력", location: "서울 강남구", clinic: "JK성형외과", price: 590000, discountRate: 45, img: img(30), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "3,241" },
    { name: "써마지 FLX 전얼굴 400샷 콜라겐 재생", desc: "고주파 열에너지로 즉각 탄력 개선", location: "서울 압구정역", clinic: "청담뷰티클리닉", price: 880000, discountRate: 38, img: img(31), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "1,876" },
    { name: "인모드 FX 얼굴 전체 지방 용해+탄력", desc: "고주파 바늘로 피부 속 직접 자극", location: "서울 역삼역", clinic: "라인의원", price: 480000, discountRate: 42, img: img(32), badges: [{ label: "미리결제", type: "fill" }], rating: 4.7, reviewCount: "2,109" },
    { name: "포텐자 RF 마이크로니들링 전얼굴", desc: "탄력·모공·여드름 흉터 동시 개선", location: "서울 서초구", clinic: "강남서울피부과", price: 420000, discountRate: 35, img: img(33), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "1,432" },
    { name: "엑셀V 플러스 혈관·홍조 레이저 3회", desc: "혈관·홍조·색소 동시 개선", location: "서울 청담동", clinic: "피부과전문의원", price: 380000, discountRate: 28, img: img(34), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "876" },
    { name: "프락셀 리페어 레이저 피부재생 1회", desc: "넓은모공·잔주름·흉터 개선", location: "서울 강남구", clinic: "뷰클리닉 강남점", price: 550000, discountRate: 30, img: img(35), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.7, reviewCount: "1,021" },
    { name: "CO2 레이저 점·사마귀 제거 10개", desc: "당일 시술 가능, 흉터 최소화", location: "서울 신논현역", clinic: "서울스킨클리닉", price: 99000, discountRate: 50, img: img(36), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.5, reviewCount: "3,654" },
    { name: "브이빔 퍼펙타 혈관레이저 얼굴 전체", desc: "붉은 피부·혈관·딸기코 개선", location: "서울 강남구", clinic: "닥터피부과의원", price: 290000, discountRate: 32, img: img(37), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "1,287" },
    { name: "레이저 토닝 + IPL 광자 치료 5회 세트", desc: "색소·홍조·모공 3가지 동시 케어", location: "서울 마포구", clinic: "홍대피부관리원", price: 430000, discountRate: 40, img: img(38), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.6, reviewCount: "987" },
    { name: "아이리프트 눈가 특화 고주파 리프팅", desc: "눈가 처짐·잔주름 집중 케어", location: "서울 압구정역", clinic: "아름다운나라피부과", price: 320000, discountRate: 25, img: img(39), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "765" },
  ],

  // 3. 레이저리프팅
  [
    { name: "울쎄라 눈가+이마 200샷 특화 리프팅", desc: "이마·눈가 처짐 집중 개선", location: "서울 강남구", clinic: "JK성형외과", price: 380000, discountRate: 40, img: img(40), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "2,109" },
    { name: "슈링크 유니버스 얼굴 전체 200샷", desc: "집속 초음파로 탄력 UP, 윤곽 개선", location: "서울 압구정역", clinic: "청담슈링크클리닉", price: 290000, discountRate: 48, img: img(41), badges: [{ label: "미리결제", type: "fill" }], rating: 4.8, reviewCount: "4,321" },
    { name: "인모드 바디 FX 복부 리프팅+체형", desc: "복부 지방·탄력 동시 케어", location: "서울 청담동", clinic: "스타피부과", price: 560000, discountRate: 35, img: img(42), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.7, reviewCount: "876" },
    { name: "써마지 아이 눈가 전용 리프팅", desc: "눈꺼풀 처짐·다크서클 완화", location: "서울 강남구", clinic: "뷰클리닉", price: 420000, discountRate: 30, img: img(43), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "1,432" },
    { name: "리니어지 리프팅 전얼굴 1회 체험", desc: "선형 고주파로 즉각 V라인 연출", location: "서울 역삼역", clinic: "강남미인의원", price: 250000, discountRate: 42, img: img(44), badges: [{ label: "미리결제", type: "fill" }], rating: 4.6, reviewCount: "987" },
    { name: "올리지오 물방울 리프팅 얼굴 전체", desc: "고주파 방울로 콜라겐 생성 자극", location: "서울 서초구", clinic: "서울성형외과", price: 380000, discountRate: 33, img: img(45), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "654" },
    { name: "실리프팅 민트실 60가닥 얼굴 전체", desc: "실로 당겨주는 리프팅 시술", location: "서울 강남구", clinic: "더블유클리닉", price: 450000, discountRate: 38, img: img(46), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "1,765" },
    { name: "슈링크 유니버스 600샷 전얼굴+목", desc: "얼굴+목 동시 리프팅 프리미엄 패키지", location: "서울 청담동", clinic: "청담뷰티의원", price: 580000, discountRate: 45, img: img(47), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "2,341" },
    { name: "이지리프트 턱선+하관 탄력 특화", desc: "턱선 라인 개선, 중안부 탄력 복원", location: "서울 신사동", clinic: "신사스킨클리닉", price: 300000, discountRate: 28, img: img(48), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "543" },
    { name: "고주파 써마쿨 눈가+이마+볼 리프팅", desc: "모든 부위 한 번에 균일한 탄력", location: "서울 강남구", clinic: "강남서울피부과", price: 490000, discountRate: 36, img: img(49), badges: [{ label: "미리결제", type: "fill" }], rating: 4.7, reviewCount: "1,098" },
  ],

  // 4. 반영구/문신제거
  [
    { name: "엠보 눈썹 반영구 자연 결 표현", desc: "담당 아티스트 1:1 디자인 상담 포함", location: "서울 강남구", clinic: "강남반영구아트", price: 220000, discountRate: 30, img: img(50), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "1,876" },
    { name: "아이라인 반영구 속눈썹 라인 강조", desc: "번짐 없는 선명한 눈매 완성", location: "서울 압구정역", clinic: "뷰티스튜디오 압구정", price: 180000, discountRate: 28, img: img(51), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "2,103" },
    { name: "입술 반영구 컬러 + 윤곽 교정", desc: "혈색 있는 자연스러운 입술색 표현", location: "서울 청담동", clinic: "청담반영구샵", price: 250000, discountRate: 35, img: img(52), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.7, reviewCount: "987" },
    { name: "피코 레이저 문신제거 5cm×5cm", desc: "피코초 레이저로 흉터 최소화", location: "서울 강남구", clinic: "더피코클리닉", price: 120000, discountRate: 40, img: img(53), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "3,421" },
    { name: "Q스위치 반영구 제거 (눈썹·아이라인)", desc: "기존 반영구 제거 후 새로 시술 가능", location: "서울 역삼역", clinic: "강남레이저의원", price: 150000, discountRate: 33, img: img(54), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "1,234" },
    { name: "헤어라인 반영구 M자·이마 교정", desc: "자연스러운 헤어라인 완성", location: "서울 신사동", clinic: "헤어아트클리닉", price: 350000, discountRate: 25, img: img(55), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "654" },
    { name: "타투 컬러 전사 제거 10cm 이하", desc: "컬러 타투도 효과적으로 제거", location: "서울 강남구", clinic: "레이저피부과 강남점", price: 200000, discountRate: 45, img: img(56), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.5, reviewCount: "2,109" },
    { name: "수지침 엠보 눈썹 + 아이라인 패키지", desc: "두 부위 동시 할인 패키지", location: "서울 마포구", clinic: "홍대뷰티아트", price: 380000, discountRate: 38, img: img(57), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "876" },
    { name: "입술 + 눈썹 반영구 풀패키지", desc: "얼굴 전체 반영구 한 번에 완성", location: "서울 압구정역", clinic: "압구정뷰티스튜디오", price: 420000, discountRate: 40, img: img(58), badges: [{ label: "미리결제", type: "fill" }], rating: 4.9, reviewCount: "1,543" },
    { name: "피코 문신제거 팔·다리 (손바닥 이하)", desc: "통증 최소화, 3회 패키지 추가 할인", location: "서울 서초구", clinic: "서초스킨클리닉", price: 480000, discountRate: 35, img: img(59), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.6, reviewCount: "765" },
  ],

  // 5. 가슴
  [
    { name: "모티바 라운드 가슴성형 겨드랑이 절개", desc: "10년 무상 교체 보장, 자연스러운 모양", location: "서울 강남구", clinic: "바노바기성형외과", price: 4500000, discountRate: 18, img: img(60), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "1,432" },
    { name: "벨라겔 아나토미컬 가슴성형 유륜 절개", desc: "눈물방울 자연스러운 형태, 흉터 최소화", location: "서울 압구정역", clinic: "JK성형외과", price: 5200000, discountRate: 12, img: img(61), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "876" },
    { name: "가슴 지방이식 자가 지방 100cc 이상", desc: "인공 보형물 없이 자연스러운 볼륨", location: "서울 청담동", clinic: "청담성형외과", price: 3800000, discountRate: 15, img: img(62), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "654" },
    { name: "가슴 재수술 보형물 교체 프리미엄", desc: "타 병원 수술 후 재교정 가능, 1:1 상담", location: "서울 강남구", clinic: "원더풀성형외과", price: 5800000, discountRate: 10, img: img(63), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "987" },
    { name: "하이멘토 가슴 기저부 교정 수술", desc: "가슴 모양 교정 + 볼륨 개선 동시", location: "서울 서초구", clinic: "서울성형외과 서초점", price: 4200000, discountRate: 20, img: img(64), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "543" },
    { name: "모티바 에르고노믹스 스무스 타입", desc: "파열 위험 최소화, 자연스러운 촉감", location: "서울 강남구", clinic: "강남TOP성형외과", price: 5500000, discountRate: 8, img: img(65), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.9, reviewCount: "765" },
    { name: "가슴 축소술 유방 비대증 교정", desc: "어깨 통증·자세 교정 효과", location: "서울 압구정역", clinic: "압구정성형외과", price: 5000000, discountRate: 15, img: img(66), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "432" },
    { name: "가슴 하수 교정 + 리프팅 수술", desc: "처진 가슴 모양 개선, 자연스러운 위치로", location: "서울 청담동", clinic: "뷰성형외과", price: 4800000, discountRate: 12, img: img(67), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "321" },
    { name: "벨라겔 330cc 라운드 겨드랑이 절개", desc: "당일 입원·퇴원, 빠른 회복 가능", location: "서울 강남구", clinic: "루이성형외과", price: 4100000, discountRate: 22, img: img(68), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.7, reviewCount: "876" },
    { name: "가슴성형 패키지 (보형물+스킨케어 포함)", desc: "수술 후 회복 관리까지 원스톱", location: "서울 서초구", clinic: "서울대학로성형외과", price: 6200000, discountRate: 9, img: img(69), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "1,109" },
  ],

  // 6. 거상
  [
    { name: "안면거상 미니리프트 절개 리프팅", desc: "중안부·하관 처짐 10년 젊게", location: "서울 강남구", clinic: "JK성형외과", price: 8500000, discountRate: 10, img: img(70), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "876" },
    { name: "내시경 이마거상 이마 주름 개선", desc: "절개 최소화, 자연스러운 이마 리프팅", location: "서울 압구정역", clinic: "바노바기성형외과", price: 6800000, discountRate: 12, img: img(71), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "654" },
    { name: "목 거상 경부성형 날렵한 목선 완성", desc: "처진 목선·이중턱 동시 개선", location: "서울 청담동", clinic: "청담성형외과", price: 5200000, discountRate: 15, img: img(72), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "432" },
    { name: "실 거상 PDO 얼굴 전체 200가닥", desc: "수술 없이 리프팅, 콜라겐 재생 촉진", location: "서울 강남구", clinic: "미인클리닉 강남점", price: 980000, discountRate: 35, img: img(73), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "1,543" },
    { name: "복부 피부 절제 복부 성형 리프팅", desc: "복부 처짐 교정, 탄탄한 라인 완성", location: "서울 서초구", clinic: "365mc서초", price: 4500000, discountRate: 18, img: img(74), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "321" },
    { name: "눈 거상 상안검 절개 눈꺼풀 리프팅", desc: "처진 눈꺼풀 교정, 시원한 눈매", location: "서울 강남구", clinic: "아이성형외과", price: 1200000, discountRate: 25, img: img(75), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.9, reviewCount: "2,109" },
    { name: "이중턱 지방 절제 거상 수술", desc: "이중턱 지방+피부 동시 제거", location: "서울 신사동", clinic: "신사성형외과", price: 3200000, discountRate: 20, img: img(76), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "765" },
    { name: "하안검 눈 밑 지방 재배치 수술", desc: "애교살 보존, 다크서클 개선", location: "서울 압구정역", clinic: "압구정성형외과", price: 1800000, discountRate: 22, img: img(77), badges: [{ label: "미리결제", type: "fill" }], rating: 4.8, reviewCount: "987" },
    { name: "중안면 리프팅 볼 처짐 교정 수술", desc: "중안부 볼 처짐 즉각 교정", location: "서울 강남구", clinic: "강남성형외과의원", price: 5600000, discountRate: 13, img: img(78), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "543" },
    { name: "실 리프팅 + 울쎄라 병합 패키지", desc: "시술+수술 병합으로 시너지 효과", location: "서울 청담동", clinic: "뷰성형외과", price: 1500000, discountRate: 30, img: img(79), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "1,234" },
  ],

  // 7. 남자성형
  [
    { name: "남자 눈성형 매몰법 쌍꺼풀 자연유착", desc: "자연스러운 남성 눈매 라인 완성", location: "서울 강남구", clinic: "바비톡성형외과", price: 890000, discountRate: 28, img: img(80), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "1,234" },
    { name: "남자 코성형 매부리코+콧볼 축소", desc: "남성적인 콧대 라인 완성", location: "서울 압구정역", clinic: "JK성형외과", price: 3200000, discountRate: 15, img: img(81), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.9, reviewCount: "987" },
    { name: "남자 윤곽 수술 사각턱+광대 교정", desc: "강한 이미지 개선, 슬림한 얼굴형", location: "서울 청담동", clinic: "청담성형외과", price: 6500000, discountRate: 10, img: img(82), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "765" },
    { name: "남자 지방흡입 복부+옆구리 로초 방식", desc: "S라인 복근 라인 완성", location: "서울 강남구", clinic: "365mc강남", price: 3800000, discountRate: 20, img: img(83), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "2,341" },
    { name: "남자 여유증 수술 샘조직+지방 제거", desc: "남성 가슴 여유증 완전 교정", location: "서울 서초구", clinic: "서울성형외과", price: 2800000, discountRate: 18, img: img(84), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "876" },
    { name: "남자 쌍꺼풀+앞트임 동시 수술", desc: "또렷하고 시원한 남성 눈매", location: "서울 강남구", clinic: "아이성형외과", price: 1200000, discountRate: 22, img: img(85), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "1,543" },
    { name: "남자 이마 지방이식 패인 이마 교정", desc: "자가지방으로 자연스러운 볼륨", location: "서울 신사동", clinic: "신사성형외과", price: 2200000, discountRate: 15, img: img(86), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "432" },
    { name: "남자 귀 수술 박쥐귀·돌출귀 교정", desc: "귀 모양 교정, 자연스러운 형태", location: "서울 강남구", clinic: "강남성형외과", price: 1500000, discountRate: 25, img: img(87), badges: [{ label: "미리결제", type: "fill" }], rating: 4.7, reviewCount: "321" },
    { name: "남자 피부 레이저 여드름·흉터 개선", desc: "남성 피부 특화 케어 프로그램", location: "서울 역삼역", clinic: "강남피부과의원", price: 320000, discountRate: 35, img: img(88), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "1,876" },
    { name: "남자 보톡스 사각턱+이마 스타터 패키지", desc: "처음 성형 고민하는 남성 추천", location: "서울 강남구", clinic: "뷰클리닉 강남점", price: 250000, discountRate: 40, img: img(89), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.9, reviewCount: "2,109" },
  ],

  // 8. 모발이식
  [
    { name: "비절개 FUE 모발이식 1,500모 전면부", desc: "두발 선공여, 자연스러운 헤어라인", location: "서울 강남구", clinic: "모젬클리닉", price: 2800000, discountRate: 20, img: img(90), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "1,876" },
    { name: "절개 FUT 고밀도 이식 2,000모", desc: "모량 많은 분께 추천, 고밀도 이식", location: "서울 압구정역", clinic: "헤어라인클리닉", price: 3200000, discountRate: 15, img: img(91), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "1,234" },
    { name: "여성 헤어라인 교정 M자 탈모 이식", desc: "여성 헤어라인 자연스럽게 디자인", location: "서울 강남구", clinic: "강남모발이식센터", price: 3500000, discountRate: 18, img: img(92), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "876" },
    { name: "수염이식 구렛나루+콧수염 자연 표현", desc: "얼굴 밀도 조절, 자연스러운 수염", location: "서울 청담동", clinic: "청담헤어클리닉", price: 2200000, discountRate: 25, img: img(93), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "654" },
    { name: "눈썹이식 자연 결 반영구 대안 이식", desc: "영구적인 눈썹 완성, 자연스러운 밀도", location: "서울 강남구", clinic: "아트헤어의원", price: 1800000, discountRate: 22, img: img(94), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "987" },
    { name: "비절개 FUE 3,000모 정수리 탈모", desc: "정수리 탈모 집중 개선", location: "서울 서초구", clinic: "모젬클리닉 서초점", price: 5200000, discountRate: 12, img: img(95), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "765" },
    { name: "DHI 전진 이식 헤어라인 세밀 디자인", desc: "펜슬형 식모기로 밀도·방향 세밀 조절", location: "서울 강남구", clinic: "DHI코리아모발클리닉", price: 4200000, discountRate: 16, img: img(96), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "543" },
    { name: "탈모 예방 PRP 자가혈 두피 치료 4회", desc: "성장인자로 모낭 활성화", location: "서울 강남구", clinic: "강남탈모피부과", price: 680000, discountRate: 35, img: img(97), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "1,321" },
    { name: "모발이식 1,000모 보조부위 채움", desc: "기존 이식 후 빈 부위 채움 보완", location: "서울 신사동", clinic: "신사헤어라인클리닉", price: 1500000, discountRate: 28, img: img(98), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "432" },
    { name: "메조테라피 두피 영양 공급 6회", desc: "모발 성장 촉진 영양 주사", location: "서울 강남구", clinic: "강남피부과의원", price: 420000, discountRate: 40, img: img(99), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.8, reviewCount: "876" },
  ],

  // 9. 기타
  [
    { name: "쌍꺼풀 + 코 + 지방이식 얼굴 풀패키지", desc: "다부위 동시 수술 특가 패키지", location: "서울 강남구", clinic: "JK성형외과", price: 8900000, discountRate: 22, img: img(100), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "1,234" },
    { name: "이마 지방이식 꺼진 이마 볼륨 교정", desc: "자가지방 풍부한 이마 완성", location: "서울 압구정역", clinic: "청담성형외과", price: 2200000, discountRate: 18, img: img(101), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.7, reviewCount: "876" },
    { name: "귀 성형 귀 모양 교정 돌출귀 수술", desc: "자연스러운 귀 모양으로 교정", location: "서울 청담동", clinic: "청담뷰티의원", price: 1500000, discountRate: 25, img: img(102), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.6, reviewCount: "543" },
    { name: "입꼬리 올리기 구각 거상 수술", desc: "처진 입꼬리 개선, 밝은 인상으로", location: "서울 강남구", clinic: "강남성형의원", price: 1800000, discountRate: 20, img: img(103), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "987" },
    { name: "보조개 성형 귀여운 보조개 만들기", desc: "자연스러운 보조개 위치 디자인", location: "서울 서초구", clinic: "서울성형외과", price: 1200000, discountRate: 30, img: img(104), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "432" },
    { name: "무쌍 꺼풀 눈 비절개 라인 교정", desc: "기존 라인을 살린 자연스러운 변화", location: "서울 강남구", clinic: "아이성형외과", price: 950000, discountRate: 35, img: img(105), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.8, reviewCount: "1,543" },
    { name: "팔자주름 필러 + 마리오네트라인 개선", desc: "얼굴 중하부 깊은 주름 완화", location: "서울 압구정역", clinic: "아름다운나라피부과", price: 580000, discountRate: 28, img: img(106), badges: [{ label: "미리결제", type: "fill" }, { label: "🔥기획이름들", type: "outline" }], rating: 4.6, reviewCount: "1,876" },
    { name: "동안 지방이식 눈 밑+볼 패인 부위", desc: "꺼진 얼굴 동안 효과 극대화", location: "서울 청담동", clinic: "더클리닉 청담", price: 3200000, discountRate: 15, img: img(107), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "765" },
    { name: "피부 스킨부스터 엑소좀 전얼굴 3회", desc: "줄기세포 유래 성장인자로 피부 재생", location: "서울 강남구", clinic: "강남뷰티의원", price: 780000, discountRate: 38, img: img(108), badges: [{ label: "미리결제", type: "fill" }, { label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.7, reviewCount: "1,109" },
    { name: "성형외과 1:1 무료 상담 + 시뮬레이션", desc: "전문의와 꼼꼼한 수술 계획 수립", location: "서울 강남구", clinic: "바비톡성형외과", price: 0, discountRate: 0, img: img(109), badges: [{ label: "카톡상담", type: "outline", icon: "💬" }], rating: 4.9, reviewCount: "3,421" },
  ],
];

// ── Icons ──────────────────────────────────────────────────
function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="#313142" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SortIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3h10M3 6h6M5 9h2" stroke="#484760" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}
function PriceIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#484760" strokeWidth="1.2"/><path d="M6 3.5v5M4.5 5h2.2c.7 0 1.3.6 1.3 1.3s-.6 1.2-1.3 1.2H4.5" stroke="#484760" strokeWidth="1.1" strokeLinecap="round"/></svg>;
}
function BeautyIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5C4 1.5 2.5 3 2.5 5c0 3 3.5 5.5 3.5 5.5S9.5 8 9.5 5c0-2-1.5-3.5-3.5-3.5z" stroke="#484760" strokeWidth="1.2"/></svg>;
}
function AreaIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.3 1 3 2.3 3 4c0 2.5 3 7 3 7s3-4.5 3-7c0-1.7-1.3-3-3-3z" stroke="#484760" strokeWidth="1.2"/><circle cx="6" cy="4" r="1.2" stroke="#484760" strokeWidth="1.1"/></svg>;
}
function CheckIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#484760" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function ArrowDownIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#313142" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function BookmarkIcon({ saved }) {
  return saved ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#604aff"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" stroke="#dadadf" strokeWidth="1.5"/></svg>
  );
}

const CHIP_ICONS = { sort: SortIcon, price: PriceIcon, beauty: BeautyIcon, area: AreaIcon, kakao: CheckIcon };

// ── App ────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [savedIds, setSavedIds] = useState(new Set());

  const toggleSave = (key, e) => {
    e.stopPropagation();
    setSavedIds(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const cards = CARDS_BY_TAB[activeTab] || [];

  return (
    <div>
      {/* ── Sticky Header ── */}
      <div className="sticky-header">
        {/* Status Bar */}
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <svg width="19" height="13" viewBox="0 0 19 13"><rect x="1" y="5" width="3" height="8" rx="0.5" fill="#313142"/><rect x="6" y="3" width="3" height="10" rx="0.5" fill="#313142"/><rect x="11" y="1" width="3" height="12" rx="0.5" fill="#313142"/><rect x="16" y="0" width="3" height="13" rx="0.5" fill="#313142" opacity="0.3"/></svg>
            <svg width="17" height="13" viewBox="0 0 17 13"><path d="M8.5 2.5C5.5 2.5 2.8 3.8 1 6l1.5 1.5C4 5.8 6.1 4.8 8.5 4.8s4.5 1 6 2.7L16 6c-1.8-2.2-4.5-3.5-7.5-3.5z" fill="#313142"/><path d="M8.5 6C6.5 6 4.8 6.9 3.6 8.3L5 9.8c.9-1 2.2-1.7 3.5-1.7s2.6.7 3.5 1.7l1.4-1.5C12.2 6.9 10.5 6 8.5 6z" fill="#313142"/><circle cx="8.5" cy="12" r="1.3" fill="#313142"/></svg>
            <svg width="27" height="13" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#313142" strokeOpacity="0.35"/><rect x="2" y="2" width="18" height="9" rx="2" fill="#313142"/><path d="M25 4.5V8.5a2 2 0 000-4z" fill="#313142" fillOpacity="0.4"/></svg>
          </div>
        </div>

        {/* Nav Bar */}
        <div className="nav-bar">
          <button className="nav-back"><BackIcon /></button>
          <div className="nav-title">이벤트</div>
          <div className="toggle-wrap">
            <button className="toggle-item">성형</button>
            <button className="toggle-item active">시술</button>
          </div>
        </div>

        {/* Underline Tabs */}
        <div className="underline-tabs">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`tab-item ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              <span>{tab}</span>
              <div className="tab-bar" />
            </button>
          ))}
        </div>

        {/* Sub Filter */}
        <div className="sub-filter">
          <div className="sub-filter-label">종류</div>
          <div className="sub-filter-divider" />
          <div className="sub-filter-items">
            {SUB_ITEMS.map((item, i) => (
              <button
                key={item}
                className={`sub-filter-item ${activeSub === i ? "" : "inactive"}`}
                onClick={() => setActiveSub(i)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="sub-filter-more"><ArrowDownIcon /></div>
          <div className="sub-filter-divider-bottom" />
        </div>

        {/* Thick Divider */}
        <div className="thick-divider" />

        {/* Filter Chips */}
        <div className="filter-bar">
          {FILTER_CHIPS.map(chip => {
            const Icon = CHIP_ICONS[chip.id];
            return (
              <button key={chip.id} className="filter-chip">
                {Icon && <Icon />}
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Event List ── */}
      <div className="event-list">
        {cards.map((card, i) => {
          const key = `${activeTab}-${i}`;
          const saved = savedIds.has(key);
          return (
            <div key={key} className="event-cell">
              <div className="event-contents">
                {/* Thumbnail */}
                <div className="thumb-block">
                  <div className="thumb-img-wrap">
                    <img src={card.img} alt="" />
                    <div className="thumb-gradient" />
                    <div className="thumb-promo"><span>⚡️1회체험가</span></div>
                  </div>
                  <div className="hot-badge">
                    <div className="hot-badge-body"><span>HOT</span></div>
                    <div className="hot-badge-tail" />
                  </div>
                </div>

                {/* Text Group */}
                <div className="event-text-group">
                  <div className="event-name">{card.name}</div>
                  <div className="event-desc">{card.desc}</div>
                  <div className="hospital-row">
                    <span className="hospital-text">{card.location}</span>
                    <div className="hospital-divider" />
                    <span className="hospital-text">{card.clinic}</span>
                  </div>
                  <div className="price-row">
                    {card.price > 0 ? (
                      <>
                        <span className="price-main">{card.price.toLocaleString("ko-KR")}원</span>
                        {card.discountRate > 0 && <span className="price-pct">{card.discountRate}%</span>}
                        <span className="price-vat">VAT 포함</span>
                      </>
                    ) : (
                      <span className="price-main" style={{ color: "#604aff" }}>무료 상담</span>
                    )}
                  </div>
                  <div className="badge-group">
                    {card.badges.map((b, bi) => (
                      <span key={bi} className={`badge-chip badge-chip--${b.type}`}>
                        {b.icon && b.icon}{b.label}
                      </span>
                    ))}
                  </div>
                  <div className="rating-row">
                    <span className="rating-stars">★</span>
                    <span className="rating-score">{card.rating}</span>
                    <span className="rating-count">({card.reviewCount})</span>
                    <button className="bookmark-btn" onClick={e => toggleSave(key, e)}>
                      <BookmarkIcon saved={saved} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FAB ── */}
      <div className="fab">
        <div className="fab-item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="white" strokeWidth="1.3"/><path d="M8 5v3l2 2" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span>최근 조회</span>
        </div>
        <div className="fab-divider" />
        <div className="fab-item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" stroke="white" strokeWidth="1.3"/><circle cx="8" cy="6" r="1.5" stroke="white" strokeWidth="1.2"/></svg>
          <span>지도 탐색</span>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
