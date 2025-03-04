import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Choose the plan that's right for your practice. All plans include
              a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Starter Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>
                  For small practices just getting started
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Up to 2 veterinarians</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Appointment scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Basic patient records</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Email reminders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Standard support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup" className="w-full">
                  <Button className="w-full">Start free trial</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Professional Plan */}
            <Card className="flex flex-col border-primary">
              <CardHeader>
                <div className="mb-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground w-fit">
                  Most Popular
                </div>
                <CardTitle>Professional</CardTitle>
                <CardDescription>
                  For growing practices with more needs
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Up to 5 veterinarians</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>All Starter features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Advanced medical records</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Inventory management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>SMS reminders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup" className="w-full">
                  <Button className="w-full">Start free trial</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>
                  For large practices with multiple locations
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$399</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Unlimited veterinarians</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Multi-location support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>24/7 premium support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup" className="w-full">
                  <Button className="w-full">Start free trial</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-center">
              Frequently Asked Questions
            </h2>
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-xl font-semibold">
                  Can I switch plans later?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes to your billing will be prorated.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Is there a setup fee?</h3>
                <p className="mt-2 text-muted-foreground">
                  No, there are no setup fees. You only pay the monthly
                  subscription fee.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  Do you offer discounts for annual billing?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, you can save 10% by choosing annual billing instead of
                  monthly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  How secure is my data?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We take security seriously. All data is encrypted at rest and
                  in transit, and we comply with industry standards for data
                  protection.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  Can I import data from my current system?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, we offer data migration services to help you transition
                  smoothly from your current system to Acme Vet.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  What kind of support do you offer?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  All plans include email support. Professional plans include
                  priority support with faster response times, while Enterprise
                  plans include 24/7 phone and email support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our team is here to help you find the right plan for your
              practice.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="#">
                <Button variant="outline" size="lg">
                  Contact sales
                </Button>
              </Link>
              <Link href="#">
                <Button size="lg">Schedule a demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
