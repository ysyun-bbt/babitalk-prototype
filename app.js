const { useState, useMemo } = React;

// ── Mock Data ────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",    label: "전체" },
  { id: "eye",    label: "눈성형" },
  { id: "nose",   label: "코성형" },
  { id: "lifting",label: "리프팅" },
  { id: "botox",  label: "보톡스/필러" },
  { id: "skin",   label: "피부관리" },
  { id: "fat",    label: "지방흡입" },
  { id: "breast", label: "가슴성형" },
  { id: "dental", label: "치아미백" },
];

const PRODUCTS = [
  // 눈성형
  {
    id: 1, category: "eye",
    clinic: "뷰티클리닉 강남점", verified: true,
    name: "매몰법 쌍꺼풀 (양안) + 눈매교정",
    tags: ["마취크림", "당일예약", "비절개"],
    attrs: [
      { label: "수술방법", value: "매몰법" },
      { label: "마취방법", value: "마취크림" },
      { label: "절개여부", value: "비절개" },
    ],
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 990000, discountRate: 35,
    rating: 4.9, reviewCount: 1284,
    emoji: "👁️", colorClass: "thumb-color-1",
    saved: false,
  },
  {
    id: 2, category: "eye",
    clinic: "라인성형외과", verified: true,
    name: "절개법 쌍꺼풀 (양안) 자연유착",
    tags: ["수면마취", "흉터최소화"],
    attrs: [
      { label: "수술방법", value: "절개법" },
      { label: "마취방법", value: "수면마취" },
      { label: "절개여부", value: "절개" },
    ],
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
    ],
    originalPrice: 1200000, discountRate: 20,
    rating: 4.8, reviewCount: 876,
    emoji: "✨", colorClass: "thumb-color-2",
    saved: true,
  },
  {
    id: 3, category: "eye",
    clinic: "아이디병원 강남", verified: false,
    name: "눈매교정 + 앞트임 (양안) 패키지",
    tags: ["당일예약", "1:1 상담"],
    attrs: [
      { label: "수술방법", value: "눈매교정+앞트임" },
      { label: "마취방법", value: "마취크림" },
    ],
    badges: [
      { label: "카톡상담", type: "outline", icon: "💬" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 800000, discountRate: 0,
    rating: 4.7, reviewCount: 532,
    emoji: "💎", colorClass: "thumb-color-5",
    saved: false,
  },
  // 코성형
  {
    id: 4, category: "nose",
    clinic: "JK성형외과", verified: true,
    name: "콧대+코끝 교정 패키지 (실리콘+귀연골)",
    tags: ["전신마취", "5년 보증"],
    attrs: [
      { label: "보형물", value: "실리콘+귀연골" },
      { label: "원산지", value: "국내" },
      { label: "마취방법", value: "전신마취" },
    ],
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 3500000, discountRate: 15,
    rating: 4.9, reviewCount: 2103,
    emoji: "👃", colorClass: "thumb-color-3",
    saved: false,
  },
  {
    id: 5, category: "nose",
    clinic: "리쥬란클리닉 압구정", verified: true,
    name: "코끝성형 (귀연골 이식) 자연스러운 라인",
    tags: ["수면마취", "당일가능"],
    attrs: [
      { label: "보형물", value: "귀연골" },
      { label: "원산지", value: "국내" },
      { label: "마취방법", value: "수면마취" },
    ],
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
    ],
    originalPrice: 1800000, discountRate: 10,
    rating: 4.8, reviewCount: 641,
    emoji: "🌟", colorClass: "thumb-color-4",
    saved: false,
  },
  // 리프팅
  {
    id: 6, category: "lifting",
    clinic: "더블유클리닉 강남", verified: true,
    name: "실리프팅 (민트실 60가닥) 콜라겐 재생",
    tags: ["무통마취", "즉각효과", "점심시술"],
    attrs: [
      { label: "실 종류", value: "민트실" },
      { label: "가닥수", value: "60가닥" },
      { label: "원산지", value: "수입" },
    ],
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 550000, discountRate: 40,
    rating: 4.7, reviewCount: 3421,
    emoji: "🔮", colorClass: "thumb-color-5",
    saved: true,
  },
  {
    id: 7, category: "lifting",
    clinic: "에스테틱 청담", verified: false,
    name: "울쎄라 600샷 얼굴 전체 리프팅",
    tags: ["즉각리프팅", "1회효과"],
    attrs: [
      { label: "시술종류", value: "울쎄라" },
      { label: "샷수", value: "600샷" },
      { label: "원산지", value: "수입" },
    ],
    unitPrice: "1샷당 2,000원",
    badges: [
      { label: "카톡상담", type: "outline", icon: "💬" },
    ],
    originalPrice: 1200000, discountRate: 25,
    rating: 4.6, reviewCount: 987,
    emoji: "💫", colorClass: "thumb-color-1",
    saved: false,
  },
  // 보톡스/필러
  {
    id: 8, category: "botox",
    clinic: "미인클리닉 강남", verified: true,
    name: "사각턱 보톡스 (100u) + 종아리 보톡스",
    tags: ["당일예약", "점심시술", "무통"],
    attrs: [
      { label: "스킨보톡스", value: "100u" },
      { label: "원산지", value: "수입" },
      { label: "브랜드", value: "보툴렉스" },
    ],
    unitPrice: "1u당 3,000원",
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 300000, discountRate: 50,
    rating: 4.8, reviewCount: 5670,
    emoji: "💉", colorClass: "thumb-color-2",
    saved: false,
  },
  {
    id: 9, category: "botox",
    clinic: "스킨클리닉 압구정", verified: true,
    name: "히알루론산 필러 1cc 코/이마/턱 선택",
    tags: ["즉시회복", "자연결과"],
    attrs: [
      { label: "시술종류", value: "히알루론산 필러" },
      { label: "용량", value: "1cc" },
      { label: "원산지", value: "수입" },
      { label: "브랜드", value: "쥬비덤" },
    ],
    unitPrice: "1cc당 350,000원",
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 450000, discountRate: 22,
    rating: 4.7, reviewCount: 2130,
    emoji: "🩸", colorClass: "thumb-color-6",
    saved: false,
  },
  // 피부관리
  {
    id: 10, category: "skin",
    clinic: "피부과학클리닉", verified: true,
    name: "피코슈어 토닝 5회 패키지 (전얼굴)",
    tags: ["색소/잡티", "당일예약", "점심가능"],
    attrs: [
      { label: "레이저종류", value: "피코슈어" },
      { label: "시술횟수", value: "5회" },
      { label: "원산지", value: "수입" },
    ],
    unitPrice: "1회당 136,000원",
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 680000, discountRate: 30,
    rating: 4.9, reviewCount: 4102,
    emoji: "🌸", colorClass: "thumb-color-3",
    saved: true,
  },
  {
    id: 11, category: "skin",
    clinic: "닥터클리닉 청담", verified: true,
    name: "아쿠아필링 + 수분공급 앰플 (1회)",
    tags: ["즉각보습", "트러블개선"],
    attrs: [
      { label: "시술종류", value: "아쿠아필링" },
      { label: "시술횟수", value: "1회" },
      { label: "원산지", value: "국내" },
    ],
    badges: [
      { label: "카톡상담", type: "outline", icon: "💬" },
    ],
    originalPrice: 180000, discountRate: 0,
    rating: 4.6, reviewCount: 892,
    emoji: "💧", colorClass: "thumb-color-4",
    saved: false,
  },
  // 지방흡입
  {
    id: 12, category: "fat",
    clinic: "365mc 강남본점", verified: true,
    name: "복부+옆구리 지방흡입 (롯소법)",
    tags: ["수면마취", "사후관리 3회"],
    attrs: [
      { label: "시술방법", value: "롯소법" },
      { label: "부위", value: "복부+옆구리" },
      { label: "마취방법", value: "수면마취" },
    ],
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 4200000, discountRate: 12,
    rating: 4.8, reviewCount: 3201,
    emoji: "✂️", colorClass: "thumb-color-1",
    saved: false,
  },
  // 가슴성형
  {
    id: 13, category: "breast",
    clinic: "바노바기성형외과", verified: true,
    name: "가슴성형 (모티바 라운드) 겨드랑이 절개",
    tags: ["전신마취", "10년보장"],
    attrs: [
      { label: "보형물", value: "모티바 라운드" },
      { label: "절개위치", value: "겨드랑이" },
      { label: "원산지", value: "수입" },
      { label: "브랜드", value: "모티바" },
    ],
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
    ],
    originalPrice: 6500000, discountRate: 8,
    rating: 4.9, reviewCount: 1543,
    emoji: "🌺", colorClass: "thumb-color-5",
    saved: false,
  },
  // 치아미백
  {
    id: 14, category: "dental",
    clinic: "미소치과 강남", verified: true,
    name: "전문가 치아미백 (줌화이트닝) 1시간",
    tags: ["즉각효과", "점심가능", "2-3톤 업"],
    attrs: [
      { label: "시술방법", value: "줌화이트닝" },
      { label: "소요시간", value: "1시간" },
      { label: "효과", value: "2-3톤 업" },
    ],
    badges: [
      { label: "미리결제", type: "fill" },
      { label: "카톡상담", type: "outline", icon: "💬" },
      { label: "기획이름들", type: "outline", icon: "🔥" },
    ],
    originalPrice: 280000, discountRate: 45,
    rating: 4.7, reviewCount: 1876,
    emoji: "😁", colorClass: "thumb-color-2",
    saved: false,
  },
];

