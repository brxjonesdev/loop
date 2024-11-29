import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from 'lucide-react'
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

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

interface LodgingCardProps {
  lodging: Lodging
  onEdit: () => void
  onDelete: () => void
}

export function LodgingCard({ lodging, onEdit, onDelete }: LodgingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {lodging.name}
          <div>
            <Button variant="ghost" size="icon" onClick={onEdit} className="mr-2">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit lodging</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete lodging</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Type:</strong> {lodging.type}</p>
        <p><strong>Address:</strong> {lodging.address}</p>
        <p><strong>Check In:</strong> {format(new Date(lodging.checkIn), "PPP")}</p>
        <p><strong>Check Out:</strong> {format(new Date(lodging.checkOut), "PPP")}</p>        
        <p><strong>Cost:</strong> ${lodging.cost.toFixed(2)}</p>
        <p><strong>Booking Reference:</strong> {lodging.bookingReference}</p>
      </CardContent>
    </Card>
  )
}

