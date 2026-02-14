
export interface Quote {
  text: string;
  intensity: number;
}

export interface QuestionStep {
  id: number;
  question: string;
  image: string;
  yesText: string;
  noText: string;
}

export enum AppState {
  START = 'START',
  QUESTIONS = 'QUESTIONS',
  ACCEPTED = 'ACCEPTED'
}

export interface UserSession {
  id: string;
  startTime: number;
  lastActive: number;
  endTime?: number;
  noClicks: number;
  yesClicks: number;
  currentStep: number;
  browserInfo: string;
  platform: string;
  isAccepted: boolean;
  shareCount: number;
  quotesSeen: string[];
  referredBy?: string; // Tracks who forwarded the link
}
