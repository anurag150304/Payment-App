import dbClient from "@/config/db.config";
import { UserType } from "@/types/types.";
import bcrypt from "bcrypt";

export async function UpdateUserDetails(email: string,
    data: Omit<UserType, "id" | "fullname"> & { firstname: string, lastname: string }) {
    if (!email) return { error: "Email is required for updation!" };
    if (!data) return { error: "At least one filed is required for updation!" };

    const user = await dbClient.user.update({
        data: {
            ...(data.email && { email: data.email }),
            ...(data.password && { password: await bcrypt.hash(data.password, 10) }),
            ...(data.firstname && { firstname: data.firstname }),
            ...(data.lastname && { lastname: data.lastname }),
        }, where: { email }
    });
    return { success: "User details updated", user };
}