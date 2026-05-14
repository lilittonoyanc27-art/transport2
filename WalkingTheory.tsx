import React from 'react';
import { motion } from 'motion/react';
import { WALKING_VERBS } from './walkingData';
import { Info, Table, Footprints, Trees, Activity } from 'lucide-react';

export default function WalkingTheory() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="border-l-8 border-indigo-500 pl-6">
          <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-slate-900">
            Caminar / Pasear / Andar
          </h2>
          <p className="text-slate-400 font-bold italic uppercase text-xs tracking-widest mt-2">
            Ի՞նչ տարբերություն կա այս բայերի միջև
          </p>
        </div>

        <div className="grid gap-8">
          {/* Caminar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4"
          >
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <Footprints size={24} />
               </div>
               <h3 className="text-2xl font-black italic uppercase tracking-tight">1. Caminar</h3>
            </div>
            <p className="text-slate-600 font-bold italic leading-relaxed">
              <span className="text-slate-900 border-b-2 border-blue-200">Քայլել / ոտքով գնալ:</span> Սա սովորական ֆիզիկական գործողությունն է՝ քայլել ոտքերով:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl space-y-2 border-l-4 border-blue-500">
               <p className="font-bold text-lg italic text-slate-900">Camino al trabajo.</p>
               <p className="text-slate-500 text-sm italic font-bold">Ես ոտքով գնում եմ աշխատանքի։</p>
            </div>
          </motion.div>

          {/* Pasear */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4"
          >
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Trees size={24} />
               </div>
               <h3 className="text-2xl font-black italic uppercase tracking-tight">2. Pasear</h3>
            </div>
            <p className="text-slate-600 font-bold italic leading-relaxed">
              <span className="text-slate-900 border-b-2 border-emerald-200">Զբոսնել:</span> Քայլել հաճույքի, հանգստի կամ թարմ օդի համար:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl space-y-2 border-l-4 border-emerald-500">
               <p className="font-bold text-lg italic text-slate-900">Paseo por el parque.</p>
               <p className="text-slate-500 text-sm italic font-bold">Ես զբոսնում եմ այգում։</p>
            </div>
          </motion.div>

          {/* Andar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4"
          >
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <Activity size={24} />
               </div>
               <h3 className="text-2xl font-black italic uppercase tracking-tight">3. Andar</h3>
            </div>
            <p className="text-slate-600 font-bold italic leading-relaxed">
              <span className="text-slate-900 border-b-2 border-amber-200">Քայլել / գնալ ոտքով / շարժվել:</span> Ավելի խոսակցական և լայն բառ է: Կարող է նաև նշանակել «աշխատել / գործել»:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl space-y-2 border-l-4 border-amber-500">
               <p className="font-bold text-lg italic text-slate-900">Voy andando.</p>
               <p className="text-slate-500 text-sm italic font-bold">Ես գնում եմ ոտքով։</p>
               <div className="pt-2">
                 <p className="font-bold text-lg italic text-slate-900">El reloj no anda.</p>
                 <p className="text-slate-500 text-sm italic font-bold">Ժամացույցը չի աշխատում (չի շարժվում):</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Summary Box */}
      <section className="bg-slate-900 text-white p-10 sm:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -translate-y-12 translate-x-12" />
        <div className="relative z-10 space-y-8">
           <h3 className="text-3xl font-black italic uppercase tracking-tighter text-indigo-400 flex items-center gap-4">
             🧠 Շատ կարճ կանոն
           </h3>
           <div className="grid gap-6">
              <div className="flex items-start gap-4">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
                 <p className="text-lg italic font-bold">Caminar — <span className="text-slate-400">ուղղակի քայլել (ֆիզիկապես):</span></p>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                 <p className="text-lg italic font-bold">Pasear — <span className="text-slate-400">զբոսնել հաճույքի համար:</span></p>
              </div>
              <div className="flex items-start gap-4">
                 <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                 <p className="text-lg italic font-bold">Andar — <span className="text-slate-400">գնալ ոտքով / շարժվել (խոսակցական):</span></p>
              </div>
           </div>
        </div>
      </section>

      {/* Conjugation Tables */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
           <Table className="mx-auto text-indigo-500" size={32} />
           <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Բայերի Խոնարհումը</h3>
           <p className="text-slate-400 font-bold italic uppercase text-xs tracking-widest">Presente de Indicativo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {WALKING_VERBS.map(verb => (
             <motion.div 
               key={verb.verb}
               whileHover={{ scale: 1.02 }}
               className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden"
             >
                <div className="bg-slate-900 px-8 py-6 flex flex-col gap-1 text-white">
                   <h4 className="text-2xl font-black italic uppercase tracking-tighter">{verb.verb}</h4>
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{verb.translation}</span>
                </div>
                <div className="p-8 space-y-4">
                   {verb.conjugations.map(conj => (
                     <div key={conj.person} className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <span className="text-slate-400 font-black italic uppercase text-[10px] tracking-widest">{conj.person}</span>
                        <span className="text-lg font-black italic text-slate-900">{conj.word}</span>
                     </div>
                   ))}
                </div>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
}
