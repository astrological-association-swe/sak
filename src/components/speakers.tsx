import { Star } from "lucide-react";
import { Button } from "./button";

const speakers = [
  {
    name: "Maurice",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
  },
  {
    name: "Tanja",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
  },
  {
    name: "Thomas",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
  },
];

export function Speakers() {
  return (
    <section
      id="forelesare"
      className="py-12 pb-0 sm:pb-0 sm:py-24 bg-secondary"
    >
      <div className="mx-auto px-4 sm:px-4 max-w-5xl">
        <h2 className="text-4xl font-semibold text-primary mb-8 sm:mb-12 text-center sm:text-left">
          Föreläsare
        </h2>

        <div className="flex flex-col mb-12 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="bg-muted rounded-sm p-6 flex flex-col sm:flex-row sm:items-start gap-6"
            >
              <div className="w-full sm:w-32 h-32 sm:h-32 bg-white/40 rounded flex-shrink-0 mx-auto sm:mx-0" />

              <div className="flex flex-col flex-grow">
                <h3 className="text-2xl text-accent font-semibold mb-3 text-center sm:text-left">
                  {speaker.name}
                </h3>
                <p className="text-sm text-primary mb-6 leading-relaxed flex-grow text-center sm:text-left">
                  {speaker.description}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-fit mx-auto sm:mx-0"
                >
                  Läs mer
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center sm:justify-start">
          <Button variant="primary" size="lg">
            <Star className="h-4 w-4 sm:h-5 sm:w-5" />
            Köp biljett
          </Button>
        </div>
      </div>
    </section>
  );
}
