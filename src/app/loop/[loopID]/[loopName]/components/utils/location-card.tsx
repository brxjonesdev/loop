import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, ExternalLink } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface Location {
  id: string
  name: string
  address: string
  notes: string
  category: string
  website: string
}

interface LocationCardProps {
  location: Location
  onEdit: () => void
  onDelete: () => void
}

export default function LocationCard({ location, onEdit, onDelete }: LocationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {location.name}
          <div>
            <Button variant="ghost" size="icon" onClick={onEdit} className="mr-2">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit location</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete location</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Address:</strong> {location.address}</p>
        {location.notes && (
          <p><strong>Notes:</strong> {location.notes}</p>
        )}
        <p>
          <strong>Category:</strong>{' '}
          <Badge variant="secondary">{location.category}</Badge>
        </p>
        {location.website && (
          <p>
            <strong>Website:</strong>{' '}
            <a
              href={location.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline inline-flex items-center"
            >
              Visit website
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  )
}

