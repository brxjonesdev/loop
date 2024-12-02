import React from 'react';
import { Badge } from '../ui/badge';
import { Check } from 'lucide-react';

export default function LandingFeatures() {
  return (
    <div className="w-full px-10">
      <div className="container mx-auto">
        <div className="flex gap-4 py-20 lg:py-20 flex-col items-start">
          <div>
            <Badge>Features</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              What Loop can do for you!
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              Organize and collaborate on your trip planning with ease using
              Loop's simple, intuitive features.
            </p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Collaborate with friends</p>
                  <p className="text-muted-foreground text-sm">
                    Bring your group into the planning process and make
                    decisions together.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Real-time updates</p>
                  <p className="text-muted-foreground text-sm">
                    Keep everyone in sync with real-time updates to your trip
                    details.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Custom itineraries</p>
                  <p className="text-muted-foreground text-sm">
                    Build personalized itineraries for your trip, including
                    locations and activities.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Budget tracking</p>
                  <p className="text-muted-foreground text-sm">
                    Track and manage your expenses easily with budget management
                    tools.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Attach documents</p>
                  <p className="text-muted-foreground text-sm">
                    Upload and organize important trip documents such as
                    reservations and itineraries.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Privacy settings</p>
                  <p className="text-muted-foreground text-sm">
                    Choose whether your trip is private or shareable with a
                    link.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
