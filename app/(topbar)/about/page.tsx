import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              About Acme Vet
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We&apos;re on a mission to transform veterinary care through
              innovative technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                At Acme Vet, we believe that veterinary professionals should
                focus on what they do best: providing exceptional care to
                animals. Our mission is to eliminate administrative burdens
                through intuitive software, enabling veterinary practices to
                operate more efficiently and deliver better patient outcomes.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                We&apos;re committed to continuous innovation, working closely
                with veterinary professionals to develop solutions that address
                real-world challenges in animal healthcare.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Veterinarian with patient"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Our Story
            </h2>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold">The Beginning</h3>
                <p className="mt-4 text-muted-foreground">
                  Acme Vet was founded in 2015 by Dr. James Wilson, a practicing
                  veterinarian who was frustrated with the outdated software
                  options available to veterinary practices. After years of
                  struggling with clunky, inefficient systems, Dr. Wilson teamed
                  up with software engineer Maria Garcia to create a solution
                  built specifically for the unique needs of veterinary
                  professionals.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Growth and Innovation</h3>
                <p className="mt-4 text-muted-foreground">
                  What started as a simple appointment scheduling tool quickly
                  evolved into a comprehensive practice management system. By
                  2018, Acme Vet was serving over 500 veterinary practices
                  across North America. Today, our platform is used by thousands
                  of veterinary professionals worldwide, from small independent
                  clinics to large multi-location hospitals.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Looking Forward</h3>
                <p className="mt-4 text-muted-foreground">
                  As we continue to grow, our focus remains on developing
                  innovative solutions that address the evolving needs of
                  veterinary practices. We&apos;re committed to staying at the
                  forefront of technology while maintaining our core values of
                  simplicity, reliability, and exceptional customer support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Meet Our Leadership Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The passionate individuals driving Acme Vet forward.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                  alt="Dr. James Wilson"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Dr. James Wilson</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c"
                  alt="Maria Garcia"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Maria Garcia</h3>
              <p className="text-muted-foreground">Co-Founder & CTO</p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1607569708758-0270aa4651bd"
                  alt="Dr. Sarah Johnson"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Dr. Sarah Johnson</h3>
              <p className="text-muted-foreground">Chief Veterinary Officer</p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a"
                  alt="Michael Chen"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Michael Chen</h3>
              <p className="text-muted-foreground">Chief Product Officer</p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1606335192038-f5a05f761b3a"
                  alt="Emily Rodriguez"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Emily Rodriguez</h3>
              <p className="text-muted-foreground">VP of Customer Success</p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1580518324671-c2f0833a3af3"
                  alt="David Kim"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">David Kim</h3>
              <p className="text-muted-foreground">VP of Sales</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
