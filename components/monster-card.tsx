"use client"

import { useState } from "react"
import type { Monster } from "@/types/monster"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Sword, Heart, Zap, Plus, Info } from "lucide-react"
import { calculateMonsterXp } from "@/lib/encounter-utils"

interface MonsterCardProps {
  monster: Monster
  onAddMonster: (monster: Monster) => void
  disabled?: boolean
  partyLevel: number
}

export function MonsterCard({ monster, onAddMonster, disabled = false, partyLevel }: MonsterCardProps) {
  const [open, setOpen] = useState(false)
  monster.xp = calculateMonsterXp(monster.level, partyLevel)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold truncate">{monster.name}</CardTitle>
        <Badge>{monster.xp} XP</Badge>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-0">
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="font-normal">
              Level {monster.level}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="font-normal">
              {monster.type}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-1 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span>AC {monster.ac}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span>HP {monster.hp}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Sword className="h-4 w-4 text-muted-foreground" />
            <span>+{monster.attackBonus} to hit</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span>{monster.damage} damage</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4 mr-1" />
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{monster.name}</span>
                <div className="flex gap-2">
                  <Badge variant="outline">Level {monster.level}</Badge>
                  <Badge>{monster.xp} XP</Badge>
                </div>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-4 p-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Type</p>
                    <p>{monster.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Size</p>
                    <p>{monster.size}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Alignment</p>
                    <p>{monster.alignment}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Traits</p>
                    <div className="flex flex-wrap gap-1">
                      {monster.traits.map((trait, index) => (
                        <Badge key={index} variant="secondary">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-muted/50 p-3 rounded-md">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">AC</span>
                    <span className="text-xl font-bold">{monster.ac}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">HP</span>
                    <span className="text-xl font-bold">{monster.hp}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Speed</span>
                    <span className="text-xl font-bold">{monster.speed} ft</span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 bg-muted/50 p-3 rounded-md">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">STR</span>
                    <span className="font-bold">{monster.abilities.str}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">DEX</span>
                    <span className="font-bold">{monster.abilities.dex}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">CON</span>
                    <span className="font-bold">{monster.abilities.con}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">INT</span>
                    <span className="font-bold">{monster.abilities.int}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">WIS</span>
                    <span className="font-bold">{monster.abilities.wis}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground">CHA</span>
                    <span className="font-bold">{monster.abilities.cha}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(monster.skills).map(([skill, bonus]) => (
                      <Badge key={skill} variant="outline">
                        {skill} +{bonus}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Saving Throws</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(monster.saves).map(([save, bonus]) => (
                      <Badge key={save} variant="outline">
                        {save} +{bonus}
                      </Badge>
                    ))}
                  </div>
                </div>

                {monster.resistances.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Resistances</p>
                    <p>{monster.resistances.join(", ")}</p>
                  </div>
                )}

                {monster.immunities.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Immunities</p>
                    <p>{monster.immunities.join(", ")}</p>
                  </div>
                )}

                {monster.weaknesses.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Weaknesses</p>
                    <p>{monster.weaknesses.join(", ")}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Attacks</p>
                  <div className="space-y-3">
                    {monster.attacks.map((attack, index) => (
                      <div key={index} className="bg-muted/30 p-2 rounded-md">
                        <p className="font-medium">{attack.name}</p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Attack:</span> +{attack.attackBonus} to hit
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Damage:</span> {attack.damage}
                        </p>
                        {attack.effects && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Effects:</span> {attack.effects}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {monster.specialAbilities.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Special Abilities</p>
                    <div className="space-y-3">
                      {monster.specialAbilities.map((ability, index) => (
                        <div key={index} className="bg-muted/30 p-2 rounded-md">
                          <p className="font-medium">{ability.name}</p>
                          <p className="text-sm">{ability.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-semibold">Description</p>
                  <p className="text-sm">{monster.description}</p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Button onClick={() => onAddMonster(monster)} disabled={disabled} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}
