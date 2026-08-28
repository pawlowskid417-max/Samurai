import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import prisma from "database";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    
    // Upload to Vercel Blob
    const blob = await put(`uploads/${filename}`, file, {
      access: 'public',
    });

    // Create Media record in DB
    const media = await prisma.media.create({
      data: {
        url: blob.url,
        altText: file.name,
        mimeType: file.type || "application/octet-stream",
        sizeBytes: file.size,
      },
    });

    return NextResponse.json({ 
      success: true, 
      media: {
        id: media.id.toString(),
        url: media.url,
        altText: media.altText
      } 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
