import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Calendar,
  Users,
  FileText,
  Clock,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Modern software for modern veterinary practices
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Streamline your workflow, improve patient care, and grow your
                practice with our all-in-one cloud solution.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg">Get started</Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg">
                    View pricing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://images.unsplash.com/photo-1632236542159-809925d85fc0"
                alt="Veterinarian using Acme Vet software"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to run your practice
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our comprehensive platform helps you manage appointments, patient
              records, billing, and more.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Appointment Management</CardTitle>
                <CardDescription>
                  Easily schedule, reschedule, and manage appointments with a
                  user-friendly calendar interface.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">
                  Electronic Medical Records
                </CardTitle>
                <CardDescription>
                  Create, store, and access patient records securely from
                  anywhere, anytime.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Client Communication</CardTitle>
                <CardDescription>
                  Send appointment reminders, follow-ups, and important updates
                  to pet owners automatically.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Time-Saving Automation</CardTitle>
                <CardDescription>
                  Automate routine tasks like appointment reminders,
                  prescription refills, and billing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Secure and Compliant</CardTitle>
                <CardDescription>
                  Rest easy knowing your data is protected with enterprise-grade
                  security and compliance measures.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">Comprehensive Reporting</CardTitle>
                <CardDescription>
                  Gain insights into your practice with detailed reports on
                  appointments, revenue, and more.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Trusted by veterinary practices worldwide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what our customers have to say about Acme Vet.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  &quot;Acme Vet has transformed our practice. We&apos;re more
                  efficient, our clients are happier, and our team loves using
                  it.&quot;
                </p>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-4">
                    <p className="font-medium">Dr. Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Pawsome Veterinary Clinic
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  &quot;The appointment management system alone has saved us
                  countless hours. The entire platform is intuitive and
                  powerful.&quot;
                </p>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-4">
                    <p className="font-medium">Dr. Michael Chen</p>
                    <p className="text-sm text-muted-foreground">
                      City Pets Veterinary Hospital
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  &quot;Switching to Acme Vet was the best decision we made. Our
                  practice has grown 30% since implementing their system.&quot;
                </p>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-4">
                    <p className="font-medium">Dr. Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">
                      Healthy Paws Veterinary Care
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-primary p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
                Ready to transform your veterinary practice?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90">
                Join thousands of veterinary professionals who trust Acme Vet to
                run their practices.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" variant="secondary">
                    Start your free trial
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    View pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
