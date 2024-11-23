import * as React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MobileNav() {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col space-y-2 p-4">
        <Link href="/" passHref>
          <Button variant="ghost" className="w-full justify-start">
            Home
          </Button>
        </Link>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="interests">
            <AccordionTrigger>Interests</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                <Link href="/interests/outdoor" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    Outdoor Activities
                  </Button>
                </Link>
                <Link href="/interests/cultural" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    Cultural Experiences
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="attachments">
            <AccordionTrigger>Attachments</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                <Link href="/attachments/documents" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    Documents
                  </Button>
                </Link>
                <Link href="/attachments/photos" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    Photos
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link href="/notes" passHref>
          <Button variant="ghost" className="w-full justify-start">
            Notes
          </Button>
        </Link>
        <Link href="/budget" passHref>
          <Button variant="ghost" className="w-full justify-start">
            Budget
          </Button>
        </Link>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="itinerary">
            <AccordionTrigger>Itinerary</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <Link key={day} href={`/itinerary/${day}`} passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      Day {day}
                    </Button>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
}
