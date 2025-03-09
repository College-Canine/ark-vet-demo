import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Calendar,
  Users,
  FileText,
  DollarSign,
  Package,
  PieChart,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Appointment Management",
    description:
      "Efficiently schedule and manage appointments with an intuitive calendar interface.",
  },
  {
    icon: Users,
    title: "Patient Records",
    description:
      "Maintain comprehensive digital records for all your animal patients.",
  },
  {
    icon: FileText,
    title: "Treatment Plans",
    description:
      "Create and track customized treatment plans for each patient.",
  },
  {
    icon: DollarSign,
    title: "Billing & Invoicing",
    description:
      "Streamline your billing process with automated invoicing and payment tracking.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Keep track of medications, supplies, and equipment with ease.",
  },
  {
    icon: PieChart,
    title: "Reporting & Analytics",
    description:
      "Gain insights into your practice with detailed reports and analytics.",
  },
  {
    icon: Bell,
    title: "Reminders & Notifications",
    description:
      "Automate appointment reminders and important notifications for staff and clients.",
  },
  {
    icon: CheckCircle,
    title: "Compliance Tracking",
    description:
      "Ensure adherence to veterinary regulations and best practices.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Powerful Features for Modern Veterinary Practices
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Discover how Acme Vet can streamline your workflow and improve
            patient care.
          </p>
        </div>

        <div className="mt-24">
          <div className="grid gap-16 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6">
                    {feature.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Streamlined Workflow
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Our intuitive interface and powerful features work together
                    to streamline your daily operations, allowing you to focus
                    more on patient care and less on administrative tasks.
                  </p>
                  <div className="mt-6">
                    <Button>Learn more about our workflow</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
              <div className="relative -mx-4 sm:mx-0 lg:h-full">
                <Image
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  src="/placeholder.svg?height=600&width=800"
                  alt="Acme Vet Dashboard"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-24">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Comprehensive Reporting
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Gain valuable insights into your practice with our
                    comprehensive reporting tools. Track key metrics, analyze
                    trends, and make data-driven decisions to improve your
                    veterinary clinic&apos;s performance.
                  </p>
                  <div className="mt-6">
                    <Button>Explore our reporting features</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="relative -mx-4 sm:mx-0 lg:h-full">
                <Image
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  src="/placeholder.svg?height=600&width=800"
                  alt="Acme Vet Reporting"
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
