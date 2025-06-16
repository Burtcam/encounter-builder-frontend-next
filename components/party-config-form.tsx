"use client"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

interface PartyConfigFormProps {
  partyLevel: number
  encounterIntensity: string
  onPartyLevelChange: (level: number) => void
  onEncounterIntensityChange: (intensity: string) => void
}

export function PartyConfigForm({
  partyLevel,
  encounterIntensity,
  onPartyLevelChange,
  onEncounterIntensityChange,
}: PartyConfigFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="party-level">Party Level</Label>
          <Badge variant="outline" className="text-lg font-bold">
            {partyLevel}
          </Badge>
        </div>
        <Slider
          id="party-level"
          min={1}
          max={20}
          step={1}
          value={[partyLevel]}
          onValueChange={(value) => onPartyLevelChange(value[0])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1</span>
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Encounter Intensity</Label>
        <RadioGroup
          value={encounterIntensity}
          onValueChange={onEncounterIntensityChange}
          className="grid grid-cols-2 gap-2 sm:grid-cols-5"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="trivial" id="trivial" />
            <Label htmlFor="trivial" className="cursor-pointer">
              Trivial
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low" className="cursor-pointer">
              Low
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate" className="cursor-pointer">
              Moderate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="severe" id="severe" />
            <Label htmlFor="severe" className="cursor-pointer">
              Severe
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="extreme" id="extreme" />
            <Label htmlFor="extreme" className="cursor-pointer">
              Extreme
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
