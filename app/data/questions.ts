export interface QuestionOption {
  value: string;
  label: string;
  icon: string;
}

export interface Question {
  id: string;
  text: string;
  timeOfDay: string;
  type: string;
  options: QuestionOption[];
  followUpQuestion?: {
    condition: {
      value: string;
    };
    question: Question;
  };
}

const moodOptions = [
  { value: "Drained", label: "Drained", icon: "Drained" },
  { value: "Low", label: "Low", icon: "Low" },
  { value: "Neutral", label: "Neutral", icon: "Neutral" },
  { value: "Positive", label: "Positive", icon: "Positive" },
  { value: "Energised", label: "Energised", icon: "Energised" }
];

const sleepQualityOptions = [
  { value: "VeryPoor", label: "Very Poor", icon: "Drained" },
  { value: "Poor", label: "Poor", icon: "Low" },
  { value: "Fair", label: "Fair", icon: "Neutral" },
  { value: "Good", label: "Good", icon: "Positive" },
  { value: "Excellent", label: "Excellent", icon: "Energised" }
];

const hoursOptions = [
  { value: "LessThan4", label: "< 4 hours", icon: "Drained" },
  { value: "4to6", label: "4-6 hours", icon: "Low" },
  { value: "6to7", label: "6-7 hours", icon: "Neutral" },
  { value: "7to8", label: "7-8 hours", icon: "Positive" },
  { value: "8Plus", label: "8+ hours", icon: "Energised" }
];

const stressOptions = [
  { value: "VeryStressed", label: "Very Stressed", icon: "Drained" },
  { value: "Stressed", label: "Stressed", icon: "Low" },
  { value: "Neutral", label: "Balanced", icon: "Neutral" },
  { value: "Relaxed", label: "Relaxed", icon: "Positive" },
  { value: "VeryRelaxed", label: "Very Relaxed", icon: "Energised" }
];

const productivityOptions = [
  { value: "NotProductive", label: "Not Productive", icon: "Drained" },
  { value: "SlightlyProductive", label: "Slightly Productive", icon: "Low" },
  { value: "ModeratelyProductive", label: "Moderately Productive", icon: "Neutral" },
  { value: "Productive", label: "Productive", icon: "Positive" },
  { value: "VeryProductive", label: "Very Productive", icon: "Energised" }
];

const satisfactionOptions = [
  { value: "1", label: "1", icon: "Drained" },
  { value: "3", label: "3", icon: "Low" },
  { value: "5", label: "5", icon: "Neutral" },
  { value: "7", label: "7", icon: "Positive" },
  { value: "10", label: "10", icon: "Energised" }
];

const yesNoOptions = [
  { value: "Yes", label: "Yes", icon: "Positive" },
  { value: "No", label: "No", icon: "Drained" }
];

const breakCountOptions = [
  { value: "1-2", label: "1-2 breaks", icon: "Drained" },
  { value: "3-4", label: "3-4 breaks", icon: "Low" },
  { value: "5-6", label: "5-6 breaks", icon: "Neutral" },
  { value: "7-8", label: "7-8 breaks", icon: "Positive" },
  { value: "8+", label: "8+ breaks", icon: "Energised" }
];

const balanceOptions = [
  { value: "PoorBalance", label: "Poor Balance", icon: "Drained" },
  { value: "NeedsImprovement", label: "Needs Improvement", icon: "Low" },
  { value: "Moderate", label: "Moderate", icon: "Neutral" },
  { value: "GoodBalance", label: "Good Balance", icon: "Positive" },
  { value: "ExcellentBalance", label: "Excellent Balance", icon: "Energised" }
];

// Morning Questions
const morningQuestions: Question[] = [
  {
    id: "sleep_quality",
    text: "How well did you sleep last night?",
    timeOfDay: "morning",
    type: "scale",
    options: sleepQualityOptions
  },
  {
    id: "hours_sleep",
    text: "How many hours of sleep did you get?",
    timeOfDay: "morning",
    type: "scale",
    options: hoursOptions
  },
  {
    id: "morning_energy",
    text: "What's your energy level this morning?",
    timeOfDay: "morning",
    type: "scale",
    options: moodOptions
  },
  {
    id: "morning_mood",
    text: "How are you feeling?",
    timeOfDay: "morning",
    type: "mood",
    options: moodOptions,
    followUpQuestion: {
      condition: { value: "Neutral" },
      question: {
        id: "morning_stress",
        text: "Do you feel more relaxed or stressed?",
        timeOfDay: "morning",
        type: "stress",
        options: stressOptions
      }
    }
  }
];

// Afternoon Questions
const afternoonQuestions: Question[] = [
  {
    id: "afternoon_mood",
    text: "How are you feeling?",
    timeOfDay: "afternoon",
    type: "mood",
    options: moodOptions,
    followUpQuestion: {
      condition: { value: "Neutral" },
      question: {
        id: "afternoon_stress",
        text: "Do you feel more relaxed or stressed?",
        timeOfDay: "afternoon",
        type: "stress",
        options: stressOptions
      }
    }
  },
  {
    id: "productivity",
    text: "How productive do you feel today?",
    timeOfDay: "afternoon",
    type: "scale",
    options: productivityOptions
  }
];

// Evening Questions
const eveningQuestions: Question[] = [
  {
    id: "evening_mood",
    text: "How are you feeling?",
    timeOfDay: "evening",
    type: "mood",
    options: moodOptions,
    followUpQuestion: {
      condition: { value: "Neutral" },
      question: {
        id: "evening_stress",
        text: "Do you feel more relaxed or stressed?",
        timeOfDay: "evening",
        type: "stress",
        options: stressOptions
      }
    }
  },
  {
    id: "satisfaction",
    text: "How satisfied are you with today's work?",
    timeOfDay: "evening",
    type: "scale",
    options: satisfactionOptions
  },
  {
    id: "breaks_taken",
    text: "Do you feel you've taken enough breaks today?",
    timeOfDay: "evening",
    type: "yesno",
    options: yesNoOptions,
    followUpQuestion: {
      condition: { value: "Yes" },
      question: {
        id: "break_count",
        text: "How many breaks did you take?",
        timeOfDay: "evening",
        type: "number",
        options: breakCountOptions
      }
    }
  },
  {
    id: "leisure_minutes",
    text: "Did you have enough \"me\" time today?",
    timeOfDay: "evening",
    type: "yesno",
    options: yesNoOptions
  },
  {
    id: "overall_balance",
    text: "How would you rate your work-life balance today?",
    timeOfDay: "evening",
    type: "scale",
    options: balanceOptions
  }
];

export const questions: Question[] = [
  ...morningQuestions,
  ...afternoonQuestions,
  ...eveningQuestions
]; 