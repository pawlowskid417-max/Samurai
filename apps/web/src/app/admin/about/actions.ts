"use server";

import prisma from "database";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function updateAboutInfo(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const history = formData.get("history") as string;
  const philosophy = formData.get("philosophy") as string;

  if (!history || !philosophy) {
    return { error: "All fields are required." };
  }

  try {
    await prisma.aboutUs.upsert({
      where: { id: 1 },
      update: { history, philosophy },
      create: { id: 1, history, philosophy },
    });

    revalidatePath("/about");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to update about info:", error);
    return { error: "Failed to save changes." };
  }
}

export async function updateContactInfo(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const hours = formData.get("hours") as string;

  if (!address || !phone || !email || !hours) {
    return { error: "All fields are required." };
  }

  try {
    await prisma.contactInfo.upsert({
      where: { id: 1 },
      update: { address, phone, email, hours },
      create: { id: 1, address, phone, email, hours },
    });

    revalidatePath("/contact");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error) {
    console.error("Failed to update contact info:", error);
    return { error: "Failed to save changes." };
  }
}
