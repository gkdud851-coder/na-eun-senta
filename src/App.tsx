import { 
  Phone, 
  MapPin, 
  Leaf, 
  Activity, 
  Heart, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Users,
  Home,
  Stethoscope,
  Clock,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ctaTextIndex, setCtaTextIndex] = useState(0);
  const [directorSlide, setDirectorSlide] = useState(0);

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
    "images/슬라이드사진6.JPG"
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
    { name: '재활시스템', href: '#rehab' },
    { name: '하루일과', href: '#daily' },
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
          <div className="hidden xl:flex items-center gap-10">
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
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 flex items-center gap-2 ${scrolled ? 'bg-[#2D342B] text-white hover:bg-[#5B8C51]' : 'bg-white text-[#2D342B] hover:bg-[#E8F0E5]'}`}
            >
              <Phone className="w-3.5 h-3.5" />
              상담문의
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`xl:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-[#2D342B]' : 'text-white'}`}
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
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-[#5B8C51]" />
                <span className="font-bold text-xl">전주 더나은 주간보호</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X /></button>
            </div>
            <div className="flex flex-col gap-10">
              {navItems.map((item, idx) => (
                <motion.a 
                  key={item.name} 
                  href={item.href} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-bold text-[#2D342B] hover:text-[#5B8C51] transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <a 
                href="tel:063-211-5560" 
                className="w-full py-5 bg-[#5B8C51] text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
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
            className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold leading-[1.2] tracking-tight mb-8 break-keep"
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
            className="flex flex-col md:flex-row items-center justify-center gap-4"
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
      <section id="director" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <motion.div {...fadeIn} className="flex-1">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#F4F7F2] rounded-full -z-10" />
                <h2 className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-4 block">Director's Message</h2>
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#2D342B] leading-tight mb-8 break-keep">
                  어르신의 행복이 <br />
                  <span className="text-[#5B8C51]">우리의 보람</span>입니다
                </h2>
                <div className="space-y-6 text-lg text-[#2D342B]/70 leading-relaxed">
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
                <div className="mt-12 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                    <img src="images/원장님사진.jpg" alt="원장님" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm text-[#2D342B]/40 font-bold uppercase tracking-widest">Center Director</p>
                    <p className="text-xl font-bold text-[#2D342B]">권희숙 원장</p>
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
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
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
                <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
                <div className="absolute bottom-6 right-6 flex gap-2">
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

      {/* Space Showcase Slider */}
      <section id="philosophy" className="py-24 md:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-4 block">01. Space Showcase</span>
          <h2 className="text-2xl sm:text-4xl md:text-7xl font-bold text-[#2D342B] leading-tight tracking-tight break-keep">
            시원하고 <span className="text-[#5B8C51]">쾌적한 공간</span>
          </h2>
        </div>

        <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-100 overflow-hidden touch-pan-y">
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
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {slideImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentSlide === idx ? 'w-12 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-12 text-center">
          <p className="text-lg md:text-2xl text-[#2D342B]/60 font-medium leading-relaxed">
            전주 시내권 유일의 1층 단독 테라스와 <br className="md:hidden" />
            탁 트인 개방감으로 어르신들의 일상을 시원하게 열어드립니다.
          </p>
        </div>
      </section>

      {/* Rehab */}
      <section id="rehab" className="py-24 md:py-40 bg-[#F4F7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div {...fadeIn}>
              <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-4 block">02. Premium Rehab</span>
              <h2 className="text-2xl sm:text-4xl md:text-7xl font-bold text-[#2D342B] leading-tight tracking-tight mb-8 break-keep">
                최고의 장비가 <br />
                <span className="text-[#5B8C51]">최고의 회복</span>을
              </h2>
              <p className="text-lg md:text-xl text-[#2D342B]/60 leading-relaxed mb-12">
                10년의 노하우로 엄선한 <span className="text-[#5B8C51] font-bold">억 단위 프리미엄 재활 장비</span>들이 <br className="hidden md:block" />
                어르신들의 건강한 내일을 약속합니다.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#E8F0E5]">
                  <Activity className="w-8 h-8 text-[#5B8C51] mb-4" />
                  <h4 className="text-3xl font-bold mb-1">100%</h4>
                  <p className="text-[#2D342B]/40 text-[10px] font-bold uppercase tracking-widest">Satisfaction</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#E8F0E5]">
                  <Clock className="w-8 h-8 text-[#5B8C51] mb-4" />
                  <h4 className="text-3xl font-bold mb-1">10Y+</h4>
                  <p className="text-[#2D342B]/40 text-[10px] font-bold uppercase tracking-widest">Experience</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] md:aspect-video rounded-[40px] overflow-hidden shadow-2xl group"
            >
              <img 
                src="images/스모비.jpg" 
                alt="스모비(Smovey) 운동기구" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                <span className="px-4 py-2 bg-[#5B8C51] text-white rounded-full text-[10px] md:text-xs font-bold mb-3 md:mb-4 inline-block">New Equipment</span>
                <h3 className="text-xl md:text-3xl font-bold text-white mb-2">스모비(Smovey) 진동 운동</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">
                  오스트리아에서 개발된 특수 진동 기구로, <span className="text-[#C5D8C1] font-bold">파킨슨병 어르신들의 보행 능력과 균형 감각 개선</span>에 탁월한 효과가 입증된 최고의 장비입니다.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Equipment Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "꿈의 자전거", 
                image: "images/꿈의자전거.JPG", 
                desc: "인지 능력과 운동 능력을 동시에 향상시키는 스마트 재활 시스템",
                tag: "Cognitive Rehab"
              },
              { 
                title: "셀리턴 마사지", 
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
                <div className="p-8">
                  <span className="text-[10px] font-bold text-[#5B8C51] uppercase tracking-widest mb-3 block">{item.tag}</span>
                  <h3 className="text-2xl font-bold text-[#2D342B] mb-4">{item.title}</h3>
                  <p className="text-[#2D342B]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Care */}
      <section id="care" className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 order-2 lg:order-1">
              <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-4 block">03. Expert Care</span>
              <h2 className="text-4xl md:text-7xl font-bold text-[#2D342B] leading-tight tracking-tight mb-12">
                숙련된 케어의 <br />
                <span className="text-[#5B8C51]">격이 다른 차이</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "맞춤형 질환 케어", desc: "파킨슨, 뇌졸중 등 전문적인 손길이 필요한 질환을 10년 노하우로 관리합니다." },
                  { title: "등급 신청 대행", desc: "복잡한 행정 절차, 베테랑 대표가 직접 빠르고 정확하게 도와드립니다." },
                  { title: "정서 지원 프로그램", desc: "매일매일 즐거운 활동으로 어르신들의 정서적 만족도를 극대화합니다." }
                ].map((item, idx) => (
                  <motion.div key={idx} {...fadeIn} className="flex gap-6">
                    <div className="w-12 h-12 shrink-0 bg-[#E8F0E5] text-[#5B8C51] rounded-xl flex items-center justify-center font-bold text-xl">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-[#2D342B] mb-2">{item.title}</h4>
                      <p className="text-[#2D342B]/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-xl">
                <img 
                  src="images/정겨운이미지.JPG" 
                  alt="정겨운 활동" 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5B8C51]/60 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-2xl md:text-4xl font-bold text-white leading-tight italic">
                    "부모님의 웃음꽃이 <br /> 다시 피어나는 곳"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Program */}
      <section id="daily" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-4 block">04. Daily Life</span>
            <h2 className="text-4xl md:text-7xl font-bold text-[#2D342B] leading-tight tracking-tight">
              더나은의 <span className="text-[#5B8C51]">하루 일과</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12 md:space-y-24">
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
                  className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-24`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#5B8C51] rounded-full -translate-x-1/2 z-10 hidden md:block border-4 border-white shadow-sm" />
                  
                  <div className={`flex-1 w-full ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-[#5B8C51] font-bold text-sm md:text-lg mb-2 block">{item.time}</span>
                    <h4 className="text-2xl md:text-3xl font-bold text-[#2D342B] mb-4">{item.title}</h4>
                    <p className="text-[#2D342B]/60 leading-relaxed max-w-md mx-auto md:mx-0 inline-block">{item.desc}</p>
                  </div>
                  
                  <div className="flex-1 w-full flex justify-center">
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-[#F4F7F2] rounded-[32px] flex items-center justify-center text-[#5B8C51] shadow-inner">
                      {/* Icon scaling */}
                      <div className="scale-150 md:scale-[2]">
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

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 mb-24">
            <div className="lg:w-1/3">
              <span className="text-[#5B8C51] font-bold tracking-widest uppercase text-xs mb-4 block">FAQ</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#2D342B] leading-tight tracking-tight mb-8">
                자주 묻는 <br /> 질문
              </h2>
              <p className="text-[#2D342B]/60 leading-relaxed">
                궁금하신 점이 더 있으신가요? <br />
                언제든 전화 주시면 친절하게 상담해 드립니다.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-4">
              {[
                { q: "장기요양등급이 없는데 이용 가능한가요?", a: "네, 가능합니다! 등급 신청부터 판정까지 베테랑 원장이 직접 무료로 대행해 드립니다. 언제든 편하게 문의주세요." },
                { q: "이용 시간과 송영 서비스가 궁금합니다.", a: "평일 및 토요일 오전 8시 30분부터 오후 5시 30분까지 운영하며, 전주 전 지역 안전하게 댁 앞까지 모셔다 드리고 모셔 옵니다." },
                { q: "하루 이용 비용은 얼마인가요?", a: "장기요양등급에 따라 국가에서 85~100%를 지원하며, 본인부담금은 등급 및 이용 시간에 따라 차이가 있으니 전화 주시면 상세히 안내해 드립니다." },
                { q: "식사는 어떻게 제공되나요?", a: "어르신들의 소화 능력과 영양 상태를 고려한 맞춤형 식단이 매일 신선하게 조리되어 제공됩니다." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeIn}
                  className="p-8 bg-[#F4F7F2] rounded-[32px] border border-transparent hover:border-[#5B8C51]/20 transition-all"
                >
                  <h4 className="text-lg md:text-xl font-bold text-[#2D342B] mb-4 flex items-start gap-3">
                    <span className="text-[#5B8C51]">Q.</span>
                    {item.q}
                  </h4>
                  <p className="text-[#2D342B]/60 leading-relaxed pl-8">
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#5B8C51] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 leading-tight flex flex-col sm:flex-row items-center justify-center gap-2">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="tel:063-211-5560" 
              className="w-full sm:w-auto px-12 py-5 bg-white text-[#5B8C51] rounded-full font-bold text-xl hover:bg-[#E8F0E5] transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              063-211-5560
            </a>
            <p className="text-white/80 font-medium">
              등급 신청부터 이용 안내까지 <br className="sm:hidden" /> 친절하게 도와드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-40 bg-[#2D342B] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#C5D8C1] font-bold tracking-widest uppercase text-xs mb-4 block">Get In Touch</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-tight tracking-tight mb-8">
              CONTACT <span className="text-[#C5D8C1]">US.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { label: "대표 전화", value: "063-211-5560", href: "tel:063-211-5560", icon: <Phone className="w-5 h-5" /> },
              { label: "사무실", value: "063-211-5561", href: null, icon: <Activity className="w-5 h-5" /> },
              { label: "오시는 길", value: "전북 전주시 덕진구 기린대로 957, 1층", href: "https://map.naver.com/p/entry/place/2029572245", icon: <MapPin className="w-5 h-5" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                {...fadeIn}
                className="p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-[#C5D8C1] mb-6">{item.icon}</div>
                <p className="text-[10px] font-bold text-[#C5D8C1] uppercase tracking-widest mb-4">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-xl md:text-2xl font-bold hover:text-[#C5D8C1] transition-colors leading-snug block">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-xl md:text-2xl font-bold leading-snug">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <a 
              href="https://map.naver.com/p/entry/place/2029572245" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 bg-white text-[#2D342B] rounded-full font-bold text-lg hover:bg-[#C5D8C1] transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
            >
              네이버 지도로 길찾기
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-12 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-8 h-8 text-[#5B8C51]" />
                <span className="font-bold text-2xl tracking-tight">전주 더나은 주간보호</span>
              </div>
              <div className="space-y-2 text-sm text-[#2D342B]/60 font-medium">
                <p>주소: <a href="https://map.naver.com/p/entry/place/2029572245" target="_blank" rel="noopener noreferrer" className="hover:text-[#5B8C51] transition-colors underline underline-offset-4 decoration-dotted">전북 전주시 덕진구 기린대로 957, 1층</a></p>
                <p>TEL: <a href="tel:063-211-5560" className="hover:text-[#5B8C51] transition-colors">063-211-5560</a> | FAX: 063-211-5563</p>
              </div>
            </div>
            <div className="flex gap-12">
              <div className="space-y-4">
                <p className="font-bold text-[#2D342B]">Quick Links</p>
                <ul className="space-y-2 text-sm text-[#2D342B]/60">
                  <li><a href="#home" className="hover:text-[#5B8C51]">홈으로</a></li>
                  <li><a href="#about" className="hover:text-[#5B8C51]">센터소개</a></li>
                  <li><a href="#rehab" className="hover:text-[#5B8C51]">재활프로그램</a></li>
                  <li><a href="#facility" className="hover:text-[#5B8C51]">시설안내</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-[#2D342B]">Support</p>
                <ul className="space-y-2 text-sm text-[#2D342B]/60">
                  <li><a href="#" className="hover:text-[#5B8C51]">이용약관</a></li>
                  <li><a href="#" className="hover:text-[#5B8C51]">개인정보처리방침</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 text-center md:text-left text-[10px] font-bold uppercase tracking-widest text-[#2D342B]/40">
            <p>© 2026 Better Daycare Center. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
        <AnimatePresence>
          {scrolled && (
            <motion.a 
              href="tel:063-211-5560" 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-3 px-6 py-4 bg-[#5B8C51] text-white rounded-full shadow-2xl border-2 border-white active:scale-90 transition-all group"
            >
              <span className="font-bold text-sm">전화상담</span>
              <div className="w-px h-4 bg-white/30" />
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
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
              className="w-12 h-12 bg-white text-[#2D342B] rounded-full shadow-xl flex items-center justify-center border border-gray-100 active:scale-90 transition-all"
            >
              <ChevronRight className="w-5 h-5 -rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
