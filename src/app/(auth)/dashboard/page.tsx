import { getAccount, getAllAccounts } from "@/actions/accouts/actions";
import Button from "@/components/Button";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { SlUser } from "react-icons/sl";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return;
    const { account } = await getAccount(+session?.user.id);
    const { accounts } = await getAllAccounts(+session?.user.id);

    return (
        <main className="w-full p-5 flex flex-col justify-start items-center gap-10">
            <div className="w-fit flex justify-center items-center gap-2.5 mt-4 mx-auto">
                <h2 className="text-3xl">Your Balance : </h2>
                <h1 className="text-4xl font-light">&#x20B9;&nbsp;{account?.balance.toString()}</h1>
            </div>
            <div className="w-full">
                <h1 className="text-2xl font-semibold mb-1">UPI Users : </h1>
                <ul className="w-full flex flex-col justify-start items-center gap-4 py-4 h-80 overflow-y-auto">
                    {(accounts && accounts.length > 0) && accounts.map((acc, idx) => (
                        <li key={idx} className="w-full flex justify-between items-center gap-5 bg-gray-100 p-3 rounded-lg shadow-md">
                            <span className="flex justify-center items-center gap-4">
                                <SlUser className="text-2xl" />
                                <span>{acc.user.firstname} {acc.user.lastname}</span>
                            </span>
                            <Button
                                text="Send Money"
                                task={`/transfer-funds?senderId=${account?.userId}&recieverId=${acc.userId}`}
                                textColor="text-white"
                                backgroundColor="bg-black"
                                radius="rounded-lg"
                                Vpad="py-1.5"
                                Hpad="px-4"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}