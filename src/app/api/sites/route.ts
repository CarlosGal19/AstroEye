
import { NextRequest, NextResponse } from "next/server";
import { getSites } from "@/lib/functions/get";

export async function GET(req: NextRequest) {
  try {
    const sites = await getSites();
    return NextResponse.json(sites);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching sites" }, { status: 500 });
  }
}
