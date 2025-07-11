import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/config/db.config";
import { errHandler } from "@/types/types.";

export async function GET(req: NextRequest) {
    const senderId = req.nextUrl.searchParams.get("senderId");
    const recieverId = req.nextUrl.searchParams.get("recieverId");
    if (!senderId || !recieverId) {
        throw new errHandler("Sender & Reciever Id required!", 400);
    }

    try {
        const accounts = await dbClient.accounts.findMany({
            where: { userId: { in: [+senderId, +recieverId] }, },
            include: { user: { select: { firstname: true, lastname: true } } }
        });
        return NextResponse.json({ accounts }, { status: 200 });
    } catch (err) {
        const { message, status = 500 } = err as errHandler;
        return NextResponse.json({ error: message }, { status });
    }
}