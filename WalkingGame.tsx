import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Text, 
  RandomizedLight, 
  ContactShadows, 
  PerspectiveCamera,
  PresentationControls
} from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { WALKING_CHALLENGES } from './walkingData';
import { Check, X, Trophy, RefreshCw, User, Star, ArrowRight, HelpCircle } from 'lucide-react';
import * as THREE from 'three';

// 3D Avatar for Gor
function GorAvatar({ position, color }: { position: [number, number, number], color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh} castShadow>
        <capsuleGeometry args={[0.4, 0.8, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      {/* Eye markers */}
      <mesh position={[0.1, 0.85, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.1, 0.85, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Hat for Gor */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

// 3D Avatar for Gayane
function GayaneAvatar({ position, color }: { position: [number, number, number], color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2 + 1) * 0.1;
    }
  });

  return (
    <group position={position}>
       <mesh ref={mesh} castShadow>
        <capsuleGeometry args={[0.35, 0.8, 4, 12]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
       {/* Eye markers */}
       <mesh position={[0.1, 0.85, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.1, 0.85, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Hair for Gayane */}
      <mesh position={[0, 0.8, -0.1]}>
        <sphereGeometry args={[0.38, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#422006" />
      </mesh>
    </group>
  );
}

function Scene({ gorPos, gayanePos }: { gorPos: number, gayanePos: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
      <RandomizedLight amount={8} radius={5} intensity={0.5} ambient={0.25} position={[5, 5, -10]} bias={0.001} />
      
      <PresentationControls speed={1.5} global zoom={1.1} polar={[-0.1, Math.PI / 4]}>
        <group rotation={[0, -0.5, 0]}>
          {/* Path/Track */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#f1f5f9" />
          </mesh>

          {/* Gor and Gayane */}
          <GorAvatar position={[-1.5, 0, gorPos]} color="#3b82f6" />
          <GayaneAvatar position={[1.5, 0, gayanePos]} color="#ec4899" />

          {/* Finish Line */}
          <mesh position={[0, -0.45, 4.5]}>
            <boxGeometry args={[6, 0.1, 0.2]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </group>
      </PresentationControls>

      <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.2} far={10} color="#000000" />
      <Environment preset="city" />
    </>
  );
}

export default function WalkingGame() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({ gor: 0, gayane: 0 });
  const [turn, setTurn] = useState<'gor' | 'gayane'>('gor');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Position on the 3D track (0 to 4.5)
  const gorPos = (scores.gor / (WALKING_CHALLENGES.length / 2 + 1)) * 4;
  const gayanePos = (scores.gayane / (WALKING_CHALLENGES.length / 2 + 1)) * 4;

  const currentChallenge = WALKING_CHALLENGES[currentIdx];

  const handleAnswer = (optionIdx: number) => {
    if (showResult) return;
    setSelectedOption(optionIdx);
    setShowResult(true);

    if (currentChallenge.options[optionIdx].correct) {
      setScores(prev => ({ ...prev, [turn]: prev[turn] + 1 }));
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    if (currentIdx < WALKING_CHALLENGES.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setTurn(prev => prev === 'gor' ? 'gayane' : 'gor');
    } else {
      setGameState('finished');
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScores({ gor: 0, gayane: 0 });
    setTurn('gor');
    setGameState('playing');
    setSelectedOption(null);
    setShowResult(false);
  };

  if (gameState === 'start') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-12">
        <div className="space-y-6">
           <motion.div 
             initial={{ scale: 0 }} 
             animate={{ scale: 1 }} 
             className="w-32 h-32 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl rotate-12"
           >
              <Trophy size={64} />
           </motion.div>
           <h2 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter text-slate-900">
             Գոռ vs Գայանե
           </h2>
           <p className="text-slate-400 font-bold italic uppercase tracking-widest text-lg">
             Walking Master 3D Challenge
           </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-3xl mx-auto flex items-center justify-center text-blue-600 font-black text-2xl">G</div>
              <h3 className="text-2xl font-black italic uppercase tracking-tight">Գոռ</h3>
           </div>
           <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 space-y-4">
              <div className="w-20 h-20 bg-rose-100 rounded-3xl mx-auto flex items-center justify-center text-rose-600 font-black text-2xl">G</div>
              <h3 className="text-2xl font-black italic uppercase tracking-tight">Գայանե</h3>
           </div>
        </div>

        <button 
          onClick={() => setGameState('playing')}
          className="bg-slate-900 text-white px-12 py-6 rounded-full font-black uppercase text-xl italic tracking-widest shadow-2xl hover:scale-105 transition-transform"
        >
          Սկսել Մրցույթը
        </button>
      </div>
    );
  }

  if (gameState === 'finished') {
    const winner = scores.gor > scores.gayane ? 'Գոռ' : scores.gayane > scores.gor ? 'Գայանե' : 'Ոչ-ոքի';
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-12">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
           <Trophy className="mx-auto text-yellow-500" size={128} />
           <h2 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter text-slate-900">
             {winner === 'Ոչ-ոքի' ? 'Ոչ-ոքի՜' : `Հաղթեց ${winner}ը`}
           </h2>
           <div className="flex justify-center gap-12 pt-8">
              <div className="text-center">
                 <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Գոռ</p>
                 <p className="text-4xl font-black italic text-blue-600">{scores.gor}</p>
              </div>
              <div className="text-center">
                 <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Գայանե</p>
                 <p className="text-4xl font-black italic text-rose-600">{scores.gayane}</p>
              </div>
           </div>
        </motion.div>
        
        <button 
          onClick={resetGame}
          className="bg-indigo-600 text-white px-12 py-6 rounded-full font-black uppercase text-xl italic tracking-widest shadow-2xl flex items-center gap-4 mx-auto"
        >
          <RefreshCw /> Նորից
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      {/* 3D Scene Wrapper */}
      <div className="h-[400px] bg-white rounded-[4rem] shadow-inner border border-slate-100 overflow-hidden relative">
         <Canvas shadows camera={{ position: [0, 5, 8], fov: 45 }}>
            <Suspense fallback={null}>
               <Scene gorPos={gorPos} gayanePos={gayanePos} />
            </Suspense>
         </Canvas>
         <div className="absolute top-6 left-6 flex gap-4 pointer-events-none">
            <div className={`bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg border-2 ${turn === 'gor' ? 'border-blue-500' : 'border-transparent'}`}>
               <p className="text-[10px] font-black uppercase text-slate-400">Գոռ</p>
               <p className="text-xl font-black italic text-blue-600">{scores.gor} pts</p>
            </div>
            <div className={`bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg border-2 ${turn === 'gayane' ? 'border-rose-500' : 'border-transparent'}`}>
               <p className="text-[10px] font-black uppercase text-slate-400">Գայանե</p>
               <p className="text-xl font-black italic text-rose-600">{scores.gayane} pts</p>
            </div>
         </div>
         <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
            <span className="bg-slate-900/10 backdrop-blur-sm px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-500 italic">
               Պտտիր մկնիկով տեսնելու համար
            </span>
         </div>
      </div>

      {/* Challenge UI */}
      <div className="space-y-8">
        <div className="text-center">
           <span className={`px-8 py-3 rounded-full font-black italic uppercase text-xs tracking-widest shadow-lg ${turn === 'gor' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
              Հերթը {turn === 'gor' ? 'Գոռինն' : 'Գայանեինն'} է
           </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white p-10 sm:p-16 rounded-[4rem] shadow-xl border border-slate-100 space-y-12 text-center relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-12 -translate-y-12 -z-10" />
             
             <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-300">Challenge {currentIdx + 1}</p>
                <h3 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                  {currentChallenge.question}
                </h3>
                <p className="text-lg font-bold italic text-slate-400">
                  {currentChallenge.translation}
                </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentChallenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={showResult}
                    className={`
                      w-full py-6 rounded-[2rem] font-black italic uppercase text-xl tracking-widest transition-all relative
                      ${!showResult 
                        ? 'bg-slate-50 text-slate-900 border-2 border-transparent hover:border-indigo-500 hover:bg-white active:scale-95' 
                        : option.correct 
                          ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-100' 
                          : selectedOption === idx 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-slate-50 text-slate-300'}
                    `}
                  >
                    {option.text}
                    {showResult && option.correct && <Check className="absolute right-4 top-1/2 -translate-y-1/2" size={24} />}
                    {showResult && selectedOption === idx && !option.correct && <X className="absolute right-4 top-1/2 -translate-y-1/2" size={24} />}
                  </button>
                ))}
             </div>

             {showResult && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pt-8 border-t border-slate-50">
                  <div className="p-6 bg-indigo-50 rounded-3xl space-y-2 max-w-2xl mx-auto">
                     <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center justify-center gap-2">
                        <HelpCircle size={14} /> Բացատրություն
                     </p>
                     <p className="text-slate-700 font-bold italic">{currentChallenge.explanation}</p>
                  </div>
                  <button 
                    onClick={nextQuestion}
                    className="bg-slate-900 text-white px-10 py-5 rounded-full font-black uppercase text-sm italic tracking-widest flex items-center gap-4 mx-auto hover:bg-indigo-600 transition-colors"
                  >
                    Հաջորդը <ArrowRight />
                  </button>
               </motion.div>
             )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
