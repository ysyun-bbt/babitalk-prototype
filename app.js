const { useState } = React;

// ── Constants ──────────────────────────────────────────────
const TABS = [
  "추천", "미리결제", "레이저/고주파", "레이저리프팅",
  "반영구/문신제거", "가슴", "거상", "남자성형", "모발이식", "기타"
];

const SUB_ITEMS = ["전체", "고주파", "레이저"];

const FILTER_CHIPS = [
  { id: "sort",    label: "인기순",  hasIcon: true },
  { id: "price",   label: "가격",    hasIcon: true },
  { id: "beauty",  label: "뷰티고민", hasIcon: true },
  { id: "area",    label: "지역",    hasIcon: true },
  { id: "kakao",   label: "카톡",    hasIcon: true },
  { id: "special", label: "✨기획전", hasIcon: false },
];

const THUMB = "https://img.sportsworldi.com/content/image/2025/11/19/20251119503395.jpg";

const CARDS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: "이벤트명이 들어갑니다",
  desc: "디스크립션이 들어갑니다",
  location: "서울 강남역",
  clinic: "바비톡 성형외과",
  price: 123456,
  discountRate: 49,
  badges: [
    { label: "미리결제", type: "fill" },
    { label: "카톡상담", type: "outline", icon: "💬" },
    { label: "🔥기획이름들", type: "outline" },
  ],
  rating: 4.9,
  reviewCount: "N,NNN",
  isAd: true,
  saved: false,
}));

// ── Icons ──────────────────────────────────────────────────
function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="#313142" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SortIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 3h10M3 6h6M5 9h2" stroke="#484760" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function PriceIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="#484760" strokeWidth="1.2"/>
      <path d="M6 3.5v5M4.5 5h2.2c.7 0 1.3.6 1.3 1.3s-.6 1.2-1.3 1.2H4.5" stroke="#484760" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}
function BeautyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1.5C4 1.5 2.5 3 2.5 5c0 3 3.5 5.5 3.5 5.5S9.5 8 9.5 5c0-2-1.5-3.5-3.5-3.5z" stroke="#484760" strokeWidth="1.2"/>
    </svg>
  );
}
function AreaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1C4.3 1 3 2.3 3 4c0 2.5 3 7 3 7s3-4.5 3-7c0-1.7-1.3-3-3-3z" stroke="#484760" strokeWidth="1.2"/>
      <circle cx="6" cy="4" r="1.2" stroke="#484760" strokeWidth="1.1"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#484760" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="#313142" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function BookmarkIcon({ saved }) {
  return saved ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#604aff"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" stroke="#dadadf" strokeWidth="1.5"/>
    </svg>
  );
}

const CHIP_ICONS = { sort: SortIcon, price: PriceIcon, beauty: BeautyIcon, area: AreaIcon, kakao: CheckIcon };

// ── App ────────────────────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState(2);      // 레이저/고주파
  const [activeSub, setActiveSub] = useState(0);      // 전체
  const [cards, setCards] = useState(CARDS);

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setCards(prev => prev.map(c => c.id === id ? { ...c, saved: !c.saved } : c));
  };

  return (
    <div>
      {/* ── Sticky Header ── */}
      <div className="sticky-header">
        {/* Status Bar */}
        <div className="status-bar">
          <span className="status-time">7:01</span>
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
        {cards.map(card => (
          <div key={card.id} className="event-cell">
            <div className="event-contents">
              {/* Thumbnail */}
              <div className="thumb-block">
                <div className="thumb-img-wrap">
                  <img src={THUMB} alt="" />
                  <div className="thumb-gradient" />
                  <div className="thumb-promo"><span>⚡️1회체험가</span></div>
                </div>
                {/* HOT Badge */}
                <div className="hot-badge">
                  <div className="hot-badge-body"><span>HOT</span></div>
                  <div className="hot-badge-tail" />
                </div>
              </div>

              {/* Text Group */}
              <div className="event-text-group">
                {/* Name */}
                <div className="event-name-row">
                  <div className="event-name">{card.name}</div>
                  {card.isAd && <div className="ad-badge"><span>AD</span></div>}
                </div>

                {/* Desc */}
                <div className="event-desc">{card.desc}</div>

                {/* Hospital */}
                <div className="hospital-row">
                  <span className="hospital-text">{card.location}</span>
                  <div className="hospital-divider" />
                  <span className="hospital-text">{card.clinic}</span>
                </div>

                {/* Price */}
                <div className="price-row">
                  <span className="price-main">{card.price.toLocaleString("ko-KR")}원</span>
                  <span className="price-pct">{card.discountRate}%</span>
                  <span className="price-vat">VAT 포함</span>
                </div>

                {/* Badges */}
                <div className="badge-group">
                  {card.badges.map((b, i) => (
                    <span key={i} className={`badge-chip badge-chip--${b.type}`}>
                      {b.icon && b.icon}{b.label}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="rating-row">
                  <span className="rating-stars">★</span>
                  <span className="rating-score">{card.rating}</span>
                  <span className="rating-count">({card.reviewCount})</span>
                  <button className="bookmark-btn" onClick={e => toggleSave(card.id, e)}>
                    <BookmarkIcon saved={card.saved} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
