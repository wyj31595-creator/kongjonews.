import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Phone, MapPin, Share2 } from 'lucide-react';
import { CardContent } from './types';

/** 
 * 🖼️ [설정] 원하는 사진과 링크를 여기서 자유롭게 수정하세요!
 */
const CARD_NEWS_CONFIG = {
  images: {
    page1: "https://i.postimg.cc/RZpMjVx7/photo1.jpg", 
    page2: "https://i.postimg.cc/yYYCs4jY/photo2.jpg", 
    page3: "https://i.postimg.cc/LXPqzmdk/photo3.png", 
    page4: "https://i.postimg.cc/rFnZZq8B/photo4.jpg", 
    // 잘리지 않고 잘 보이는 따뜻한 커피잔 사진
    page5: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop", 
  },
  links: {
    donation: "https://www.ihappynanum.com/Nanum/B/KV58E5SU28",
    homepage: "http://www.kongjon.or.kr/",
    taxBenefit: "http://www.kongjon.or.kr/4_1.php",
  },
  centerInfo: {
    name: "사회적협동조합 공존",
    address: "사회적협동조합 공존 부일로 232, 3층 22호",
    phone: "032-710-3650"
  }
};

const CARDS: CardContent[] = [
  {
    id: 1,
    title: "지난 한 해의 격동을 뒤로하고,\n새로운 한 해를 맞이하였습니다.",
    subtitle: "우리의 평범한 일상이 특별한 기적이 됩니다",
    body: "여러분의 건강과 행복을 진심으로 기원합니다.\n올해도 공존과 함께해 주셔서 감사합니다.",
    keyword: "#평범한일상 #특별한기적",
    image: CARD_NEWS_CONFIG.images.page1,
  },
  {
    id: 2,
    title: "설립 5년, 그동안 쌓아온\n소중한 일상의 경험들",
    body: "발달장애인들이 비장애인의 삶 속에서 함께 공존하는 삶을 준비할 수 있도록 일상을 축적해왔습니다.",
    keyword: "#공존의준비 #일상의축적",
    image: CARD_NEWS_CONFIG.images.page2,
  },
  {
    id: 3,
    title: "형제 자매의 힘겨운 돌봄,\n이제 우리가 나설 때입니다",
    body: "보호자의 고령화로 남겨진 가족들의 어깨가 무거워지고 있습니다. 독립을 위한 공동주택 운영이 시급합니다.",
    keyword: "#함께돌봄 #그룹홈필요",
    image: CARD_NEWS_CONFIG.images.page3,
  },
  {
    id: 4,
    title: "공존의 울타리가\n되어주시겠어요?",
    body: "공존이 멈추지 않고 운영되기 위해서는 여러분의 정기적인 손길이 필요합니다. 작은 나눔이 커다란 울타리가 됩니다.",
    keyword: "#작은나눔 #커다란울타리",
    buttonText: "월 1~2만원의 기적",
    image: CARD_NEWS_CONFIG.images.page4,
  },
  {
    id: 5,
    title: "지금, 당신의 사랑을\n전달해주세요",
    body: "매달 커피 몇 잔의 금액으로 발달장애인의 내일을 바꿀 수 있습니다. 연말정산 시 세제 혜택도 가능합니다.",
    keyword: "#사랑의실천 #내일의희망",
    isLastPage: true,
    image: CARD_NEWS_CONFIG.images.page5,
  },
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => currentIndex < CARDS.length - 1 && setCurrentIndex(prev => prev + 1);
  const prevSlide = () => currentIndex > 0 && setCurrentIndex(prev => prev - 1);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = touchEndX.current = null;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '사회적협동조합 공존 - 따듯한 동행',
          text: '발달장애인의 자립과 가족들에게 따듯한 울타리가 되어주세요.',
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다. 카카오톡이나 SNS에 공유해주세요!');
    }
  };

  const currentCard = CARDS[currentIndex];
  const isLastPage = currentIndex === CARDS.length - 1;

  // 마지막 페이지 이미지를 약간 축소 (h-18dvh) 하여 잘리지 않게 함
  const getImageHeight = () => {
    if (currentIndex === 4) return 'h-[18dvh] sm:h-[22%]'; 
    if (currentIndex === 1) return 'h-[40dvh] sm:h-[45%]'; 
    return 'h-[35dvh] sm:h-[40%]'; 
  };

  return (
    <div className="flex justify-center items-center w-full h-[100dvh] bg-gray-200 font-sans overflow-hidden p-0 sm:p-4">
      <div 
        className="relative w-full max-w-[480px] h-full sm:h-[820px] sm:max-h-[95vh] sm:rounded-[32px] bg-white shadow-xl overflow-hidden flex flex-col select-none border border-white/20 transition-all duration-300"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 이미지 영역: 마지막 페이지 mt-12를 주어 아래로 전체적으로 내림 */}
        <div className={`relative ${getImageHeight()} w-full overflow-hidden bg-white flex-shrink-0 transition-all duration-300 ${currentIndex === 4 ? 'mt-12' : ''}`}>
          <img key={currentCard.image} src={currentCard.image} alt="카드 이미지" className="w-full h-full object-cover" />
          
          {currentCard.id === 1 && (
            <div className="absolute bottom-2 right-2 bg-black/40 px-2 py-0.5 rounded text-[8px] text-white font-medium z-20">
              출처 : 오마이뉴스
            </div>
          )}
          {currentCard.id === 3 && (
            <div className="absolute bottom-2 right-2 bg-black/40 px-2 py-0.5 rounded text-[8px] text-white font-medium z-20">
              출처 : 보건복지부
            </div>
          )}

          <div className="absolute top-0 left-0 w-full h-1 z-30 flex gap-1 px-4 pt-3">
             {CARDS.map((_, idx) => (
               <div key={idx} className="flex-1 h-full bg-black/10 overflow-hidden rounded-full">
                 <div className={`h-full bg-emerald-500 transition-all duration-300 ${idx <= currentIndex ? 'w-full' : 'w-0'}`} />
               </div>
             ))}
          </div>
          <div className="absolute top-7 right-5 z-10">
            <div className="bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[9px] font-bold">
              {currentIndex + 1} / {CARDS.length}
            </div>
          </div>
        </div>

        {/* 텍스트 컨텐츠 영역: 스크롤 절대 없게 고정 */}
        <div className={`flex-1 flex flex-col px-6 min-h-0 overflow-hidden bg-white transition-all ${currentIndex === 4 ? 'pt-2 pb-0' : 'pt-5 pb-3'}`}>
          {currentCard.keyword && currentIndex !== 0 && (
            <div className={`${currentIndex >= 3 ? 'mb-1 sm:mb-2' : 'mb-3 sm:mb-5'} flex-shrink-0`}>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] sm:text-[13px] font-black border border-emerald-100 tracking-tight">{currentCard.keyword}</span>
            </div>
          )}

          <div className={`${currentIndex === 0 ? 'mt-1' : ''} flex-shrink-0`}>
            <h1 className={`${currentIndex === 4 ? 'text-[clamp(1.1rem,3.2vh,1.3rem)] mb-2' : 'text-[clamp(1.2rem,4vh,1.45rem)] mb-2 sm:mb-4'} font-[900] text-gray-900 leading-[1.3] whitespace-pre-wrap tracking-tighter break-keep`}>{currentCard.title}</h1>
          </div>

          <div className={`flex-1 flex flex-col ${currentIndex === 4 ? 'overflow-hidden' : 'no-scrollbar overflow-y-auto'} ${currentIndex >= 3 ? 'space-y-1' : 'space-y-2.5'}`}>
            {currentCard.subtitle && <p className="text-emerald-700 font-bold text-[clamp(0.9rem,2.2vh,1.1rem)] leading-snug border-l-[3px] border-emerald-500 pl-3 break-keep">{currentCard.subtitle}</p>}
            
            {currentCard.body && <p className="text-gray-600 text-[clamp(0.85rem,2.1vh,1.05rem)] leading-[1.4] font-bold whitespace-pre-wrap break-keep tracking-tight">{currentCard.body}</p>}
            
            {currentCard.buttonText && !isLastPage && <div className="pt-1"><span className="inline-block bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full font-bold text-[12px] sm:text-[13px] shadow-sm animate-bounce">{currentCard.buttonText}</span></div>}
            
            {currentCard.keyword && currentIndex === 0 && <div className="pt-2 sm:pt-4 pb-2"><span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[12px] sm:text-[14px] font-black border border-emerald-100 tracking-tight">{currentCard.keyword}</span></div>}
          </div>

          {/* 마지막 페이지 액션: 버튼 상단 여백(mt-auto)으로 스크롤 없이 하단 고정 */}
          {isLastPage && (
            <div className="mt-auto mb-6 flex-shrink-0 flex flex-col items-center gap-1">
              <button 
                onClick={() => window.open(CARD_NEWS_CONFIG.links.donation, '_blank')} 
                className="w-full max-w-[210px] bg-emerald-500 text-white py-2.5 rounded-xl font-black text-[13px] sm:text-[15px] flex flex-col items-center justify-center shadow-md active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 fill-current" /><span>지금 정기 후원하기</span></div>
                <span className="text-[8px] sm:text-[9.5px] font-medium mt-0.5 opacity-90">발달장애인의 내일을 지원해주세요</span>
              </button>
              <button onClick={handleShare} className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-[10px] sm:text-[11px] py-1 opacity-80 active:opacity-100"><Share2 size={10} /><span>이 소식 주변에 공유하기</span></button>
            </div>
          )}
        </div>

        {/* 하단 네비게이션 */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-center mb-1">
            <button onClick={prevSlide} disabled={currentIndex === 0} className={`p-1 ${currentIndex === 0 ? 'text-gray-200' : 'text-gray-400'}`}><ChevronLeft size={20} /></button>
            <div className="flex gap-1">{CARDS.map((_, idx) => (<div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-emerald-500' : 'w-1 bg-gray-200'}`} />))}</div>
            <button onClick={nextSlide} disabled={currentIndex === CARDS.length - 1} className={`p-1 ${currentIndex === CARDS.length - 1 ? 'text-gray-200' : 'text-gray-400'}`}><ChevronRight size={20} /></button>
          </div>
          
          {isLastPage && (
            <div className="grid grid-cols-2 gap-2 mb-1.5">
               <button onClick={() => window.open(CARD_NEWS_CONFIG.links.homepage, '_blank')} className="bg-white py-1.5 rounded-lg border border-gray-100 text-[10px] sm:text-[11px] font-bold text-gray-500 flex items-center justify-center gap-1 active:bg-gray-50"><ExternalLink size={10} /> 홈페이지</button>
               <button onClick={() => window.open(CARD_NEWS_CONFIG.links.taxBenefit, '_blank')} className="bg-white py-1.5 rounded-lg border border-gray-100 text-[10px] sm:text-[11px] font-bold text-gray-500 flex items-center justify-center gap-1 active:bg-gray-50"><ExternalLink size={10} /> 세제 혜택</button>
            </div>
          )}
          
          <div className="flex flex-col items-center gap-0.5">
             <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[11px] text-gray-400 font-medium truncate max-w-full px-2"><MapPin size={10} className="text-emerald-500 flex-shrink-0" /><span>{CARD_NEWS_CONFIG.centerInfo.address}</span></div>
             <a href={`tel:${CARD_NEWS_CONFIG.centerInfo.phone}`} className="flex items-center gap-1.5 px-3 py-0.5 bg-white border border-emerald-100 rounded-full text-[10px] sm:text-[12px] text-emerald-600 font-bold shadow-sm"><Phone size={10} fill="currentColor" className="mr-0.5" />{CARD_NEWS_CONFIG.centerInfo.phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;