const SORT_OPTIONS = [
  { id: "recommend", label: "추천순" },
  { id: "review",    label: "후기많은순" },
  { id: "price_asc", label: "가격낮은순" },
  { id: "discount",  label: "할인많은순" },
];

// ── Helpers ──────────────────────────────────────────────
function calcFinalPrice(original, discountRate) {
  return Math.round(original * (1 - discountRate / 100) / 1000) * 1000;
}

function formatPrice(price) {
  return price.toLocaleString("ko-KR") + "원";
}

function StarIcon({ filled }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? "#ffc107" : "#e0e0e0"}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

// 강남언니 레퍼런스: 시술 속성값 테이블 (스킨보톡스 2cc / 원산지 수입 / 브랜드 제오민)
function AttrTable({ attrs, unitPrice }) {
  if (!attrs || attrs.length === 0) return null;
  return (
    <div className="attr-table">
      {attrs.map((a, i) => (
        <div key={i} className="attr-row">
          <span className="attr-label">{a.label}</span>
          <span className="attr-value">{a.value}</span>
        </div>
      ))}
      {unitPrice && (
        <div className="attr-unit-price">{unitPrice}</div>
      )}
    </div>
  );
}

function BadgeGroup({ badges }) {
  if (!badges || badges.length === 0) return null;
  return (
    <div className="badge-group">
      {badges.map((b, i) => (
        <span key={i} className={`badge-chip badge-chip--${b.type}`}>
          {b.icon && <span className="badge-chip__icon">{b.icon}</span>}
          {b.label}
        </span>
      ))}
    </div>
  );
}

