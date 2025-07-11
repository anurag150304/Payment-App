import { Button } from "@/components/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="w-1/2 p-4 flex flex-col justify-center items-center gap-4 mx-auto mt-30 shadow-md rounded-2xl bg-gray-100">
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl font-semibold">Welcome to the Paytm</h1>
        <h2 className="text-lg">Send / Receive Money through UPI</h2>
      </div>
      {session?.user ? (
        <Button
          text="Dashboard"
          task="/dashboard"
          textSize="text-xl"
          fontWeignt="font-semibold"
          backgroundColor="bg-black"
          textColor="text-white"
          radius="rounded-xl"
          Vpad="py-2"
          className="w-[60%]"
        />
      ) : (
        <Button
          text="Login"
          task="/api/auth/signin"
          textSize="text-xl"
          fontWeignt="font-semibold"
          backgroundColor="bg-black"
          textColor="text-white"
          radius="rounded-xl"
          Vpad="py-2"
          className="w-[60%]"
        />
      )}
    </main>
  )
}