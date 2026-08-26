"use server";

import prisma from "database";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function markMessageAsRead(id: number) {
  await requireAuth();
  await prisma.contactSubmission.update({
    where: { id },
    data: { status: "reviewed" }
  });
  revalidatePath("/admin/contact");
}

export async function deleteMessage(id: number) {
  await requireAuth();
  await prisma.contactSubmission.delete({
    where: { id }
  });
  revalidatePath("/admin/contact");
}
