import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from 'lucide-react'

interface Reservation {
  id: string
  flightNumber: string
  airline: string
  departureTime: string
  arrivalTime: string
  confirmationNumber: string
}

interface ReservationCardProps {
  reservation: Reservation
  onEdit: () => void
  onDelete: () => void
}

export function ReservationCard({ reservation, onEdit, onDelete }: ReservationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Flight {reservation.flightNumber}
          <div>
            <Button variant="ghost" size="icon" onClick={onEdit} className="mr-2">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit reservation</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete reservation</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Airline:</strong> {reservation.airline}</p>
        <p><strong>Departure:</strong> {new Date(reservation.departureTime).toLocaleString()}</p>
        <p><strong>Arrival:</strong> {new Date(reservation.arrivalTime).toLocaleString()}</p>
        <p><strong>Confirmation:</strong> {reservation.confirmationNumber}</p>
      </CardContent>
    </Card>
  )
}

