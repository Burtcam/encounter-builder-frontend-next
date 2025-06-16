"use client"

import { useState, useEffect } from "react"
import { PartyConfigForm } from "@/components/party-config-form"
import { MonsterBrowser } from "@/components/monster-browser"
import { EncounterSummary } from "@/components/encounter-summary"
import type { Monster } from "@/types/monster"
import { calculateXpBudget } from "@/lib/encounter-utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function EncounterBuilder() {
  const [partyLevel, setPartyLevel] = useState<number>(1)
  const [encounterIntensity, setEncounterIntensity] = useState<string>("moderate")
  const [xpBudget, setXpBudget] = useState<number>(0)
  const [xpSpent, setXpSpent] = useState<number>(0)
  const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([])
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    import("@/data/monsters").then(({ monsters }) => {
      setMonsters(monsters)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setXpBudget(calculateXpBudget(partyLevel, encounterIntensity))
  }, [partyLevel, encounterIntensity])

  useEffect(() => {
    const total = selectedMonsters.reduce((sum, monster) => sum + monster.xp, 0)
    setXpSpent(total)
  }, [selectedMonsters])

  const handleAddMonster = (monster: Monster) => {
    setSelectedMonsters([...selectedMonsters, { ...monster, id: `${monster.id}-${Date.now()}` }])
  }

  const handleRemoveMonster = (monsterId: string) => {
    setSelectedMonsters(selectedMonsters.filter((m) => m.id !== monsterId))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <PartyConfigForm
            partyLevel={partyLevel}
            encounterIntensity={encounterIntensity}
            onPartyLevelChange={setPartyLevel}
            onEncounterIntensityChange={setEncounterIntensity}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="monsters" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monsters">Monster Selection</TabsTrigger>
          <TabsTrigger value="encounter">Encounter Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="monsters">
          <MonsterBrowser
            monsters={monsters}
            isLoading={isLoading}
            xpBudget={xpBudget}
            xpSpent={xpSpent}
            onAddMonster={handleAddMonster}
          />
        </TabsContent>
        <TabsContent value="encounter">
          <EncounterSummary
            selectedMonsters={selectedMonsters}
            xpBudget={xpBudget}
            xpSpent={xpSpent}
            onRemoveMonster={handleRemoveMonster}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
