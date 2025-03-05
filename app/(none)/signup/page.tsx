"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Signup } from "@/lib/actions/authentication";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await Signup(new FormData(e.currentTarget));

    console.log(response);

    // TODO: Implement error handling

    setIsLoading(false);
  };

  return (
    <>
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <Image
              className="w-24"
              src="/favicon.svg"
              width={512}
              height={512}
              alt="Logo"
            />
            <h1 className="mt-4 text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-muted-foreground">
              Start your 14-day free trial, no credit card required
            </p>
          </div>
          <Card>
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">First name</Label>
                      <Input
                        name="firstname"
                        id="firstname"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Last name</Label>
                      <Input
                        name="lastname"
                        id="lastname"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practice_name">Practice name</Label>
                    <Input
                      id="practice_name"
                      name="practice_name"
                      placeholder="Acme Veterinary Clinic"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(checked) =>
                        setIsTermsChecked(checked.valueOf() as boolean)
                      }
                      checked={isTermsChecked}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col mt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !isTermsChecked}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
