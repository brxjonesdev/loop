'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Lodging {
  id: string
  name: string
  type: string
  address: string
  checkIn: Date
  checkOut: Date
  guestCount: number
  amenities: string[]
  cost: number
  bookingReference: string
}

interface LodgingFormProps {
  lodging: Lodging
  onSave: (lodging: Lodging) => void
onCancel: () => void
}

const lodgingTypes = [
  "Hotel",
  "Motel",
  "Hostel",
  "Resort",
  "Inn",
  "Guest house",
  "Bed and breakfast",
  "Vacation rental",
  "Apartment",
  "House",
  "Cabin",
  "Villa",
  "Condo",
  "Cottage",
  "Bungalow",
  "Other"
]

const amenitiesList = [
  "Wi-Fi",
  "Kitchen",
  "Washer",
  "Dryer",
  "Air conditioning",
  "Heating",
  "TV",
  "Pool",
  "Hot tub",
  "Free parking"
]

export function LodgingForm({ lodging, onSave, onCancel }: LodgingFormProps) {
  const [formData, setFormData] = useState(lodging)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (date: Date | undefined, field: 'checkIn' | 'checkOut') => {
    if (date) {
      setFormData({ ...formData, [field]: date })
    }
  }

  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value })
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] })
    } else {
      setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lodging.id ? 'Edit Lodging' : 'New Lodging'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Lodging Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Lodging Type</Label>
            <Select onValueChange={handleTypeChange} value={formData.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select lodging type" />
              </SelectTrigger>
              <SelectContent className='font-mono'>
                {lodgingTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkIn">Check In</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.checkIn ? format(formData.checkIn, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.checkIn}
                  onSelect={(date) => handleDateChange(date, 'checkIn')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkOut">Check Out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.checkOut ? format(formData.checkOut, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.checkOut}
                  onSelect={(date) => handleDateChange(date, 'checkOut')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              name="cost"
              type="number"
              min="0"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bookingReference">Booking Reference</Label>
            <Input
              id="bookingReference"
              name="bookingReference"
              value={formData.bookingReference}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className='flex w-full justify-end gap-4'>
          <Button type="submit">Save</Button>
          <Button
            onClick={onCancel}
            variant={"outline"}
            >
            Cancel
            </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

