import { NextResponse } from "next/server";
import { vote } from "@/lib/actions";

export async function POST(request: Request) {
  try {
    const { referralId, value } = await request.json();
    
    if (!referralId || ![1, -1].includes(value)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const result = await vote(referralId, value as 1 | -1);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
