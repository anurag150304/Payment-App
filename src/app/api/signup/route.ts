import { SignupValidation } from "@/validations/user.validation";
import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/config/db.config";
import bcrypt from "bcrypt";
import { errHandler } from "@/types/types.";

export async function POST(req: NextRequest) {
    const parsedData = await SignupValidation(req);
    if (!parsedData.success) {
        return NextResponse.json({ errors: parsedData.error.issues.map(err => err.message) }, { status: 409 })
    }

    try {
        const userExist = await dbClient.user.findFirst({ where: { email: parsedData.data.email } });
        if (userExist) throw new errHandler("Email already taken!", 411);
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        const newUser = await dbClient.user.create({
            data: {
                firstname: parsedData.data.fullname.firstname,
                lastname: parsedData.data.fullname.lastname,
                email: parsedData.data.email,
                password: hashedPassword
            }
        });

        await dbClient.accounts.create({
            data: {
                balance: +((Math.random() * 50_000) + 10_000).toFixed(2),
                user: { connect: { id: newUser.id } }
            }
        });
        return NextResponse.json({ user: newUser }, { status: 200 });
    } catch (err) {
        const { message, status = 500 } = err as errHandler;
        return NextResponse.json({ error: message }, { status });
    }
}