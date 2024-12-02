import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Flight } from '@/stores/itinerary-store';
import { formatDate } from '@/utils/converts';
import { Edit, Trash2 } from 'lucide-react';



interface ReservationCardProps {
  reservation: Flight;
  onEdit: () => void;
  onDelete: () => void;
}

export function ReservationCard({
  reservation,
  onEdit,
  onDelete,
}: ReservationCardProps) {

  if (!reservation) {
    return null;
  }



  // {
  //   "id": "SH6XYaVTv6sDQ7q9pTjNG",
  //   "number": "UN 123",
  //   "airline": "United Airlines",
  //   "departure": "",
  //   "arrival": "2024-12-07T20:48:00.000Z",
  //   "confirmation": "222",
  //   "departureDate": "2024-12-04T05:00:00.000Z",
  //   "departureTime": "",
  //   "arrivalDate": "2024-12-07T05:00:00.000Z",
  //   "arrivalTime": "15:48",
  //   "cost": "0.00",
  //   "loop_id": "loop_rSSieOcgBETQ",
  //   "itinerary_date_id": null
  // }
console.log(reservation.number, "in card")
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Flight {reservation.number}
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="mr-2"
            >
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
        <p>
          <strong>Airline:</strong> {reservation.airline}
        </p>
        <p>
          <strong>Departure:</strong>{' '}
          {formatDate(reservation.departureDate)}
        </p>
        <p>
          <strong>Arrival:</strong>{' '}
          {formatDate(reservation.arrivalDate)}
        </p>
        <p>
          <strong>Confirmation:</strong> {reservation.confirmation}
        </p>
      </CardContent>
    </Card>
  );
}
