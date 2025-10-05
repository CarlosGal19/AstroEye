
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/functions/post";

export async function POST(req: NextRequest) {
  try {
    await uploadImage(req);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching sites" }, { status: 500 });
  }
}
