import dbClient from "@/config/db.config"

export async function getAccount(userId: number) {
    if (!userId) throw new Error("User id required!");

    try {
        const account = await dbClient.accounts.findFirst({ where: { userId }, select: { balance: true, userId: true } });
        if (!account) throw new Error("Account not found!");
        return { account }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function getAllAccounts(userId: number) {
    try {
        const accounts = await dbClient.accounts.findMany({
            include: { user: true, },
            where: { userId: { not: userId } }
        });
        return { accounts }
    } catch (err) {
        console.log(err);
        throw err;
    }
}