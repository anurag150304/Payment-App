import { errHandler } from "@/types/types.";
import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/config/db.config";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");
    console.log(email);
    if (!email) throw new errHandler("Email is requred!", 400);

    try {
        const user = await dbClient.user.findFirst({
            where: { email },
            select: { firstname: true, lastname: true, email: true }
        });
        if (!user) throw new errHandler("User not found!", 404);
        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        const { message, status = 500 } = err as errHandler;
        return NextResponse.json({ error: message }, { status });
    }
}