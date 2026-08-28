"use server";

import prisma from "database";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const honeypot = formData.get("bot_field") as string;

  // Basic validation
  if (!name || !email || !message) {
    return { error: "Wszystkie wymagane pola muszą być wypełnione." };
  }

  // Honeypot spam protection
  if (honeypot) {
    return { success: true }; // Silently accept spam bots without saving
  }

  try {
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
        status: "new",
      },
    });

    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { error: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później." };
  }
}
