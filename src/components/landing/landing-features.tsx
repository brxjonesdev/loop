import React from 'react';
import { Badge } from '../ui/badge';
import { Check } from 'lucide-react';

export default function LandingFeatures() {
  return (
    <div className="w-full  px-10">
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
              From organizing itineraries to group polls, Loop brings people
              together for a seamless travel planning experience.
            </p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Collaborate easily</p>
                  <p className="text-muted-foreground text-sm">
                    Bring your friends into the planning process and make
                    decisions together.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Real-time updates</p>
                  <p className="text-muted-foreground text-sm">
                    Changes happen in real time so everyone stays in the loop.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Interactive maps</p>
                  <p className="text-muted-foreground text-sm">
                    Visualize your entire trip with integrated maps for easy
                    navigation.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Expense tracking</p>
                  <p className="text-muted-foreground text-sm">
                    Keep track of your budget and manage trip costs easily.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Group Polls</p>
                  <p className="text-muted-foreground text-sm">
                    Let everyone vote on where to go, what to do, and where to
                    stay.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Custom itineraries</p>
                  <p className="text-muted-foreground text-sm">
                    Build your trip schedule with easy-to-follow itineraries.
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
