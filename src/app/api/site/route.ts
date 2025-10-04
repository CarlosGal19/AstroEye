
import { NextRequest, NextResponse } from "next/server";
import { getSiteData } from "@/lib/functions/get";

export async function GET(req: NextRequest) {
  try {
    const siteId = Number(req.nextUrl.searchParams.get('siteId'))
    const sites = await getSiteData(siteId);
    return NextResponse.json(sites);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching sites" }, { status: 500 });
  }
}
