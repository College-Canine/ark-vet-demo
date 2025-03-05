"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia } from "../auth";
// import {
//   CleanBirthdate,
//   CleanEmail,
//   CleanFirstname,
//   CleanLastname,
//   VerifyBirthdate,
//   VerifyEmail,
//   VerifyFirstname,
//   VerifyLastname,
//   VerifyPassword,
// } from "./forms";

export async function Login(formData: FormData) {
  const _email = formData.get("email");
  const _password = formData.get("password");

  if (_email == null) return { error: "No Email Provided." };
  if (_password == null) return { error: "No Password Provided." };

  const email = _email.toString();
  const password = _password.toString();

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email.toLowerCase().toString(),
    },
  });
  if (!existingUser) {
    // Hash in order to stop timing attacks
    await new Argon2id().hash(password);

    return {
      error: "Incorrect username or password.",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashedPassword || "",
    password
  );
  if (!validPassword) {
    console.log("Incorrect Username or Password");
    return {
      error: "Incorrect username or password.",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const cookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);

  redirect("/dashboard");

  return { success: true };
}

export async function Signup(formData: FormData) {
  console.log(formData);

  for (const pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const _firstname = formData.get("firstname");
  const _lastname = formData.get("lastname");
  const _email = formData.get("email");
  const _password = formData.get("password");
  const _practiceName = formData.get("practice_name");

  if (_firstname == null) return { error: "No First Name Provided." };
  if (_lastname == null) return { error: "No Last Name Provided." };
  if (_email == null) return { error: "No Email Provided." };
  if (_password == null) return { error: "No Password Provided." };
  if (_practiceName == null) return { error: "No Practice Name Provided." };

  const firstname = _firstname.toString();
  const lastname = _lastname.toString();
  const email = _email.toString();
  const password = _password.toString();
  const practiceName = _practiceName.toString();

  const hashedPassword = await new Argon2id().hash(password);

  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      hashedPassword,
      role: "ADMIN",
      clinic: {
        create: {
          name: practiceName,
        },
      },
    },
  });

  const session = await lucia.createSession(user.id, {});
  const cookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);

  redirect("/dashboard");

  return {};
}
