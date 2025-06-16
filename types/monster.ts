export interface Monster {
  id: string
  name: string
  level: number
  type: string
  size: string
  alignment: string
  xp: number
  ac: number
  hp: number
  speed: number
  attackBonus: number
  damage: string
  traits: string[]
  abilities: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  skills: Record<string, number>
  saves: Record<string, number>
  resistances: string[]
  immunities: string[]
  weaknesses: string[]
  attacks: {
    name: string
    attackBonus: number
    damage: string
    effects?: string
  }[]
  specialAbilities: {
    name: string
    description: string
  }[]
  description: string
}
