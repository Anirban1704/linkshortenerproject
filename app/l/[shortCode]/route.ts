import { NextRequest, NextResponse } from "next/server";

import { getShortLinkByShortCode } from "@/data/links";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  const { shortCode } = await params;
  const url = await getShortLinkByShortCode(shortCode);

  if (!url) {
    return new NextResponse("Short link not found", { status: 404 });
  }

  return NextResponse.redirect(url, 307);
}
