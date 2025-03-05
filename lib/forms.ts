export interface ErrorMessage {
  error: string;
}

type Error = ErrorMessage | null;

export function ContainsExpletive(text: string): Error {
  const hiddenExpletives = [
    "faggot",
    "asshole",
    "arsehole",
    "retard",
    "nigger",
    "bitch",
    "fuck",
    "pussy",
  ];
  const shownExpletives = ["ass", "arse", "fag", "nig"];

  for (const expletive of hiddenExpletives) {
    if (text.replace(/\s/g, "").toLowerCase().includes(expletive))
      return { error: `'${expletive}' is an expletive.` };
  }

  for (const expletive of shownExpletives) {
    if (text.toLowerCase().split(/\s/g).includes(expletive))
      return { error: `'${expletive}' is an expletive.` };
  }

  return null;
}

export function VerifyFirstname(firstname: string): Error {
  if (ContainsExpletive(firstname)) return ContainsExpletive(firstname);
  if (firstname.length == 0) return { error: `First name cannot be empty.` };
  if (firstname.length > 46)
    return { error: `First name cannot be that long.` };
  return null;
}

export function CleanFirstname(firstname: string): string {
  let output = firstname;

  if (output.toUpperCase() == output) output = output.toLowerCase();

  if (output[0] != undefined)
    output = output[0].toUpperCase() + output.slice(1);

  return output;
}

export function VerifyLastname(lastname: string): Error {
  if (ContainsExpletive(lastname)) return ContainsExpletive(lastname);
  if (lastname.length == 0) return { error: `Last name cannot be empty.` };
  if (lastname.length > 46) return { error: `Last name cannot be that long.` };
  return null;
}
export function CleanLastname(lastname: string): string {
  let output = lastname;

  if (output.toUpperCase() == output) output = output.toLowerCase();

  if (output[0] != undefined)
    output = output[0].toUpperCase() + output.slice(1);

  return output;
}
export function VerifyBiography(biography: string): Error {
  if (ContainsExpletive(biography)) return ContainsExpletive(biography);
  return null;
}
export function CleanBiography(biography: string): string {
  return biography;
}
export function VerifyPassword(password: string): Error {
  if (password.length < 5)
    return { error: "Password must be 5 characters or longer." };
  if (password.length > 24)
    return { error: "Password cannot exceed 24 characters." };

  return null;
}
export function VerifyEmail(email: string): Error {
  if (ContainsExpletive(email)) return ContainsExpletive(email);
  if (email.length == 0) return { error: "Email must not be empty." };
  if (email.length > 255) return { error: "Email cannot be that long." };
  if (
    !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      email
    )
  )
    return { error: "Email is not valid." };
  return null;
}
export function CleanEmail(email: string): string {
  let output = email;

  output = output.toLowerCase();

  return output;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function VerifyPhone(phone: string): Error {
  return null;
}
export function CleanPhone(phone: string): string {
  return phone;
}
export function VerifyBirthdate(birthdate: string): Error {
  if (isNaN(new Date(birthdate).getTime()))
    return { error: "Not a valid birthdate." };
  if (
    new Date().getTime() - new Date(birthdate).getTime() <=
    18 * 365 * 24 * 60 * 60
  )
    return { error: "You must be over 18 years old." };
  return null;
}
export function CleanBirthdate(birthdate: string): Date {
  return new Date(birthdate);
}

export function VerifyCardNumber(number: string): Error {
  if (/[a-zA-Z]/.test(number))
    return { error: "Card number cannot contain letters" };
  return null;
}

export function CleanCardNumber(number: string): string {
  return number.replace(/[^0-9]/g, "");
}

export function VerifyCardCVC(number: string): Error {
  if (/[a-zA-Z]/.test(number))
    return { error: "Card CVC cannot contain letters" };
  return null;
}

export function CleanCardCVC(number: string): string {
  return number.replace(/[^0-9]/g, "");
}

export function VerifyCardExpiry(number: string): Error {
  if (/[a-zA-Z]/.test(number))
    return { error: "Card Expiry cannot contain letters" };
  if (!number.includes("/")) return { error: "Expiry must contain a slash" };
  return null;
}

export function CleanCardExpiry(number: string): [string, string] {
  return [
    number.replace(/\s/g, "").split("/")[0] || "",
    number.replace(/\s/g, "").split("/")[1] || "",
  ];
}
