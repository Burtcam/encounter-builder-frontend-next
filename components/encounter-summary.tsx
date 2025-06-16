"use client"

import type { Monster } from "@/types/monster"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Trash2, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface EncounterSummaryProps {
  selectedMonsters: Monster[]
  xpBudget: number
  xpSpent: number
  onRemoveMonster: (monsterId: string) => void
}

export function EncounterSummary({ selectedMonsters, xpBudget, xpSpent, onRemoveMonster }: EncounterSummaryProps) {
  const percentSpent = xpBudget > 0 ? (xpSpent / xpBudget) * 100 : 0
  const remainingXp = xpBudget - xpSpent

  // Group monsters by name for a cleaner display
  const groupedMonsters = selectedMonsters.reduce(
    (acc, monster) => {
      const existingGroup = acc.find((group) => group.name === monster.name)
      if (existingGroup) {
        existingGroup.count += 1
        existingGroup.ids.push(monster.id)
        existingGroup.totalXp += monster.xp
      } else {
        acc.push({
          name: monster.name,
          level: monster.level,
          type: monster.type,
          xp: monster.xp,
          count: 1,
          ids: [monster.id],
          totalXp: monster.xp,
        })
      }
      return acc
    },
    [] as { name: string; level: number; type: string; xp: number; count: number; ids: string[]; totalXp: number }[],
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <span>Encounter Summary</span>
          <div className="flex items-center gap-2">
            <Badge variant={remainingXp >= 0 ? "outline" : "destructive"}>
              {remainingXp >= 0 ? `${remainingXp} XP remaining` : `${Math.abs(remainingXp)} XP over budget`}
            </Badge>
            <Badge variant="secondary">
              {xpSpent} / {xpBudget} XP
            </Badge>
          </div>
        </CardTitle>
        <Progress
          value={percentSpent > 100 ? 100 : percentSpent}
          className="h-2"
          color={percentSpent > 100 ? "bg-destructive" : undefined}
        />
      </CardHeader>
      <CardContent>
        {selectedMonsters.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No monsters added to the encounter yet.</div>
        ) : (
          <div className="space-y-4">
            {percentSpent > 100 ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This encounter exceeds the XP budget and may be too challenging for your party.
                </AlertDescription>
              </Alert>
            ) : percentSpent > 0 ? (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Encounter Ready</AlertTitle>
                <AlertDescription>Your encounter is within the XP budget.</AlertDescription>
              </Alert>
            ) : null}

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {groupedMonsters.map((group) => (
                  <Card key={group.name} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            {group.name}
                            {group.count > 1 && (
                              <Badge variant="secondary" className="font-normal">
                                ×{group.count}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground flex gap-2 mt-1">
                            <Badge variant="outline" className="font-normal">
                              Level {group.level}
                            </Badge>
                            <Badge variant="secondary" className="font-normal">
                              {group.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge>{group.totalXp} XP</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveMonster(group.ids[group.ids.length - 1])}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
