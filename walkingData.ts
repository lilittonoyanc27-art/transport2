export interface Conjugation {
  person: string;
  word: string;
}

export interface VerbInfo {
  verb: string;
  translation: string;
  conjugations: Conjugation[];
}

export interface WalkingChallenge {
  question: string;
  translation: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
  type: 'caminar' | 'pasear' | 'andar';
}

export const WALKING_VERBS: VerbInfo[] = [
  {
    verb: "Caminar",
    translation: "Քայլել / Ոտքով գնալ",
    conjugations: [
      { person: "Yo", word: "camino" },
      { person: "Tú", word: "caminas" },
      { person: "Él/Ella/Ud.", word: "camina" },
      { person: "Nosotros", word: "caminamos" },
      { person: "Vosotros", word: "camináis" },
      { person: "Ellos/Ellas/Uds.", word: "caminan" }
    ]
  },
  {
    verb: "Pasear",
    translation: "Զբոսնել",
    conjugations: [
      { person: "Yo", word: "paseo" },
      { person: "Tú", word: "paseas" },
      { person: "Él/Ella/Ud.", word: "pasea" },
      { person: "Nosotros", word: "paseamos" },
      { person: "Vosotros", word: "paseáis" },
      { person: "Ellos/Ellas/Uds.", word: "pasean" }
    ]
  },
  {
    verb: "Andar",
    translation: "Քայլել / Շարժվել",
    conjugations: [
      { person: "Yo", word: "ando" },
      { person: "Tú", word: "andas" },
      { person: "Él/Ella/Ud.", word: "anda" },
      { person: "Nosotros", word: "andamos" },
      { person: "Vosotros", word: "andáis" },
      { person: "Ellos/Ellas/Uds.", word: "andan" }
    ]
  }
];

export const WALKING_CHALLENGES: WalkingChallenge[] = [
  {
    question: "Cada mañana, ___ por el parque para relajarme.",
    translation: "Ամեն առավոտ ես զբոսնում եմ այգով հանգստանալու համար:",
    options: [
      { text: "paseo", correct: true },
      { text: "ando", correct: false },
      { text: "camino", correct: false }
    ],
    explanation: "Pasear օգտագործվում է հաճույքի և հանգստի համար զբոսնելիս:",
    type: 'pasear'
  },
  {
    question: "Yo ___ al trabajo porque está muy cerca.",
    translation: "Ես ոտքով եմ գնում աշխատանքի, որովհետև այն շատ մոտ է:",
    options: [
      { text: "camino", correct: true },
      { text: "paseo", correct: false },
      { text: "anda", correct: false }
    ],
    explanation: "Caminar-ը ֆիզիկական գործողությունն է՝ քայլելը կամ ոտքով տեղ հասնելը:",
    type: 'caminar'
  },
  {
    question: "Mi reloj no ___ bien.",
    translation: "Իմ ժամացույցը լավ չի աշխատում (չի շարժվում):",
    options: [
      { text: "anda", correct: true },
      { text: "camina", correct: false },
      { text: "pasea", correct: false }
    ],
    explanation: "Andar-ը կարող է նշանակել նաև «աշխատել» կամ «շարժվել» (օբյեկտների դեպքում):",
    type: 'andar'
  },
  {
    question: "¿Quieres ___ por la playa esta tarde?",
    translation: "Ուզո՞ւմ ես այսօր երեկոյան զբոսնել լողափով:",
    options: [
      { text: "pasear", correct: true },
      { text: "caminar", correct: false },
      { text: "andando", correct: false }
    ],
    explanation: "Լողափով զբոսնելը սովորաբար հաճույքի համար է, ուստի pasear:",
    type: 'pasear'
  },
  {
    question: "Nosotros ___ rápido para no llegar tarde.",
    translation: "Մենք արագ ենք քայլում, որպեսզի չուշանանք:",
    options: [
      { text: "caminamos", correct: true },
      { text: "paseamos", correct: false },
      { text: "andamos", correct: false }
    ],
    explanation: "Caminar-ը կիրառվում է որպես տեղաշարժվելու միջոց (քայլել):",
    type: 'caminar'
  }
];
