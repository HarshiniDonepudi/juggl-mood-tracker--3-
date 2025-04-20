"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { questions, Question, QuestionOption } from "./data/questions"
import { getTimeOfDay, getGreeting } from "./utils/timeUtils"

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({})
  const [isClosing, setIsClosing] = useState(false)
  const [timeBasedQuestions, setTimeBasedQuestions] = useState<Question[]>([])
  const [followUpQuestion, setFollowUpQuestion] = useState<Question | null>(null)

  useEffect(() => {
    const timeOfDay = getTimeOfDay()
    const filteredQuestions = questions.filter(q => q.timeOfDay === timeOfDay)
    setTimeBasedQuestions(filteredQuestions)
  }, [])

  const currentQuestion = followUpQuestion || timeBasedQuestions[currentQuestionIndex]
  const progress = timeBasedQuestions.length > 0 
    ? ((currentQuestionIndex + 1) / timeBasedQuestions.length) * 100 
    : 0

  const handleOptionSelect = (option: QuestionOption) => {
    if (!currentQuestion) return

    setSelectedAnswers((prev: Record<string, any>) => ({
      ...prev,
      [currentQuestion.id]: option.value
    }))

    // Check if there's a follow-up question
    if (currentQuestion.followUpQuestion && 
        currentQuestion.followUpQuestion.condition.value === option.value) {
      setFollowUpQuestion(currentQuestion.followUpQuestion.question)
    }
  }

  const handleContinue = () => {
    if (!currentQuestion) return

    if (!selectedAnswers[currentQuestion.id]) {
      alert("Please select an option to continue")
      return
    }

    // If we're on a follow-up question, clear it and move to next main question
    if (followUpQuestion) {
      setFollowUpQuestion(null)
      setCurrentQuestionIndex((prev: number) => prev + 1)
    } else {
      // If the current question has a follow-up and the condition is met, don't increment yet
      const shouldShowFollowUp = currentQuestion.followUpQuestion && 
        currentQuestion.followUpQuestion.condition.value === selectedAnswers[currentQuestion.id]

      if (!shouldShowFollowUp) {
        if (currentQuestionIndex < timeBasedQuestions.length - 1) {
          setCurrentQuestionIndex((prev: number) => prev + 1)
        } else {
          // All questions answered
          console.log('All answers:', selectedAnswers)
          alert('Thank you for completing the check-in!')
        }
      }
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      alert("Survey closed")
      setIsClosing(false)
    }, 300)
  }

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen relative overflow-hidden font-onest bg-[#eef1f1]">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src="/background.gif" alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Main content */}
      <div className="container mx-auto relative z-10">
        {/* Header with logo */}
        <div className="flex w-[94.5rem] h-[6.5rem] p-8 justify-between items-center flex-shrink-0 max-w-full mx-auto">
          <div className="w-24 transition-transform hover:scale-105">
            <img src="/logo.svg" alt="Juggl" className="w-full" />
          </div>
          <button
            className="text-[#9FA4A3] hover:text-[#277DC6] transition-colors p-2 rounded-full"
            onClick={handleClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main card */}
        <div
          className={`w-full max-w-3xl mx-auto rounded-[2.5rem] bg-gradient-to-t from-white/75 to-white/25 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.16)] backdrop-blur-[10px] p-8 relative transition-all duration-300 ${
            isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-[#585b5b] mb-1">
              <span>{currentQuestionIndex + 1} OF {timeBasedQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#4ba3f7] rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Description text */}
          <p className="text-center text-[#585b5b] mb-24">
            {getGreeting()}! Check in to reveal insights about your time, mood, and burnout risk.
          </p>

          {/* Question */}
          <h1 className="text-2xl md:text-3xl text-center text-[#383A3A] mb-12 font-[RocaBold]">
            {currentQuestion.text}
          </h1>

          {/* Options */}
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 mb-20 ${
            currentQuestion.type === 'number' ? 'max-w-2xl mx-auto overflow-y-auto max-h-64' : ''
          }`}>
            {currentQuestion.options.map((option) => (
              <MoodOption
                key={option.label}
                icon={option.icon}
                label={option.label}
                selected={selectedAnswers[currentQuestion.id] === option.value}
                onClick={() => handleOptionSelect(option)}
              />
            ))}
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              className="bg-[#277DC6] hover:bg-[#19598F] text-white font-medium py-3 px-10 rounded-full transition-colors transform hover:scale-105 active:scale-95"
              onClick={handleContinue}
            >
              {currentQuestionIndex === timeBasedQuestions.length - 1 && !followUpQuestion ? 'Finish' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MoodOptionProps {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

function MoodOption({ icon, label, selected = false, onClick }: MoodOptionProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all duration-200 transform hover:-translate-y-2 min-w-[100px] ${
        selected ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] -translate-y-2" : "hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-12 h-12">
        <MoodIcon mood={icon} />
      </div>
      <span className="text-sm text-[#585b5b] text-center whitespace-normal">{label}</span>
    </div>
  )
}

interface MoodIconProps {
  mood: string;
}

function MoodIcon({ mood }: MoodIconProps) {
  switch (mood) {
    case "Drained":
      return (
        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24.5" r="24" fill="url(#paint0_linear_1432_9721)" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 26C18.201 26 13.5 30.701 13.5 36.5C13.5 37.3284 12.8284 38 12 38C11.1716 38 10.5 37.3284 10.5 36.5C10.5 29.0442 16.5442 23 24 23C31.4558 23 37.5 29.0442 37.5 36.5C37.5 37.3284 36.8284 38 36 38C35.1716 38 34.5 37.3284 34.5 36.5C34.5 30.701 29.799 26 24 26Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1432_9721"
              x1="24"
              y1="0.5"
              x2="24"
              y2="48.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F3A07F" />
              <stop offset="1" stopColor="#E97432" />
            </linearGradient>
          </defs>
        </svg>
      )
    case "Low":
      return (
        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24.5" r="24" fill="url(#paint0_linear_1432_9726)" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 28C19.2045 28 15.1534 30.5813 13.3391 34.1759C12.9658 34.9154 12.0637 35.2124 11.3241 34.8391C10.5845 34.4658 10.2876 33.5637 10.6609 32.8241C13.0168 28.1566 18.1437 25 24 25C29.8563 25 34.9832 28.1566 37.3391 32.8241C37.7124 33.5637 37.4154 34.4658 36.6759 34.8391C35.9363 35.2124 35.0342 34.9154 34.6609 34.1759C32.8466 30.5813 28.7955 28 24 28Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1432_9726"
              x1="24"
              y1="48.5"
              x2="24"
              y2="0.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F3A07F" />
              <stop offset="1" stopColor="#F9D4C9" />
            </linearGradient>
          </defs>
        </svg>
      )
    case "Neutral":
      return (
        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24.5" r="24" fill="url(#paint0_linear_1432_9731)" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5 30.5C10.5 29.6716 11.1716 29 12 29H36C36.8284 29 37.5 29.6716 37.5 30.5C37.5 31.3284 36.8284 32 36 32H12C11.1716 32 10.5 31.3284 10.5 30.5Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1432_9731"
              x1="24"
              y1="48.5"
              x2="24"
              y2="0.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ECC736" />
              <stop offset="1" stopColor="#FEF0CF" />
            </linearGradient>
          </defs>
        </svg>
      )
    case "Positive":
      return (
        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24.5" r="24" fill="url(#paint0_linear_1432_9736)" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 32C28.7955 32 32.8466 29.4187 34.6609 25.8241C35.0342 25.0846 35.9363 24.7876 36.6759 25.1609C37.4154 25.5342 37.7124 26.4363 37.3391 27.1759C34.9832 31.8434 29.8563 35 24 35C18.1437 35 13.0167 31.8434 10.6609 27.1759C10.2876 26.4363 10.5845 25.5342 11.3241 25.1609C12.0637 24.7876 12.9658 25.0846 13.3391 25.8241C15.1534 29.4187 19.2045 32 24 32Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1432_9736"
              x1="24"
              y1="48.5"
              x2="24"
              y2="0.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8CE1AC" />
              <stop offset="1" stopColor="#D3FADF" />
            </linearGradient>
          </defs>
        </svg>
      )
    case "Energised":
      return (
        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24.5" r="24" fill="url(#paint0_linear_1432_9741)" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 35C29.799 35 34.5 30.299 34.5 24.5C34.5 23.6716 35.1716 23 36 23C36.8284 23 37.5 23.6716 37.5 24.5C37.5 31.9558 31.4558 38 24 38C16.5442 38 10.5 31.9558 10.5 24.5C10.5 23.6716 11.1716 23 12 23C12.8284 23 13.5 23.6716 13.5 24.5C13.5 30.299 18.201 35 24 35Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1432_9741"
              x1="24"
              y1="48.5"
              x2="24"
              y2="0.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#48CDEA" />
              <stop offset="1" stopColor="#BEEDFC" />
            </linearGradient>
          </defs>
        </svg>
      )
    default:
      return null
  }
}