"use client"

import { useState, useEffect } from "react"
import type { Monster } from "@/types/monster"
import { MonsterCard } from "@/components/monster-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MonsterBrowserProps {
  monsters: Monster[]
  isLoading: boolean
  xpBudget: number
  xpSpent: number
  onAddMonster: (monster: Monster) => void
}

export function MonsterBrowser({ monsters, isLoading, xpBudget, xpSpent, onAddMonster }: MonsterBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>([])
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    if (!monsters.length) return

    let filtered = [...monsters]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (monster) => monster.name.toLowerCase().includes(term) || monster.type.toLowerCase().includes(term),
      )
    }

    // Apply level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((monster) => monster.level === Number.parseInt(selectedLevel))
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((monster) => monster.type === selectedType)
    }

    setFilteredMonsters(filtered)
  }, [monsters, searchTerm, selectedLevel, selectedType])

  // Get unique monster types for filter
  const monsterTypes = monsters.length ? ["all", ...new Set(monsters.map((monster) => monster.type))] : ["all"]

  // Get unique monster levels for filter
  const monsterLevels = monsters.length
    ? ["all", ...new Set(monsters.map((monster) => monster.level.toString())).values()].sort((a, b) => {
        if (a === "all") return -1
        if (b === "all") return 1
        return Number.parseInt(a) - Number.parseInt(b)
      })
    : ["all"]

  const percentSpent = xpBudget > 0 ? (xpSpent / xpBudget) * 100 : 0
  const remainingXp = xpBudget - xpSpent

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <span>Monster Selection</span>
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
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search monsters..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="w-full max-w-[180px]">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filters</span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 pt-2">
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {monsterLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : `Level ${level}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {monsterTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredMonsters.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No monsters found. Try adjusting your search or filters.
            </div>
          ) : (
            <ScrollArea className="h-[500px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMonsters.map((monster) => (
                  <MonsterCard
                    key={monster.id}
                    monster={monster}
                    onAddMonster={onAddMonster}
                    disabled={xpSpent + monster.xp > xpBudget}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
