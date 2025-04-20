export function getTimeOfDay(): string {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) return "morning"
  if (hour >= 12 && hour < 17) return "afternoon"
  if (hour >= 17 && hour < 21) return "evening"
  return "night"
}

export function getGreeting(): string {
  const timeOfDay = getTimeOfDay()
  
  switch (timeOfDay) {
    case "morning":
      return "Good morning"
    case "afternoon":
      return "Good afternoon"
    case "evening":
      return "Good evening"
    default:
      return "Hello"
  }
} 