function BookmarkIcon({ saved }) {
  return saved ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff4b84">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
      <line x1="11" y1="18" x2="13" y2="18"/>
    </svg>
  );
}

// ── Components ───────────────────────────────────────────
function ProductCard({ product, onToggleSave }) {
  const finalPrice = calcFinalPrice(product.originalPrice, product.discountRate);

  return (
    <div className="product-card">
      {/* Thumbnail */}
      <div className={`product-thumb ${product.colorClass}`}>
        <div className="thumb-placeholder">{product.emoji}</div>
        {product.discountRate > 0 && (
          <div className="badge-discount">{product.discountRate}%</div>
        )}
      </div>

      {/* Info */}
      <div className="product-info">
        <div className="clinic-name">
          {product.clinic}
          {product.verified && <span className="clinic-verified">✓</span>}
        </div>
        <div className="product-name">{product.name}</div>
        <div className="tag-row">
          {product.tags.map(tag => (
            <span key={tag} className={`tag ${tag === "당일예약" || tag === "점심시술" ? "highlight" : ""}`}>
              {tag}
            </span>
          ))}
        </div>
        <AttrTable attrs={product.attrs} unitPrice={product.unitPrice} />
        <div className="price-row">
          {product.discountRate > 0 && (
            <>
              <span className="price-discount-rate">{product.discountRate}%</span>
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            </>
          )}
          <span className="price-final">{formatPrice(finalPrice)}</span>
        </div>
        <BadgeGroup badges={product.badges} />
        <div className="rating-row">
          <span className="stars">{"★".repeat(Math.round(product.rating))}</span>
          <span className="rating-score">{product.rating}</span>
          <span className="review-count">({product.reviewCount.toLocaleString()})</span>
        </div>
      </div>

      {/* Bookmark */}
      <button className={`bookmark-btn ${product.saved ? "saved" : ""}`} onClick={e => { e.stopPropagation(); onToggleSave(product.id); }}>
        <BookmarkIcon saved={product.saved} />
      </button>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────
function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("recommend");
  const [products, setProducts] = useState(PRODUCTS);

  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
    switch (activeSort) {
      case "review":    return [...list].sort((a, b) => b.reviewCount - a.reviewCount);
      case "price_asc": return [...list].sort((a, b) => calcFinalPrice(a.originalPrice, a.discountRate) - calcFinalPrice(b.originalPrice, b.discountRate));
      case "discount":  return [...list].sort((a, b) => b.discountRate - a.discountRate);
      default:          return list;
    }
  }, [activeCategory, activeSort, products]);

  const toggleSave = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="header-top">
          <div className="header-left">
            <button className="back-btn"><BackIcon /></button>
            <span className="header-title">시술/상품</span>
          </div>
          <div className="header-actions">
            <button className="icon-btn"><SearchIcon /></button>
            <button className="icon-btn"><FilterIcon /></button>
          </div>
        </div>

        {/* Category Chips */}
        <div className="category-scroll">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-chip ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort / Count Bar */}
        <div className="filter-bar">
          <div className="result-count">
            총 <strong>{filtered.length}</strong>개
          </div>
          <div className="sort-group">
            {SORT_OPTIONS.map((opt, i) => (
              <React.Fragment key={opt.id}>
                {i > 0 && <div className="sort-divider" />}
                <button
                  className={`sort-btn ${activeSort === opt.id ? "active" : ""}`}
                  onClick={() => setActiveSort(opt.id)}
                >
                  {opt.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filtered.length === 0 ? (
          <div className="empty-state">해당 카테고리의 시술이 없습니다.</div>
        ) : (
          filtered.map(product => (
            <ProductCard key={product.id} product={product} onToggleSave={toggleSave} />
          ))
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        {[
          { label: "홈",    icon: "🏠" },
          { label: "시술",   icon: "💉", active: true },
          { label: "이벤트", icon: "🎁" },
          { label: "후기",   icon: "⭐" },
          { label: "MY",    icon: "👤" },
        ].map(item => (
          <button key={item.label} className={`nav-item ${item.active ? "active" : ""}`}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
