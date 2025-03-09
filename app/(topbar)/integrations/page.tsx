import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const integrations = [
  {
    name: "Vetstoria",
    description:
      "An online appointment scheduling platform that integrates with over 30 practice management systems, allowing clients to book appointments in real-time, reducing administrative workload.",
    website: "www.vetstoria.com",
  },
  {
    name: "IDEXX Laboratories",
    description:
      "Provides diagnostic and information technology services, integrating lab results directly into veterinary practice management systems for streamlined workflows.",
    website: "www.idexx.com",
  },
  {
    name: "Antech Diagnostics",
    description:
      "Offers comprehensive laboratory services with integration capabilities, allowing for electronic submission of lab requests and direct access to results within veterinary software.",
    website: "www.antechdiagnostics.com",
  },
  {
    name: "ALLYDVM",
    description:
      "A client communication platform that integrates with practice management software to improve client retention and compliance through automated reminders and notifications.",
    website: "www.allydvm.com",
  },
  {
    name: "PetDesk",
    description:
      "An all-in-one client communication platform offering features like reminders, confirmations, and a mobile app to enhance client engagement and reduce no-shows.",
    website: "www.petdesk.com",
  },
  {
    name: "Weave",
    description:
      "A customer communication platform that integrates with practice management software to streamline client interactions through texting, calling, and emailing from a single interface.",
    website: "www.getweave.com",
  },
  {
    name: "QuickBooks Integration",
    description:
      "Allows seamless financial management by integrating veterinary software with QuickBooks, facilitating efficient bookkeeping and accounting processes.",
    website: "www.quickbooks.intuit.com",
  },
  {
    name: "Covetrus Care Plans",
    description:
      "Enables the creation and management of wellness plans, integrating with practice management systems to enhance preventive care offerings and client retention.",
    website: "www.covetrus.com",
  },
  {
    name: "Dragon Veterinary",
    description:
      "Voice recognition software tailored for veterinarians, allowing for efficient documentation by converting speech to text within the practice management system.",
    website: "www.dragonveterinary.com",
  },
  {
    name: "Scratchpay",
    description:
      "Provides pet owners with simple and transparent payment plans, integrating with veterinary software to facilitate financial transactions and improve client satisfaction.",
    website: "www.scratchpay.com",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Powerful Integrations
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Extend the capabilities of Acme Vet with our wide range of
            integrations and partnerships.
          </p>
        </div>

        <div className="mt-24">
          <div className="grid gap-16 lg:grid-cols-2">
            {integrations.map((integration, index) => (
              <div key={index} className="flex">
                <div className="mr-4 flex-shrink-0">
                  <Image
                    className="h-16 w-16 rounded-lg object-contain"
                    src={`https://logo.clearbit.com/${integration.website}`}
                    alt={integration.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{integration.name}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {integration.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 bg-gray-50 rounded-lg">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to supercharge your practice?</span>
              <span className="block text-primary">
                Start integrating today.
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button>Get started</Button>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Button variant="outline">Learn more</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="lg:mx-auto grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 gap-24">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-4 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Seamless Integration Process
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Our team of experts will guide you through the integration
                    process, ensuring a smooth transition and minimal disruption
                    to your practice.
                  </p>
                  <div className="mt-6">
                    <ul className="space-y-4">
                      {[
                        "Personalized onboarding",
                        "Data migration assistance",
                        "24/7 technical support",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <span className="ml-3 text-base text-gray-500">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex items-center justify-center">
                <Image
                  className="w-full rounded-lg"
                  src="https://images.unsplash.com/photo-1570215171323-4ec328f3f5fa"
                  alt="Integration Process"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
