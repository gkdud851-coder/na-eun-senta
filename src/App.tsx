import { 
  Phone, 
  MapPin, 
  Leaf, 
  Activity, 
  Heart, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Users,
  Home,
  Stethoscope,
  Clock,
  ShieldCheck,
  Menu,
  X,
  Sun,
  Footprints,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import React, { useState, useEffect, useCallback } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ctaTextIndex, setCtaTextIndex] = useState(0);
  const [directorSlide, setDirectorSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const ctaTexts = ["무료상담", "견학체험", "등급대행"];
  const directorImages = [
    "images/원장님사진.jpg", 
    "images/원장님사진2.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCtaTextIndex((prev) => (prev + 1) % ctaTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirectorSlide((prev) => (prev + 1) % directorImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slideImages = [
    "images/슬라이드사진1.JPG",
    "images/슬라이드사진2.jpg",
    "images/슬라이드사진3.JPG",
    "images/슬라이드사진4.JPG",
    "images/슬라이드사진5.JPG",
    "images/슬라이드사진6.JPG",
    "images/1층 단독 테라스.JPG",
    "images/테라스 텃밭.jpg",
    "images/평상 휴게실.JPG",
    "images/노래교실.JPG",
    "images/샤워실.JPG",
    "images/화장실.JPG"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slideTimer);
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const navItems = [
    { name: '센터소개', href: '#director' },
    { name: '1층의 장점', href: '#why-first-floor' },
    { name: '재활시스템', href: '#rehab' },
    { name: '하루일과', href: '#daily' },
    { name: '추억앨범', href: '#album' },
    { name: '상담문의', href: '#contact' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#2D342B] font-sans selection:bg-[#E8F0E5] selection:text-[#1A2418] overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#5B8C51] z-[60] origin-left" 
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 py-4 shadow-sm' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl transition-colors ${scrolled ? 'bg-[#5B8C51]' : 'bg-white/20'}`}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg md:text-xl leading-none tracking-tight ${scrolled ? 'text-[#2D342B]' : 'text-white'}`}>전주 더나은 주간보호</span>
              <span className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${scrolled ? 'text-[#5B8C51]' : 'text-white/80'}`}>Daycare Center</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`text-sm font-bold transition-all hover:text-[#5B8C51] ${scrolled ? 'text-[#2D342B]/70' : 'text-white/90'}`}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="tel:063-211-5560" 
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 flex items-center gap-2 ${scrolled ? 'bg-[#2D342B] text-white hover:bg-[#5B8C51]' : 'bg-white text-[#2D342B] hover:bg-[#E8F0E5]'}`}
            >
              <Phone className="w-3.5 h-3.5" />
              상담문의
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-[#2D342B]' : 'text-white'}`}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-6 sm:p-8 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 sm:mb-12">
              <div className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-[#5B8C51]" />
                <span className="font-bold text-lg sm:text-xl">전주 더나은 주간보호</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X /></button>
            </div>
            <div className="flex flex-col gap-6 sm:gap-8 my-auto">
              {navItems.map((item, idx) => (
                <motion.a 
                  key={item.name} 
                  href={item.href} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl sm:text-3xl font-bold text-[#2D342B] hover:text-[#5B8C51] transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-8 pt-4">
              <a 
                href="tel:063-211-5560" 
                className="w-full py-4 bg-[#5B8C51] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                <Phone className="w-5 h-5" />
                전화 상담하기
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="images/전경사진.JPG" 
            alt="전주 더나은 주간보호 전경" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-[10px] md:text-xs font-bold mb-6 tracking-widest uppercase"
          >
            Premium Senior Care Center
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl lg:text-9xl font-bold leading-[1.1] tracking-tight mb-8"
          >
            더 나은 일상, <br />
            더 나은 <span className="text-[#C5D8C1]">내일.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl font-medium text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            전주 시내권 유일의 1층 단독 테라스, <br className="hidden md:block" />
            10년의 진심으로 어르신을 모십니다.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="tel:063-211-5560" 
              className="w-full sm:w-auto px-10 py-4 bg-[#5B8C51] text-white rounded-full font-bold text-lg hover:bg-[#4A7342] transition-all shadow-xl active:scale-95"
            >
              상담 예약하기
            </a>
            <a 
              href="#philosophy" 
              className="w-full sm:w-auto px-10 py-4 bg-white/10 border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all active:scale-95"
            >
              둘러보기
            </a>
          </motion.div>
        </div>
      </section>

      {/* Director's Message */}
      <section id="director" className="py-16 sm:py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
            <motion.div {...fadeIn} className="flex-1">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#F4F7F2] rounded-full -z-10" />
                <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 sm:mb-4 block">Director's Message</span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#2D342B] leading-tight mb-6 sm:mb-8">
                  어르신의 행복이 <br />
                  <span className="text-[#5B8C51]">우리의 보람</span>입니다
                </h2>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-[#2D342B]/70 leading-relaxed">
                  <p>
                    안녕하십니까, 전주 더나은 주간보호센터 원장입니다. <br />
                    저희 센터는 단순한 돌봄을 넘어, 어르신들이 '더 나은' 일상을 누리실 수 있도록 10년의 노하우를 담아 설립되었습니다.
                  </p>
                  <p>
                    탁 트인 1층 테라스에서 햇살을 받으며, 최고급 재활 장비로 건강을 회복하시는 어르신들의 웃음소리가 저희의 가장 큰 기쁨입니다.
                  </p>
                  <p className="font-bold text-[#2D342B]">
                    내 부모님을 모시는 마음으로, 정성을 다해 섬기겠습니다. 감사합니다.
                  </p>
                </div>
                <div className="mt-8 sm:mt-12 flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    <img src="images/원장님사진.jpg" alt="원장님" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[#2D342B]/40 font-bold uppercase tracking-widest">Center Director</p>
                    <p className="text-lg sm:text-xl font-bold text-[#2D342B]">권희숙 원장</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="relative aspect-[4/3] rounded-3xl sm:rounded-[40px] overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={directorSlide}
                    src={directorImages[directorSlide]} 
                    alt="원장님 사진" 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1 }}
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 border-[12px] sm:border-[20px] border-white/10 pointer-events-none" />
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-2">
                  {directorImages.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === directorSlide ? 'bg-white w-6' : 'bg-white/50'}`} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Happy Moments Marquee Gallery */}
      <section id="moments" className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden">
        <div className="text-center mb-8 sm:mb-12 px-6">
          <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">Happy Moments</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#2D342B] leading-tight">
            더나은의 <span className="text-[#5B8C51]">행복한 순간들</span>
          </h2>
        </div>

        {[
          {
            dir: 'marquee-left',
            dur: '45s',
            photos: [
              { src: "images/게임.jpg", label: "신나는 게임 시간" },
              { src: "images/노래교실.jpg", label: "흥겨운 노래교실" },
              { src: "images/네일뷰티.jpg", label: "네일 뷰티 케어" },
              { src: "images/슬링.jpg", label: "1:1 슬링 재활 운동" },
              { src: "images/복날삼계탕.jpg", label: "복날 삼계탕 잔치" },
              { src: "images/아침조회.jpg", label: "활기찬 아침 체조" },
              { src: "images/게임2.jpg", label: "함께라서 즐거운 놀이" },
              { src: "images/등원.jpg", label: "따뜻한 맞이 등원" },
              { src: "images/게임3.jpg", label: "웃음 가득 단체 게임" }
            ]
          },
          {
            dir: 'marquee-right',
            dur: '52s',
            photos: [
              { src: "images/굴비추억회상.jpg", label: "추억 회상 프로그램" },
              { src: "images/치매게임.jpg", label: "두뇌 튼튼 인지 게임" },
              { src: "images/식사.jpg", label: "정성 가득 균형 식단" },
              { src: "images/휴게.jpg", label: "낮잠과 편안한 휴식" },
              { src: "images/면도케어.jpg", label: "세심한 면도 케어" },
              { src: "images/복숭아.jpg", label: "제철 과일 간식" },
              { src: "images/인지프로그램.jpg", label: "인지 맞춤 프로그램" },
              { src: "images/아침조회2.jpg", label: "건강 체조 시간" },
              { src: "images/굴비추억회상2.jpg", label: "오감 자극 회상 활동" }
            ]
          }
        ].map((row, rowIdx) => (
          <div key={rowIdx} className={`flex overflow-hidden ${rowIdx === 0 ? 'mb-3 sm:mb-5' : ''} group`}>
            <div
              className={`flex gap-3 sm:gap-5 shrink-0 ${row.dir} group-hover:[animation-play-state:paused]`}
              style={{ animationDuration: row.dur }}
            >
              {[...row.photos, ...row.photos].map((photo, idx) => (
                <div
                  key={idx}
                  className="relative w-48 h-36 sm:w-60 sm:h-44 md:w-72 md:h-52 rounded-2xl overflow-hidden shrink-0 shadow-sm"
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallbacks = [
                        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
                      ];
                      (e.target as HTMLImageElement).src = fallbacks[idx % fallbacks.length];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <p className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4 text-white text-xs sm:text-sm font-bold">
                    {photo.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4 Advantages Overview */}
      <section id="advantages" className="py-16 sm:py-20 md:py-28 bg-[#FDFDFB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10 sm:mb-14">
            <motion.span {...fadeIn} className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">
              Why Deonaeun
            </motion.span>
            <motion.h2 {...fadeIn} className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#2D342B] leading-tight">
              더나은이 <span className="text-[#5B8C51]">특별한 4가지 이유</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { num: "01", icon: <Home className="w-6 h-6 sm:w-7 sm:h-7" />, title: "1층 단독 센터", desc: "계단 없는 안전한 이동과 탁 트인 개방감", href: "#why-first-floor" },
              { num: "02", icon: <Sun className="w-6 h-6 sm:w-7 sm:h-7" />, title: "시원하고 쾌적한 공간", desc: "전주 시내권 유일의 1층 테라스와 텃밭", href: "#philosophy" },
              { num: "03", icon: <Activity className="w-6 h-6 sm:w-7 sm:h-7" />, title: "최고의 재활 장비", desc: "억 단위 프리미엄 장비로 건강한 회복", href: "#rehab" },
              { num: "04", icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7" />, title: "10년 노하우 케어", desc: "송천동 1호점으로 검증된 전문 케어", href: "#care" }
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group p-5 sm:p-7 bg-white rounded-3xl border border-[#E8F0E5] hover:border-[#5B8C51]/40 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="text-2xl sm:text-3xl font-black text-[#5B8C51]/25 group-hover:text-[#5B8C51]/50 transition-colors">{item.num}</span>
                  <div className="p-2.5 sm:p-3 bg-[#F4F7F2] text-[#5B8C51] rounded-2xl group-hover:bg-[#5B8C51] group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#2D342B] mb-1.5 sm:mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-[#2D342B]/60 leading-relaxed flex-1">{item.desc}</p>
                <span className="mt-4 text-xs font-bold text-[#5B8C51] flex items-center gap-1">
                  자세히 보기 <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Why 1st Floor - 번호형 풀와이드 리스트 */}
      <section id="why-first-floor" className="py-16 sm:py-20 md:py-32 bg-[#F4F7F2]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.span {...fadeIn} className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">
              01. 1st Floor Advantage
            </motion.span>
            <motion.h2 {...fadeIn} className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#2D342B] leading-tight mb-4 flex items-center justify-center gap-3 sm:gap-4">
              <span className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 bg-[#5B8C51] text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black">01</span>
              <span>왜 <span className="text-[#5B8C51]">1층 센터</span>여야 할까?</span>
            </motion.h2>
            <motion.p {...fadeIn} className="text-sm sm:text-base md:text-lg text-[#2D342B]/70 font-medium">
              어르신의 안전과 마음의 평온을 위해 1층은 선택이 아닌 필수입니다.
            </motion.p>
          </div>

          <div className="space-y-0 mb-16 md:mb-20">
            {[
              {
                num: "01",
                icon: <Footprints className="w-7 h-7" />,
                title: "안전하고 편한 이동",
                desc: <>송영 차량에서 내리시면 계단도, 엘리베이터도 없이 <b className="text-[#5B8C51]">곧장 센터로 입장</b>합니다. 휠체어·보행기를 쓰셔도 동선이 짧고 평평해 <b className="text-[#5B8C51]">낙상 위험이 크게 줄어듭니다.</b></>
              },
              {
                num: "02",
                icon: <ShieldAlert className="w-7 h-7" />,
                title: "위급 상황에도 빠른 대피",
                desc: <>화재나 정전 시 위층은 계단으로 내려와야 하지만, 1층은 <b className="text-[#5B8C51]">문만 열면 바로 안전한 지상</b>입니다. 소방·인허가 기준을 정직하게 충족한 검증된 대피 동선을 갖추고 있습니다.</>
              },
              {
                num: "03",
                icon: <Sun className="w-7 h-7" />,
                title: "갇힌 답답함을 풀어주는 유일한 숨통",
                desc: <>하루 8시간을 건물 안에서 보내시는 어르신들에게, 넓은 통창으로 보이는 <b className="text-[#5B8C51]">사계절 풍경과 따스한 햇볕</b>은 유일한 숨통입니다. 창가에 앉아 세상 풍경을 바라보는 것만으로도 <b className="text-[#5B8C51]">치매 예방과 우울감 완화</b>에 큰 도움이 됩니다.</>
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-14 ${idx !== 2 ? 'border-b border-[#2D342B]/10' : ''}`}
              >
                <div className="flex md:flex-col items-center md:items-start gap-4 shrink-0 md:w-32">
                  <span className="text-4xl md:text-5xl font-black text-[#5B8C51]/30">{item.num}</span>
                  <div className="p-3 bg-white text-[#5B8C51] rounded-2xl shadow-sm">
                    {item.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2D342B] mb-4 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-[#2D342B]/70 leading-relaxed md:leading-loose">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Clean 2-Photo Showcase */}
          <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md group">
              <img 
                src="images/테라스 텃밭.jpg" 
                alt="1층 단독 테라스와 텃밭" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-bold">1층 단독 야외 텃밭</p>
                <p className="text-xs text-white/80">어르신들이 햇볕을 받으며 모종을 가꾸는 정거운 공간</p>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md group">
              <img 
                src="images/1층 단독 테라스.JPG" 
                alt="자연 친화적 1층 휴식 공간" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-bold">탁 트인 통창과 테라스</p>
                <p className="text-xs text-white/80">갑갑함 없이 사계절 변화를 직접 느끼는 유일한 숨통</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Space Showcase Slider */}
      <section id="philosophy" className="py-16 sm:py-24 md:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 sm:mb-16 text-center">
          <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">02. Space Showcase</span>
          <h2 className="text-2xl sm:text-4xl md:text-7xl font-bold text-[#2D342B] leading-tight tracking-tight flex items-center justify-center gap-3 sm:gap-4">
            <span className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 shrink-0 bg-[#5B8C51] text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-3xl font-black">02</span>
            <span>시원하고 <span className="text-[#5B8C51]">쾌적한 공간</span></span>
          </h2>
        </div>

        <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[70vh] bg-gray-100 overflow-hidden touch-pan-y">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={currentSlide}
              src={slideImages[currentSlide]}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x;
                if (swipe > 50) {
                  setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
                } else if (swipe < -50) {
                  setCurrentSlide((prev) => (prev + 1) % slideImages.length);
                }
              }}
              className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          
          {/* Slider Controls */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
            {slideImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentSlide === idx ? 'w-8 sm:w-12 bg-white' : 'w-2 sm:w-3 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/25 border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/25 border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-8 sm:mt-12 text-center">
          <p className="text-base sm:text-lg md:text-2xl text-[#2D342B]/60 font-medium leading-relaxed">
            전주 시내권 유일의 1층 단독 테라스와 <br className="md:hidden" />
            탁 트인 개방감으로 어르신들의 일상을 시원하게 열어드립니다.
          </p>
        </div>
      </section>

      {/* Rehab */}
      <section id="rehab" className="py-16 sm:py-24 md:py-40 bg-[#F4F7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-24">
            <motion.div {...fadeIn}>
              <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">03. Premium Rehab</span>
              <h2 className="text-2xl sm:text-4xl md:text-7xl font-bold text-[#2D342B] leading-tight tracking-tight mb-6 sm:mb-8 flex items-start gap-3 sm:gap-4">
                <span className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 shrink-0 bg-[#5B8C51] text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-3xl font-black mt-0.5 sm:mt-1">03</span>
                <span>최고의 장비가 <br /><span className="text-[#5B8C51]">최고의 회복</span>을</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#2D342B]/60 leading-relaxed mb-8 sm:mb-12">
                10년의 노하우로 엄선한 <span className="text-[#5B8C51] font-bold">억 단위 프리미엄 재활 장비</span>들이 <br className="hidden md:block" />
                어르신들의 건강한 내일을 약속합니다.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-[#E8F0E5]">
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-[#5B8C51] mb-2 sm:mb-4" />
                  <h4 className="text-2xl sm:text-3xl font-bold mb-1">100%</h4>
                  <p className="text-[#2D342B]/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Satisfaction</p>
                </div>
                <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-[#E8F0E5]">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#5B8C51] mb-2 sm:mb-4" />
                  <h4 className="text-2xl sm:text-3xl font-bold mb-1">10Y+</h4>
                  <p className="text-[#2D342B]/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Experience</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] md:aspect-video rounded-3xl sm:rounded-[40px] overflow-hidden shadow-2xl group"
            >
              <img 
                src="images/스모비.jpg" 
                alt="스모비(Smovey) 운동기구" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8">
                <span className="px-3 py-1 sm:px-4 sm:py-2 bg-[#5B8C51] text-white rounded-full text-[10px] md:text-xs font-bold mb-2 sm:mb-4 inline-block">New Equipment</span>
                <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-1.5 sm:mb-2">스모비(Smovey) 진동 운동</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">
                  오스트리아에서 개발된 특수 진동 기구로, <span className="text-[#C5D8C1] font-bold">파킨슨병 어르신들의 보행 능력과 균형 감각 개선</span>에 탁월한 효과가 입증된 최고의 장비입니다.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Equipment Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                title: "꿈의 자전거", 
                image: "images/꿈의자전거.JPG", 
                desc: "인지 능력과 운동 능력을 동시에 향상시키는 스마트 재활 시스템",
                tag: "Cognitive Rehab"
              },
              { 
                title: "셀링턴 마사지", 
                image: "images/셀링턴.JPG", 
                desc: (
                  <>
                    <span className="font-bold text-[#5B8C51] bg-[#E8F0E5] px-1 rounded">420만원 상당</span>의 LED 근적외선 기술로 근육통 완화와 혈액 순환을 돕는 프리미엄 케어
                  </>
                ),
                tag: "Premium Care"
              },
              { 
                title: "슬링폴링운동치료", 
                image: "images/슬링 운동 치료.JPG", 
                desc: (
                  <>
                    <span className="font-bold text-[#5B8C51] bg-[#E8F0E5] px-1 rounded">N천만원 상당</span>의 프리미엄 재활기구로 균형 감각과 심부 근력을 강화하는 맞춤형 운동
                  </>
                ),
                tag: "Advanced Rehab"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E8F0E5] group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-[10px] font-bold text-[#5B8C51] uppercase tracking-widest mb-2 sm:mb-3 block">{item.tag}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2D342B] mb-3">{item.title}</h3>
                  <p className="text-[#2D342B]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Care */}
      <section id="care" className="py-16 sm:py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 order-2 lg:order-1">
              <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">04. Expert Care</span>
              <h2 className="text-2xl sm:text-4xl md:text-7xl font-bold text-[#2D342B] leading-tight tracking-tight mb-8 sm:mb-12 flex items-start gap-3 sm:gap-4">
                <span className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 shrink-0 bg-[#5B8C51] text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-3xl font-black mt-0.5 sm:mt-1">04</span>
                <span>숙련된 케어의 <br /><span className="text-[#5B8C51]">격이 다른 차이</span></span>
              </h2>

              {/* 송천동 1호점 운영 실적 배너 */}
              <motion.div {...fadeIn} className="mb-8 sm:mb-10 p-5 sm:p-6 bg-[#E8F0E5] rounded-3xl border border-[#5B8C51]/20 flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-[#5B8C51] text-white rounded-2xl shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-bold text-[#2D342B] text-base sm:text-lg mb-1">송천동 1호점, 성공 운영 중</p>
                  <p className="text-xs sm:text-sm text-[#2D342B]/70 leading-relaxed">
                    송천동에서 <b className="text-[#5B8C51]">1호점 주간보호센터를 성공적으로 운영</b>하며 쌓아온 검증된 노하우를 이곳에 그대로 담았습니다.
                  </p>
                </div>
              </motion.div>

              <div className="space-y-6 sm:space-y-8">
                {[
                  { title: "검증된 운영 노하우", desc: "송천동 1호점을 통해 어르신과 가족분들께 인정받은 운영 시스템을 그대로 이어갑니다." },
                  { title: "맞춤형 질환 케어", desc: "파킨슨, 뇌졸중 등 전문적인 손길이 필요한 질환을 10년 노하우로 관리합니다." },
                  { title: "등급 신청 대행", desc: "복잡한 행정 절차, 베테랑 대표가 직접 빠르고 정확하게 도와드립니다." },
                  { title: "정서 지원 프로그램", desc: "매일매일 즐거운 활동으로 어르신들의 정서적 만족도를 극대화합니다." }
                ].map((item, idx) => (
                  <motion.div key={idx} {...fadeIn} className="flex gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-[#E8F0E5] text-[#5B8C51] rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D342B] mb-1.5 sm:mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm md:text-base text-[#2D342B]/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-3xl sm:rounded-[40px] overflow-hidden shadow-xl">
                <img 
                  src="images/정겨운이미지.JPG" 
                  alt="정겨운 활동" 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5B8C51]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                  <p className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight italic">
                    "부모님의 웃음꽃이 <br /> 다시 피어나는 곳"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Program */}
      <section id="daily" className="py-16 sm:py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">Daily Life</span>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-[#2D342B] leading-tight tracking-tight">
              더나은의 <span className="text-[#5B8C51]">하루 일과</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-10 sm:space-y-12 md:space-y-24">
              {[
                { time: "08:30 - 10:00", title: "등원 및 건강 체크", desc: "안전한 송영 서비스와 함께 혈압, 체온 등 기초 건강 상태를 꼼꼼히 체크합니다.", icon: <Home /> },
                { time: "10:00 - 12:00", title: "오전 재활 프로그램", desc: "스모비, 꿈의 자전거 등 프리미엄 장비를 활용한 맞춤형 신체 재활 운동을 진행합니다.", icon: <Activity /> },
                { time: "12:00 - 13:30", title: "영양 가득 점심 식사", desc: "어르신들의 건강을 고려한 균형 잡힌 식단과 함께 편안한 휴식 시간을 가집니다.", icon: <Heart /> },
                { time: "13:30 - 15:30", title: "오후 인지 프로그램 및 간식", desc: "미술, 음악, 레크리에이션 등 다양한 인지 활동과 함께 즐거운 간식 시간을 가집니다.", icon: <Users /> },
                { time: "15:30 - 17:30", title: "저녁 및 귀가 준비", desc: "영양 가득한 저녁 식사 후, 하루를 정리하며 안전하게 댁까지 모셔다 드립니다.", icon: <ShieldCheck /> }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeIn}
                  className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-24`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#5B8C51] rounded-full -translate-x-1/2 z-10 hidden md:block border-4 border-white shadow-sm" />
                  
                  <div className={`flex-1 w-full text-center ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-[#5B8C51] font-bold text-sm md:text-lg mb-1 sm:mb-2 block">{item.time}</span>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D342B] mb-2 sm:mb-4">{item.title}</h4>
                    <p className="text-[#2D342B]/60 text-xs sm:text-base leading-relaxed max-w-md mx-auto md:mx-0 inline-block">{item.desc}</p>
                  </div>
                  
                  <div className="flex-1 w-full flex justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 bg-[#F4F7F2] rounded-2xl sm:rounded-[32px] flex items-center justify-center text-[#5B8C51] shadow-inner">
                      {/* Icon scaling */}
                      <div className="scale-125 sm:scale-150 md:scale-[2]">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Memory Album - Polaroid Scrapbook */}
      <section id="album" className="py-16 sm:py-24 md:py-32 bg-[#F4F7F2] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">Memory Album</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#2D342B] leading-tight tracking-tight mb-3 sm:mb-4">
              우리들의 <span className="text-[#5B8C51]">소중한 앨범</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#2D342B]/70 font-medium">
              더나은에서 쌓아가는 하루하루의 추억입니다.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {[
              { src: "images/복날삼계탕.jpg", caption: "복날 삼계탕 잔치", rotate: "-rotate-2 sm:-rotate-3", offset: "" },
              { src: "images/노래교실.jpg", caption: "노래교실, 앵콜!", rotate: "rotate-2", offset: "sm:mt-8" },
              { src: "images/네일뷰티.jpg", caption: "고운 손, 네일 케어", rotate: "-rotate-1", offset: "sm:mt-2" },
              { src: "images/굴비추억회상.jpg", caption: "추억 회상 시간", rotate: "rotate-2 sm:rotate-3", offset: "sm:mt-10" },
              { src: "images/휴게.jpg", caption: "따뜻한 오후 낮잠", rotate: "-rotate-2", offset: "sm:mt-4" },
              { src: "images/아침조회.jpg", caption: "활기찬 아침 체조", rotate: "rotate-1", offset: "sm:mt-12" },
              { src: "images/치매게임.jpg", caption: "두뇌 튼튼 인지 게임", rotate: "rotate-2", offset: "" },
              { src: "images/게임.jpg", caption: "웃음 가득 게임 시간", rotate: "-rotate-2 sm:-rotate-3", offset: "sm:mt-6" }
            ].map((photo, idx, arr) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`bg-white p-2.5 pb-3 sm:p-3 sm:pb-4 shadow-md ${photo.rotate} ${photo.offset} hover:rotate-0 hover:scale-105 hover:shadow-xl hover:z-10 transition-all duration-300 cursor-pointer w-[145px] sm:w-[170px] md:w-[210px] group`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-2 sm:mb-3 relative">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-xs transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      사진 확대보기
                    </span>
                  </div>
                </div>
                <p className="text-center text-base sm:text-xl md:text-2xl text-[#2D342B] font-handwriting">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Polaroid Lightbox Modal */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhotoIndex(null)}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            >
              {(() => {
                const photos = [
                  { src: "images/복날삼계탕.jpg", caption: "복날 삼계탕 잔치" },
                  { src: "images/노래교실.jpg", caption: "노래교실, 앵콜!" },
                  { src: "images/네일뷰티.jpg", caption: "고운 손, 네일 케어" },
                  { src: "images/굴비추억회상.jpg", caption: "추억 회상 시간" },
                  { src: "images/휴게.jpg", caption: "따뜻한 오후 낮잠" },
                  { src: "images/아침조회.jpg", caption: "활기찬 아침 체조" },
                  { src: "images/치매게임.jpg", caption: "두뇌 튼튼 인지 게임" },
                  { src: "images/게임.jpg", caption: "웃음 가득 게임 시간" }
                ];
                const currentPhoto = photos[selectedPhotoIndex];

                const handlePrev = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
                };

                const handleNext = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
                };

                return (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-white p-4 sm:p-6 pb-6 sm:pb-8 rounded-2xl sm:rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto"
                  >
                    {/* Top Bar: Counter & Close */}
                    <div className="flex justify-between items-center mb-3 sm:mb-4 px-1">
                      <span className="text-xs sm:text-sm font-bold text-[#5B8C51] bg-[#E8F0E5] px-3 py-1 rounded-full">
                        {selectedPhotoIndex + 1} / {photos.length}
                      </span>
                      <button
                        onClick={() => setSelectedPhotoIndex(null)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-[#2D342B] rounded-full transition-colors active:scale-90"
                        aria-label="닫기"
                      >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>

                    {/* Image Area with Prev/Next Controls */}
                    <div className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900 mb-4 sm:mb-6 shadow-inner flex items-center justify-center group">
                      <img
                        key={currentPhoto.src}
                        src={currentPhoto.src}
                        alt={currentPhoto.caption}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />

                      {/* Navigation Buttons */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/40 hover:bg-black/75 text-white rounded-full backdrop-blur-sm transition-all active:scale-90"
                        aria-label="이전 사진"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/40 hover:bg-black/75 text-white rounded-full backdrop-blur-sm transition-all active:scale-90"
                        aria-label="다음 사진"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                      </button>
                    </div>

                    {/* Caption */}
                    <div className="text-center">
                      <p className="font-handwriting text-2xl sm:text-4xl text-[#2D342B] font-bold">
                        {currentPhoto.caption}
                      </p>
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 sm:mb-24">
            <div className="lg:w-1/3">
              <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-3 block">FAQ</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#2D342B] leading-tight tracking-tight mb-4 sm:mb-8">
                자주 묻는 <br className="hidden sm:block" /> 질문
              </h2>
              <p className="text-[#2D342B]/60 text-sm sm:text-base leading-relaxed">
                궁금하신 점이 더 있으신가요? <br />
                언제든 전화 주시면 친절하게 상담해 드립니다.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-3 sm:space-y-4">
              {[
                { q: "장기요양등급이 없는데 이용 가능한가요?", a: "네, 가능합니다! 등급 신청부터 판정까지 베테랑 원장이 직접 무료로 대행해 드립니다. 언제든 편하게 문의주세요." },
                { q: "이용 시간과 송영 서비스가 궁금합니다.", a: "평일 및 토요일 오전 8시 30분부터 오후 5시 30분까지 운영하며, 전주 전 지역 안전하게 댁 앞까지 모셔다 드리고 모셔 옵니다." },
                { q: "하루 이용 비용은 얼마인가요?", a: "장기요양등급에 따라 국가에서 85~100%를 지원하며, 본인부담금은 등급 및 이용 시간에 따라 차이가 있으니 전화 주시면 상세히 안내해 드립니다." },
                { q: "식사는 어떻게 제공되나요?", a: "어르신들의 소화 능력과 영양 상태를 고려한 맞춤형 식단이 매일 신선하게 조리되어 제공됩니다." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeIn}
                  className="bg-[#F4F7F2] rounded-2xl sm:rounded-[32px] border border-transparent hover:border-[#5B8C51]/20 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 sm:p-8 text-left flex items-center justify-between gap-3 sm:gap-4"
                  >
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#2D342B] flex items-start gap-2 sm:gap-3">
                      <span className="text-[#5B8C51]">Q.</span>
                      {item.q}
                    </h4>
                    <ChevronDown
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-[#5B8C51] shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="text-[#2D342B]/70 leading-relaxed px-5 sm:px-8 pb-5 sm:pb-8 pl-5 sm:pl-16 text-sm sm:text-base">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 sm:py-20 bg-[#5B8C51] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-8 sm:mb-10 leading-tight flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>지금 바로</span>
            <div className="relative h-[1.2em] min-w-[4em] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ctaTextIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[#C5D8C1] absolute whitespace-nowrap"
                >
                  {ctaTexts[ctaTextIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span>받아보세요</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a 
              href="tel:063-211-5560" 
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-[#5B8C51] rounded-full font-bold text-lg sm:text-xl hover:bg-[#E8F0E5] transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              063-211-5560
            </a>
            <p className="text-white/80 font-medium text-xs sm:text-base">
              등급 신청부터 이용 안내까지 <br className="sm:hidden" /> 친절하게 도와드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 md:py-40 bg-[#2D342B] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="text-[#C5D8C1] font-bold tracking-widest uppercase text-xs mb-3 block">Get In Touch</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold leading-tight tracking-tight mb-6 sm:mb-8">
              CONTACT <span className="text-[#C5D8C1]">US.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20">
            {[
              { label: "대표 전화", value: "063-211-5560", href: "tel:063-211-5560", icon: <Phone className="w-5 h-5" /> },
              { label: "사무실", value: "063-211-5561", href: null, icon: <Activity className="w-5 h-5" /> },
              { label: "오시는 길", value: "전북 전주시 덕진구 기린대로 957, 1층", href: "https://map.naver.com/p/entry/place/2029572245", icon: <MapPin className="w-5 h-5" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                {...fadeIn}
                className="p-6 sm:p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-[#C5D8C1] mb-4 sm:mb-6">{item.icon}</div>
                <p className="text-[10px] font-bold text-[#C5D8C1] uppercase tracking-widest mb-2 sm:mb-4">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-lg sm:text-xl md:text-2xl font-bold hover:text-[#C5D8C1] transition-colors leading-snug block">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <a 
              href="https://map.naver.com/p/entry/place/2029572245" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-[#2D342B] rounded-full font-bold text-base sm:text-lg hover:bg-[#C5D8C1] transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
            >
              네이버 지도로 길찾기
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10 pb-10 sm:pb-12 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-[#5B8C51]" />
                <span className="font-bold text-xl sm:text-2xl tracking-tight">전주 더나은 주간보호</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-[#2D342B]/60 font-medium">
                <p>주소: <a href="https://map.naver.com/p/entry/place/2029572245" target="_blank" rel="noopener noreferrer" className="hover:text-[#5B8C51] transition-colors underline underline-offset-4 decoration-dotted">전북 전주시 덕진구 기린대로 957, 1층</a></p>
                <p>TEL: <a href="tel:063-211-5560" className="hover:text-[#5B8C51] transition-colors">063-211-5560</a> | FAX: 063-211-5561</p>
              </div>
            </div>
            <div className="flex gap-8 sm:gap-12">
              <div className="space-y-3 sm:space-y-4">
                <p className="font-bold text-sm sm:text-base text-[#2D342B]">Quick Links</p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#2D342B]/60">
                  <li><a href="#home" className="hover:text-[#5B8C51]">홈으로</a></li>
                  <li><a href="#director" className="hover:text-[#5B8C51]">센터소개</a></li>
                  <li><a href="#rehab" className="hover:text-[#5B8C51]">재활프로그램</a></li>
                  <li><a href="#philosophy" className="hover:text-[#5B8C51]">시설안내</a></li>
                </ul>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <p className="font-bold text-sm sm:text-base text-[#2D342B]">Support</p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#2D342B]/60">
                  <li><a href="#" className="hover:text-[#5B8C51]">이용약관</a></li>
                  <li><a href="#" className="hover:text-[#5B8C51]">개인정보처리방침</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 sm:pt-12 text-center md:text-left text-[10px] font-bold uppercase tracking-widest text-[#2D342B]/40">
            <p>© 2026 Better Daycare Center. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-3 sm:gap-4 items-end">
        <AnimatePresence>
          {scrolled && (
            <motion.a 
              href="tel:063-211-5560" 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-2.5 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 bg-[#5B8C51] text-white rounded-full shadow-2xl border-2 border-white active:scale-90 transition-all group"
            >
              <span className="font-bold text-xs sm:text-sm">전화상담</span>
              <div className="w-px h-3.5 sm:h-4 bg-white/30" />
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
            </motion.a>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {scrolled && (
            <motion.button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#2D342B] rounded-full shadow-xl flex items-center justify-center border border-gray-100 active:scale-90 transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 -rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
