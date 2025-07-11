import { MoneyValidation } from "@/validations/moneyTransfer.validation";
import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/config/db.config";
import { errHandler } from "@/types/types.";

export async function POST(req: NextRequest) {
    const { success, error, data } = await MoneyValidation(req);
    if (!success) {
        return NextResponse.json({ errors: error.issues.map(err => err.message) }, { status: 409 });
    }

    try {
        const accountExists = await dbClient.accounts.findMany({
            where: { userId: { in: [+data.senderId, +data.receiverId] } }
        });

        if (accountExists.length == 0) {
            throw new errHandler("Sender or Receiver account not found!", 404);
        }

        await dbClient.$transaction(async (tx) => {
            const sender = await tx.accounts.update({
                data: { balance: { decrement: +data.amount } },
                where: { userId: +data.senderId }
            });

            if (sender.balance.toNumber() < 0) {
                throw new errHandler("Insufficient balance!", 400);
            }

            await tx.accounts.update({
                data: { balance: { increment: +data.amount } },
                where: { userId: +data.receiverId }
            });
        });

        return NextResponse.json({ message: "Money sent successfully!" }, { status: 200 });
    } catch (err) {
        const { message, status = 500 } = err as errHandler;
        return NextResponse.json({ error: message }, { status });
    }
}