import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Button from "@/components/Button";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    return (
        <main className="font-mono cursor-default w-fit mx-auto mt-20 bg-gray-100 shadow-md rounded-lg p-4 flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl font-semibold">Your Profile</h1>
            <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-xl font-medium">{session?.user.name}</h2>
                <h3>{session?.user.email}</h3>
            </div>
            <Button
                text="Update"
                task="/update"
                textSize="text-lg"
                fontWeignt="font-semibold"
                textColor="text-white"
                backgroundColor="bg-black"
                Vpad="py-1"
                radius="rounded-lg"
                className="w-full"
            />
        </main>
    )
}