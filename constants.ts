import { Quote, QuestionStep } from './types';

export const ROMANTIC_QUOTES: Quote[] = [
  { text: "Are you sure? My heart belongs to you! ❤️", intensity: 1 },
  { text: "But we're like milk and cookies! Please reconsider? 🍪🥛", intensity: 2 },
  { text: "Every beat of my heart whispers your name... 🌹", intensity: 3 },
  { text: "I'll be the best Valentine you've ever had! Pretty please? ✨", intensity: 4 },
  { text: "Without you, my world is black and white. Add some color? 🌈", intensity: 5 },
  { text: "I'll give you all the cuddles in the world! 🧸", intensity: 6 },
  { text: "Is that your final answer? My soul is crying! 🥺", intensity: 7 },
  { text: "I'll bake you a thousand cakes! Please? 🎂", intensity: 8 },
  { text: "Just one 'Yes' and I'll be the happiest person alive! 💖", intensity: 9 },
  { text: "Pretty please with a cherry on top? 🍒", intensity: 10 }
];

export const QUESTION_STEPS: QuestionStep[] = [
  {
    id: 1,
    question: "Do you know that you're the first thing on my mind every morning?",
    image: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBicDVreXU3N3p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2omZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/v6aOjy0Qo1fIA/giphy.gif",
    yesText: "I know! 🥰",
    noText: "Really? 😮"
  },
  {
    id: 2,
    question: "And that every moment with you feels like a dream come true?",
    image: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBicDVreXU3N3p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2omZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/mlvseq9yvZhba/giphy.gif",
    yesText: "Me too! ❤️",
    noText: "No way!"
  },
  {
    id: 3,
    question: "Do you think we're the perfect match made in heaven?",
    image: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBicDVreXU3N3p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2omZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/MDJ9IbxxvDUQM/giphy.gif",
    yesText: "Absolutely! ✨",
    noText: "Maybe? 🤨"
  },
  {
    id: 4,
    question: "So... would you make me the luckiest person alive and be my Valentine?",
    image: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBicDVreXU3N3p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2omZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/9G0AdBbVrkV3O/giphy.gif",
    yesText: "YES! 💖",
    noText: "No"
  }
];

export const WEBHOOK_URL = "https://discordapp.com/api/webhooks/1471920722745102337/hhvQJWclTJyWpNMIEV1G3KQMg9FQdgeH4kYYhSHjm3RPUy44e0QSQMxbGWrGwewDJXMM"; 

export const INITIAL_GIF = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBicDVreXU3N3p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2omZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/v6aOjy0Qo1fIA/giphy.gif";
export const SUCCESS_GIF = "https://i.pinimg.com/originals/cc/05/53/cc055382eb4c16c55c5fdbfecf79be68.gif";
export const CELEBRATION_GIF = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBicDVreXU3N3p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2p6Z2o4Z2omZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PWc/3ofT5P2969WmY6K2CA/giphy.gif";
export const ROMANTIC_TUNE_URL = "https://cdn.pixabay.com/audio/2022/01/21/audio_31b582766b.mp3";