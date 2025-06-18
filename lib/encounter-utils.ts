// XP budgets based on party level and encounter intensity

import { error } from "console";

// These values are based on Pathfinder 2e encounter building rules
const xpBudgets: Record<string, number[]> = {
  // [trivial, low, moderate, severe, extreme]
  "1": [40, 60, 80, 120, 160],
  "2": [60, 80, 100, 150, 200],
  "3": [80, 100, 120, 180, 240],
  "4": [100, 120, 140, 210, 280],
  "5": [120, 140, 160, 240, 320],
  "6": [140, 160, 180, 270, 360],
  "7": [160, 180, 200, 300, 400],
  "8": [180, 200, 225, 340, 450],
  "9": [200, 225, 250, 375, 500],
  "10": [220, 250, 275, 410, 550],
  "11": [240, 275, 300, 450, 600],
  "12": [260, 300, 350, 525, 700],
  "13": [280, 325, 375, 550, 750],
  "14": [300, 350, 400, 600, 800],
  "15": [320, 375, 425, 640, 850],
  "16": [360, 400, 450, 675, 900],
  "17": [400, 425, 475, 710, 950],
  "18": [440, 450, 500, 750, 1000],
  "19": [480, 500, 550, 825, 1100],
  "20": [520, 550, 600, 900, 1200],
}

// export function calculateXpBudget(partyLevel: number, intensity: string): number {
//   const intensityIndex =
//     {
//       trivial: 0,
//       low: 1,
//       moderate: 2,
//       severe: 3,
//       extreme: 4,
//     }[intensity.toLowerCase()] || 2 // Default to moderate if invalid intensity

//   // Default to level 1 if invalid level
//   const levelKey = partyLevel >= 1 && partyLevel <= 20 ? partyLevel.toString() : "1"

//   return xpBudgets[levelKey][intensityIndex]
// 
// Assumes to lower case was run ahead of time
export function calculateXpBudget(partyLevel: number, intensity: string, partySize: number): number {
  const intensitylower = intensity.toLowerCase()
  const difficultyMap = new Map<string, number>([
    ["trivial", 40],
    ["low", 60],
    ["moderate", 80], 
    ["severe", 120], 
    ["extreme", 160]
  ]);
  const levelAdjustmentMap = new Map<string, number>([
    ["trivial", 10],
    ["low", 20],
    ["moderate", 20], 
    ["severe", 30], 
    ["extreme", 40]
  ]);
  const base = difficultyMap.get(intensitylower)
  const adjustment = levelAdjustmentMap.get(intensitylower)
  if (base === undefined || adjustment === undefined) {
    return 0
  }
  if (difficultyMap.has(intensitylower)) {
      if (partySize === 4) {
        return base
      }
      if (partySize > 4) {
          return base + (adjustment * (partySize - 4));
        }
      if (partySize < 4 ) {
        return base - (adjustment * (4- partySize))
      }
    }
    return 0
  }


// Calculate XP value for a monster based on its level relative to party level
export function calculateMonsterXp(monsterLevel: number, partyLevel: number): number {
  const levelDifference = monsterLevel - partyLevel

  // XP values based on level difference
  const xpValues: Record<number, number> = {
    "-4": 10,
    "-3": 15,
    "-2": 20,
    "-1": 30,
    "0": 40,
    "1": 60,
    "2": 80,
    "3": 120,
    "4": 160,
  }

  // Clamp level difference to the range we have values for
  const clampedDifference = Math.max(-4, Math.min(4, levelDifference))

  return xpValues[clampedDifference.toString()] || 40 // Default to 40 if not found
}
