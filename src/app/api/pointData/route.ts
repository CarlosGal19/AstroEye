
import { NextRequest, NextResponse } from "next/server";
import { getPointData } from "@/lib/functions/get";

export async function GET(req: NextRequest) {
  try {
    const pointId = Number(req.nextUrl.searchParams.get('pointId'))
    const sites = await getPointData(pointId)
    return NextResponse.json(sites);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching sites" }, { status: 500 });
  }
}
