import React, { useState, useCallback, useEffect } from 'react';
import { AppState } from './types';
import { ROMANTIC_QUOTES, QUESTION_STEPS, INITIAL_GIF, SUCCESS_GIF, CELEBRATION_GIF } from './constants';
import Confetti from './components/Confetti';
import AdminDashboard from './components/AdminDashboard';
import { sounds } from './utils/sounds';
import { tracker } from './utils/tracker';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.START);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [noButtonTransform, setNoButtonTransform] = useState({ scale: 1, rotate: 0 });
  const [showAdmin, setShowAdmin] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view_stats') === 'ashu') {
      setShowAdmin(true);
    }
  }, []);

  const currentStep = QUESTION_STEPS[questionIndex];

  const moveNoButton = useCallback(() => {
    sounds.playNo();
    const padding = 120;
    const x = Math.random() * (window.innerWidth - padding * 2) + padding;
    const y = Math.random() * (window.innerHeight - padding * 2) + padding;
    const scale = 0.4 + Math.random() * 0.8;
    const rotate = (Math.random() - 0.5) * 60;
    
    setNoButtonPos({ x, y });
    setNoButtonTransform({ scale, rotate });
  }, []);

  useEffect(() => {
    if (noCount > 0 && currentState === AppState.QUESTIONS) {
      const interval = setInterval(moveNoButton, 1800);
      return () => clearInterval(interval);
    }
  }, [noCount, currentState, moveNoButton]);

  useEffect(() => {
    if (currentState === AppState.ACCEPTED) {
      sounds.playCelebration();
      tracker.trackAccept();
    }
  }, [currentState]);

  const handleNoClick = () => {
    const quote = ROMANTIC_QUOTES[currentQuoteIndex].text;
    tracker.trackNo(quote);
    setNoCount(prev => prev + 1);
    setYesButtonSize(prev => prev + 0.25);
    setCurrentQuoteIndex(prev => (prev + 1) % ROMANTIC_QUOTES.length);
    moveNoButton();
  };

  const handleYesClick = () => {
    sounds.playYes();
    tracker.trackYes(questionIndex);
    if (questionIndex < QUESTION_STEPS.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setNoButtonPos(null);
      setNoCount(0);
      setYesButtonSize(1);
    } else {
      setCurrentState(AppState.ACCEPTED);
    }
  };

  const handleShare = async () => {
    tracker.trackShare();
    const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${tracker.getCurrentSessionId()}`;
    
    const shareData = {
      title: 'Be My Valentine?',
      text: 'Someone has a very special question for you! ❤️',
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const startProposal = () => {
    sounds.playBackgroundMusic();
    sounds.playYes();
    tracker.trackYes(-1);
    setCurrentState(AppState.QUESTIONS);
  };

  const renderStart = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center animate-fadeIn bg-pink-50 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-pink-200 text-6xl animate-pulse">❤️</div>
      <div className="absolute bottom-20 right-10 text-pink-200 text-6xl animate-bounce">❤️</div>
      
      <div className="bg-white p-4 rounded-3xl shadow-xl mb-8 transform hover:scale-105 transition-transform duration-500 z-10">
        <img 
          src={INITIAL_GIF} 
          alt="Baby Panda" 
          className="w-56 h-56 md:w-64 md:h-64 rounded-2xl object-cover border-2 border-pink-100"
        />
      </div>
      <h1 className="text-4xl md:text-6xl font-cursive text-pink-600 mb-6 drop-shadow-sm z-10">
        Hey Beautiful...
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-md bg-white/60 p-6 rounded-2xl backdrop-blur-sm border border-white shadow-sm z-10">
        "I have a journey for us to take together. It's filled with love, memories, and a very important question at the end."
      </p>
      <button
        onClick={startProposal}
        className="px-10 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xl font-bold shadow-xl transition-all transform hover:scale-110 active:scale-95 animate-pulse z-10"
      >
        Let's Start! 🌹
      </button>
    </div>
  );

  const renderQuestions = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-pink-50 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap justify-around items-center gap-20 p-20">
        {[...Array(10)].map((_, i) => <span key={i} className="text-6xl">❤️</span>)}
      </div>

      <div className="bg-white p-2 rounded-3xl shadow-2xl mb-8 border-8 border-white transition-all duration-700 transform hover:scale-[1.02] max-w-lg overflow-hidden">
        <img 
          src={currentStep.image} 
          alt="Romantic Moment" 
          className="w-full h-64 md:h-80 object-cover rounded-2xl"
        />
      </div>
      
      <h2 className="text-2xl md:text-4xl font-cursive text-pink-700 mb-12 drop-shadow-sm px-4 leading-relaxed max-w-2xl">
        {currentStep.question}
      </h2>

      {noCount > 0 && (
        <div className="mb-10 animate-bounce">
          <p className="text-lg text-pink-500 font-semibold px-6 py-2 bg-white/80 rounded-full shadow-md inline-block italic border border-pink-100">
            {ROMANTIC_QUOTES[currentQuoteIndex].text}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-8 min-h-[140px] w-full max-w-md">
        <button
          onClick={handleYesClick}
          style={{ transform: `scale(${yesButtonSize})` }}
          className="px-12 py-5 bg-green-500 hover:bg-green-600 text-white rounded-full text-2xl font-bold shadow-2xl transition-all duration-300 active:scale-95 hover:animate-throb relative z-10"
        >
          {currentStep.yesText}
        </button>
        
        <button
          onClick={handleNoClick}
          onMouseEnter={noCount > 0 ? moveNoButton : undefined}
          style={noButtonPos ? { 
            position: 'fixed', 
            left: noButtonPos.x, 
            top: noButtonPos.y, 
            transform: `translate(-50%, -50%) scale(${noButtonTransform.scale}) rotate(${noButtonTransform.rotate}deg)`,
            zIndex: 50,
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' 
          } : {}}
          className={`px-8 py-3 bg-red-400 hover:bg-red-500 text-white rounded-full text-lg font-medium shadow-md transition-all ${!noButtonPos ? 'hover:rotate-6' : ''} active:scale-90`}
        >
          {noCount === 0 ? currentStep.noText : "Please? 🥺"}
        </button>
      </div>
      
      <div className="mt-8 text-pink-300 font-bold">
        Step {questionIndex + 1} of {QUESTION_STEPS.length}
      </div>
    </div>
  );

  const renderAccepted = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-[#fff0f3] overflow-y-auto py-10">
      <Confetti />
      
      <div className="relative mb-8 transform hover:scale-105 transition-transform duration-700">
        <img 
          src={SUCCESS_GIF} 
          alt="Panda Couple Cuddling" 
          className="w-72 h-72 md:w-96 md:h-96 rounded-[3rem] border-[12px] border-white shadow-[0_20px_60px_rgba(255,182,193,0.6)] object-cover"
        />
        <div className="absolute -top-4 -right-4 bg-yellow-400 p-4 rounded-full shadow-lg animate-bounce text-4xl">
          💖
        </div>
      </div>

      <h1 className="text-5xl md:text-8xl font-cursive text-pink-600 mb-6 drop-shadow-lg animate-pulse">
        YES! 🎉
      </h1>
      
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-t-[12px] border-pink-500 max-w-xl mx-auto mb-12 transform hover:-translate-y-2 transition-transform duration-300">
        <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8 font-cursive leading-tight">
          My heart is yours Ashu and i love you
        </h3>
        <p className="text-gray-600 text-lg md:text-2xl leading-relaxed italic font-medium font-cursive">
          "Every step of this journey led me back to you. I promise to cherish every second we have together, forever and always."
        </p>
      </div>

      <button
        onClick={handleShare}
        className="mb-12 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xl font-bold shadow-xl transition-all transform hover:scale-110 active:scale-95 flex items-center gap-2 group"
      >
        <span className="group-hover:animate-bounce">🎁</span>
        {copyFeedback ? 'Link Copied! ❤️' : 'Share the Love with Others'}
      </button>

      <div className="w-full max-w-md bg-white p-2 rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500 mb-10">
        <img 
          src={CELEBRATION_GIF}
          alt="Happy Celebration"
          className="w-full rounded-xl"
        />
      </div>

      <div className="mt-4 flex gap-8 animate-bounce">
         <span className="text-6xl">🐼</span>
         <span className="text-6xl">❤️</span>
         <span className="text-6xl">🐼</span>
      </div>
    </div>
  );

  return (
    <div className="selection:bg-pink-300 selection:text-white min-h-screen font-sans">
      {showAdmin && <AdminDashboard />}
      {currentState === AppState.START && renderStart()}
      {currentState === AppState.QUESTIONS && renderQuestions()}
      {currentState === AppState.ACCEPTED && renderAccepted()}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes throb {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hover\:animate-throb:hover {
          animation: throb 0.6s ease-in-out infinite;
        }
        body {
          background: #fff5f7;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;