import { NextRequest } from "next/server";
import z, { string } from "zod";

export async function MoneyValidation(req: NextRequest) {
    const moneySchema = z.object({
        senderId: z.number({ message: "Sender Id required!" }),
        receiverId: z.number({ message: "Receiver Id required!" }),
        amount: string({ message: "Amount is required!" })
    });
    return moneySchema.safeParse(await req.json());
}