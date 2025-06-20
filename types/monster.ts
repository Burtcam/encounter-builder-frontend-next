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


// The main Monster interface
interface Monster2 {
  name: string;
  traits: Traits;
  attributes: Attributes;
  level: string;
  saves: Saves;
  aClass: AC;
  hp: HP;
  immunities: string[];
  weaknesses: DamageModifierBlock[];
  resistances: DamageModifierBlock[];
  perception: Perception;
  languages: string[];
  senses: Sense[];
  skills: Skill[];
  movements: Movement[];
  actions: Action[];
  freeActions: FreeAction[];
  reactions: Reaction[];
  passives: Passive[];
  melees: Attack[];
  ranged: Attack[];
  spellCasting: SpellCasting;
  focusPoints: number;
  inventory: Item[];
}

// DamageModifierBlock struct
interface DamageModifierBlock {
  value: number;
  type: string;
  exceptions: string[];
  double: string[];
}

// Item and its nested PriceBlock
interface Item {
  name: string;
  id: string;
  category: string;
  description: string;
  level: string;
  price: PriceBlock;
  type: string;
  traits: string[];
  rarity: string;
  size: string;
  range: string;
  reload: string;
  bulk: string;
  quantity: string;
}

interface PriceBlock {
  per: number;
  cp: number;
  sp: number;
  gp: number;
  pp: number;
}

// Perception, HP, and AC
interface Perception {
  mod: string;
  detail: string;
}

interface HP {
  detail: string;
  value: number;
}

interface AC {
  value: string;
  detail: string;
}

// Traits
interface Traits {
  rarity: string;
  size: string;
  traitList: string[];
}

// Skill and SkillSpecial
interface Skill {
  name: string;
  value: number;
  specials: SkillSpecial[];
}

interface SkillSpecial {
  value: number;
  label: string;
  predicates: string[];
}

// Attributes
interface Attributes {
  str: string;
  dex: string;
  con: string;
  wis: string;
  int: string;
  cha: string;
}

// Saves
interface Saves {
  fort: string;
  fortDetail: string;
  ref: string;
  refDetail: string;
  will: string;
  willDetail: string;
  exception: string;
}

// Passive, Reaction, Action, and FreeAction
interface Passive {
  name: string;
  text: string;
  traits: string[];
  dc: string;
  category: string;
  rarity: string;
}

interface Reaction {
  name: string;
  text: string;
  traits: string[];
  rarity: string;
  category: string;
}

interface Action {
  name: string;
  text: string;
  traits: string[];
  actions: string;
  category: string;
  rarity: string;
}

interface FreeAction {
  name: string;
  text: string;
  traits: string[];
  category: string;
  rarity: string;
}

// Movement
interface Movement {
  type: string;
  speed: string;
  notes: string;
}

// Attack and its nested types
interface Attack {
  name: string;
  type: string;
  toHitBonus: string;
  damageBlocks: DamageBlock[];
  traits: string[];
  effects: DamageEffect;
}

interface DamageBlock {
  damageRoll: string;
  damageType: string;
}

interface DamageEffect {
  customString: string;
  value: string[];
}

// SpellCasting and its variants
interface SpellCasting {
  innateSpellCasting: InnateSpellCasting[];
  preparedSpellCasting: PreparedSpellCasting[];
  spontaneousSpellCasting: SpontaneousSpellCasting[];
  focusSpellCasting: FocusSpellCasting[];
}

interface FocusSpellCasting {
  dc: number;
  mod: string;
  tradition: string;
  id: string;
  name: string;
  focusSpellList: Spell[];
  description: string;
  castLevel: string;
}

interface InnateSpellCasting {
  dc: number;
  tradition: string;
  spellUses: SpellUse[];
  mod: string;
  id: string;
  description: string;
  name: string;
}

interface PreparedSpellCasting {
  dc: number;
  tradition: string;
  slots: PreparedSlot[];
  mod: string;
  id: string;
  description: string;
}

interface SpontaneousSpellCasting {
  dc: number;
  id: string;
  tradition: string;
  spellList: Spell[];
  slots: Slot[];
  mod: string;
}

interface Slot {
  level: string;
  casts: string;
}

interface PreparedSlot {
  level: string;
  spellId: string;
  spell: Spell;
}

// Spell and related types
interface Spell {
  id: string;
  name: string;
  castLevel: string;
  spellBaseLevel: string;
  description: string;
  range: string;
  area: SpellArea;
  duration: DurationBlock;
  targets: string;
  traits: string[];
  defense: DefenseBlock;
  castTime: string;
  castRequirements: string;
  rarity: string;
  atWill: boolean;
  spellCastingBlockLocationID: string;
  uses: string;
  ritual: boolean;
  ritualData: RitualData;
}

interface RitualData {
  primaryCheck: string;
  secondaryCasters: string;
  secondaryCheck: string;
}

interface DefenseBlock {
  save: string;
  basic: boolean;
}

interface SpellUse {
  spell: Spell;
  level: number;
  uses: string;
}

interface DurationBlock {
  sustained: boolean;
  duration: string;
}

interface SpellArea {
  type: string;
  value: string;
  detail: string;
}

// Sense
interface Sense {
  name: string;
  range: string;
  acuity: string;
  detail: string;
}