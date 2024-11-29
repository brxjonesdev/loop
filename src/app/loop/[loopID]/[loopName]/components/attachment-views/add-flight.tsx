import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { on } from 'events'

interface Reservation {
  id: string
  flightNumber: string
  airline: string
  departureTime: string
  arrivalTime: string
  confirmationNumber: string
}

interface ReservationFormProps {
  reservation: Reservation
  onSave: (reservation: Reservation) => void
  onCancel: () => void
}

export function ReservationForm({ reservation, onSave, onCancel }: ReservationFormProps) {
  const [formData, setFormData] = useState(reservation)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{reservation.id ? 'Edit Reservation' : 'New Reservation'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="gap-4 grid md:grid-cols-2 ">
          <div className="space-y-2">
            <Label htmlFor="flightNumber">Flight Number</Label>
            <Input
              id="flightNumber"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="airline">Airline</Label>
            <Input
              id="airline"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureTime">Departure Time</Label>
            <Input
              id="departureTime"
              name="departureTime"
              type="datetime-local"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <Input
              id="arrivalTime"
              name="arrivalTime"
              type="datetime-local"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmationNumber">Confirmation Number</Label>
            <Input
              id="confirmationNumber"
              name="confirmationNumber"
              value={formData.confirmationNumber}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className='space-x-4 flex justify-end'>
          <Button type="submit">Save</Button>
          <Button  
          onClick={onCancel}
          variant={"outline"}
          >Cancel</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

