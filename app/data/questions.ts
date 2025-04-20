export interface QuestionOption {
  icon: string;
  label: string;
  value: number | string;
}

export interface Question {
  id: string;
  text: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  type: 'mood' | 'scale' | 'number' | 'yesno';
  options: QuestionOption[];
  followUpQuestion?: {
    condition: {
      questionId: string;
      value: any;
    };
    question: Omit<Question, 'followUpQuestion'>;
  };
}

const moodOptions: QuestionOption[] = [
  { icon: 'Drained', label: 'Very Low', value: 1 },
  { icon: 'Low', label: 'Low', value: 2 },
  { icon: 'Neutral', label: 'Neutral', value: 3 },
  { icon: 'Positive', label: 'Good', value: 4 },
  { icon: 'Energised', label: 'Excellent', value: 5 }
];

const sleepQualityOptions: QuestionOption[] = [
  { icon: 'Drained', label: 'Very Poor', value: 1 },
  { icon: 'Low', label: 'Poor', value: 2 },
  { icon: 'Neutral', label: 'Fair', value: 3 },
  { icon: 'Positive', label: 'Good', value: 4 },
  { icon: 'Energised', label: 'Excellent', value: 5 }
];

const hoursOptions: QuestionOption[] = [
  { icon: 'Drained', label: '< 4 hours', value: 4 },
  { icon: 'Low', label: '4-6 hours', value: 6 },
  { icon: 'Neutral', label: '6-7 hours', value: 7 },
  { icon: 'Positive', label: '7-8 hours', value: 8 },
  { icon: 'Energised', label: '8+ hours', value: 9 }
];

const energyOptions: QuestionOption[] = [
  { icon: 'Drained', label: 'Exhausted', value: 1 },
  { icon: 'Low', label: 'Tired', value: 2 },
  { icon: 'Neutral', label: 'Okay', value: 3 },
  { icon: 'Positive', label: 'Energetic', value: 4 },
  { icon: 'Energised', label: 'Very Energetic', value: 5 }
];

const stressOptions: QuestionOption[] = [
  { icon: 'Energised', label: 'Very Relaxed', value: 'very_relaxed' },
  { icon: 'Positive', label: 'Relaxed', value: 'relaxed' },
  { icon: 'Neutral', label: 'Balanced', value: 'balanced' },
  { icon: 'Low', label: 'Stressed', value: 'stressed' },
  { icon: 'Drained', label: 'Very Stressed', value: 'very_stressed' }
];

const productivityOptions: QuestionOption[] = [
  { icon: 'Drained', label: 'Not Productive', value: 1 },
  { icon: 'Low', label: 'Slightly Productive', value: 2 },
  { icon: 'Neutral', label: 'Moderately Productive', value: 3 },
  { icon: 'Positive', label: 'Productive', value: 4 },
  { icon: 'Energised', label: 'Very Productive', value: 5 }
];

const satisfactionOptions: QuestionOption[] = [
  { icon: 'Drained', label: 'Very Unsatisfied', value: 1 },
  { icon: 'Low', label: 'Unsatisfied', value: 2 },
  { icon: 'Neutral', label: 'Neutral', value: 3 },
  { icon: 'Positive', label: 'Satisfied', value: 4 },
  { icon: 'Energised', label: 'Very Satisfied', value: 5 }
];

const yesNoOptions: QuestionOption[] = [
  { icon: 'Energised', label: 'Yes', value: 'yes' },
  { icon: 'Drained', label: 'No', value: 'no' }
];

const breakCountOptions: QuestionOption[] = [
  { icon: 'Drained', label: '1-2 breaks', value: 2 },
  { icon: 'Low', label: '3-4 breaks', value: 4 },
  { icon: 'Neutral', label: '5-6 breaks', value: 6 },
  { icon: 'Positive', label: '7-8 breaks', value: 8 },
  { icon: 'Energised', label: '8+ breaks', value: 9 }
];

const balanceOptions: QuestionOption[] = [
  { icon: 'Drained', label: 'Poor Balance', value: 1 },
  { icon: 'Low', label: 'Needs Improvement', value: 2 },
  { icon: 'Neutral', label: 'Moderate', value: 3 },
  { icon: 'Positive', label: 'Good Balance', value: 4 },
  { icon: 'Energised', label: 'Excellent Balance', value: 5 }
];

export const questions: Question[] = [
  // Morning Questions
  {
    id: 'sleep_quality',
    text: 'How well did you sleep last night?',
    timeOfDay: 'morning',
    type: 'scale',
    options: sleepQualityOptions
  },
  {
    id: 'hours_sleep',
    text: 'How many hours of sleep did you get?',
    timeOfDay: 'morning',
    type: 'number',
    options: hoursOptions
  },
  {
    id: 'morning_energy',
    text: "What's your energy level this morning?",
    timeOfDay: 'morning',
    type: 'scale',
    options: energyOptions
  },
  {
    id: 'morning_mood',
    text: 'How are you feeling?',
    timeOfDay: 'morning',
    type: 'mood',
    options: moodOptions,
    followUpQuestion: {
      condition: {
        questionId: 'morning_mood',
        value: 3 // Neutral
      },
      question: {
        id: 'morning_stress',
        text: 'Do you feel more relaxed or stressed?',
        timeOfDay: 'morning',
        type: 'mood',
        options: stressOptions
      }
    }
  },

  // Afternoon Questions
  {
    id: 'afternoon_mood',
    text: 'How are you feeling?',
    timeOfDay: 'afternoon',
    type: 'mood',
    options: moodOptions,
    followUpQuestion: {
      condition: {
        questionId: 'afternoon_mood',
        value: 3 // Neutral
      },
      question: {
        id: 'afternoon_stress',
        text: 'Do you feel more relaxed or stressed?',
        timeOfDay: 'afternoon',
        type: 'mood',
        options: stressOptions
      }
    }
  },
  {
    id: 'productivity',
    text: 'How productive do you feel today?',
    timeOfDay: 'afternoon',
    type: 'scale',
    options: productivityOptions
  },

  // Evening Questions
  {
    id: 'evening_mood',
    text: 'How are you feeling?',
    timeOfDay: 'evening',
    type: 'mood',
    options: moodOptions,
    followUpQuestion: {
      condition: {
        questionId: 'evening_mood',
        value: 3 // Neutral
      },
      question: {
        id: 'evening_stress',
        text: 'Do you feel more relaxed or stressed?',
        timeOfDay: 'evening',
        type: 'mood',
        options: stressOptions
      }
    }
  },
  {
    id: 'satisfaction',
    text: "How satisfied are you with today's work?",
    timeOfDay: 'evening',
    type: 'scale',
    options: satisfactionOptions
  },
  {
    id: 'breaks_taken',
    text: "Do you feel you've taken enough breaks today?",
    timeOfDay: 'evening',
    type: 'yesno',
    options: yesNoOptions,
    followUpQuestion: {
      condition: {
        questionId: 'breaks_taken',
        value: 'yes'
      },
      question: {
        id: 'break_count',
        text: 'How many breaks did you take?',
        timeOfDay: 'evening',
        type: 'number',
        options: breakCountOptions
      }
    }
  },
  {
    id: 'leisure_minutes',
    text: 'Did you have enough "me" time today?',
    timeOfDay: 'evening',
    type: 'yesno',
    options: yesNoOptions
  },
  {
    id: 'overall_balance',
    text: 'How would you rate your work-life balance today?',
    timeOfDay: 'evening',
    type: 'scale',
    options: balanceOptions
  }
]; 