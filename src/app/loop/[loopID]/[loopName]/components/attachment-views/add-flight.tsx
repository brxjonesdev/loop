import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse, isValid } from 'date-fns';
import { Flight } from '@/stores/itinerary-store';



interface ReservationFormProps {
  reservation: Flight;
  onSave: (reservation: Flight) => void;
  onCancel: () => void;
}

export function ReservationForm({
  reservation,
  onSave,
  onCancel,
}: ReservationFormProps) {
  const [formData, setFormData] = useState<Flight>({
    ...reservation,
    departureDate: reservation.departure ? new Date(reservation.departure).toISOString() : '',
    departureTime: reservation.departure ? format(new Date(reservation.departure), 'HH:mm') : '',
    arrivalDate: reservation.arrival ? new Date(reservation.arrival).toISOString() : '',
    arrivalTime: reservation.arrival ? format(new Date(reservation.arrival), 'HH:mm') : '',
  });

  const [timeErrors, setTimeErrors] = useState({
    departureTime: '',
    arrivalTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'departureTime' || name === 'arrivalTime') {
      validateTime(name, value);
    }
  };

  const validateTime = (field: 'departureTime' | 'arrivalTime', value: string) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(value)) {
      setTimeErrors(prev => ({ ...prev, [field]: 'Invalid time format. Use HH:mm (24-hour format).' }));
    } else {
      setTimeErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDateChange = (date: Date | null, field: 'departureDate' | 'arrivalDate') => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeErrors.departureTime || timeErrors.arrivalTime) {
      return; // Don't submit if there are time errors
    }
    const updatedReservation = {
      ...formData,
      departure: formData.departureDate && formData.departureTime
        ? combineDateTime(new Date(formData.departureDate), formData.departureTime)
        : '',
      arrival: formData.arrivalDate && formData.arrivalTime
        ? combineDateTime(new Date(formData.arrivalDate), formData.arrivalTime)
        : '',
    };
    console.log(updatedReservation);
    onSave(updatedReservation);
  };

  const combineDateTime = (date: Date, time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes);
    return combinedDate.toISOString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {reservation.id ? 'Edit Reservation' : 'New Reservation'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <section className="space-y-4">
          <Label>Import Flight from URL</Label>
          <div className="flex gap-4">
            <Input placeholder="Feature Coming Soon" disabled />
            <Button variant="outline" disabled>
              Import
            </Button>
          </div>
        </section>
      </CardContent>
      <Separator />
      <form onSubmit={handleSubmit}>
        <CardContent className="gap-4 grid md:grid-cols-2 pt-3">
          <div className="space-y-2">
            <Label htmlFor="flightNumber">Flight Number</Label>
            <Input
              id="flightNumber"
              name="number"
              defaultValue={"222"}
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="airline">Airline</Label>
            <Input
              id="airline"
              name="airline"
              defaultValue={"United Airlines"}
              value={formData.airline}
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
          <div className="space-y-2 w-full flex  justify-between items-center">
            <Label htmlFor="departureDate">Departure Date</Label>
            <DatePicker
              id="departureDate"
              selected={formData.departureDate ? new Date(formData.departureDate) : null}
              onChange={(date) => handleDateChange(date, 'departureDate')}
              dateFormat="MMMM d, yyyy"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="departureTime">Departure Time (HH:mm)</Label>
            <Input
              id="departureTime"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              placeholder="14:30"
              required
            />
            {timeErrors.departureTime && (
              <p className="text-sm text-red-500">{timeErrors.departureTime}</p>
            )}
          </div>
          </div>

          <div className='space-y-2 flex flex-col w-full'>
          <div className="space-y-2 w-full flex  justify-between items-center" >
            <Label htmlFor="arrivalDate">Arrival Date</Label>
            <DatePicker
              id="arrivalDate"
              selected={formData.arrivalDate ? new Date(formData.arrivalDate) : null}
              onChange={(date) => handleDateChange(date, 'arrivalDate')}
              dateFormat="MMMM d, yyyy"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="arrivalTime">Arrival Time (HH:mm)</Label>
            <Input
              id="arrivalTime"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              placeholder="16:45"
              required
            />
            {timeErrors.arrivalTime && (
              <p className="text-sm text-red-500">{timeErrors.arrivalTime}</p>
            )}
          </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmationNumber">Confirmation Number</Label>
            <Input
              id="confirmationNumber"
              name="confirmation"
              defaultValue={"222"}
              value={formData.confirmation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Flight Cost</Label>
            <Input
              id="cost"
              defaultValue={"111110.00"}
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="space-x-4 flex justify-end">
          <Button type="submit" disabled={!!timeErrors.departureTime || !!timeErrors.arrivalTime}>Save</Button>
          <Button onClick={onCancel} variant={'outline'}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

