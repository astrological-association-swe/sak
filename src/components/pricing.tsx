import { Button } from "./button";

const pricingTiers = [
  {
    name: "Blind bird",
    price: "1250 kr",
    features: [
      "Gäller ENDAST under Harmonlexpo",
      "25 - 26 Oktober 2025",
      "Endast 20 st biljetter",
    ],
    variant: "light" as const,
  },
  {
    name: "Early bird",
    price: "1550 kr",
    features: [
      "Gäller mellan 27 Oktober - 31 December",
      "(eller till slutsålt)",
      "Endast 30 st biljetter",
    ],
    variant: "dark" as const,
  },
  {
    name: "Fullpris",
    price: "1750 kr",
    features: ["Gäller fr o m 1/1 2026 fram till konferensen", "Last item"],
    variant: "white" as const,
  },
];

export function Pricing() {
  return (
    <section className="bg-secondary">
      <div className="max-w-5xl mx-auto px-4 pt-16">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <p className="flex flex-col text-primary text-lg text-balance sm:text-2xl sm:leading-6">
            <span>Observera att priserna nedan gäller en 2-dagarsbiljett.</span>
            <span>
              Du får alltså besöka konferensen BÅDA dagarna för den summan
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12 sm:pb-16">
        <div className="bg-primary-dark p-6 sm:p-12 max-w-5xl mx-auto">
          {/* Top row: Blind bird and Early bird side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-12 gap-6 sm:mb-12 mb-6">
            {pricingTiers.slice(0, 2).map((tier) => (
              <div
                key={tier.name}
                className={`p-6 sm:p-8 flex flex-col rounded-sm ${
                  tier.variant === "dark"
                    ? "bg-primary text-white"
                    : "bg-muted text-primary"
                }`}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center">
                  {tier.name}
                </h3>
                <p
                  className={`text-4xl sm:text-5xl font-bold mb-6 text-center ${
                    tier.variant === "dark" ? "text-white" : "text-accent"
                  }`}
                >
                  {tier.price}
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {tier.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm leading-relaxed"
                    >
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.variant === "dark" ? "primary" : "dark"}
                  className="w-full"
                >
                  Köp biljett
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom row: Fullpris full width */}
          <div className="grid grid-cols-1">
            {pricingTiers.slice(2).map((tier) => (
              <div
                key={tier.name}
                className="bg-white text-primary p-6 sm:p-8 flex flex-col rounded-md"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center">
                  {tier.name}
                </h3>
                <p className="text-4xl sm:text-5xl  font-bold mb-6 text-center text-primary">
                  {tier.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm leading-relaxed"
                    >
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="dark" className="w-full">
                  Köp biljett
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-base sm:text-lg leading-relaxed">
            Sidan är under uppbyggnad, mer information
            <br />
            kommer snart.
            <br />
            Besök gärna våra sociala medier under tiden.
          </p>
        </div>
      </div>
    </section>
  );
}
