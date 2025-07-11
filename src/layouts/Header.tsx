import { Button } from "@/components/Button";
import { getServerSession } from "next-auth";
import { GoSignIn } from "react-icons/go";
import { GoSignOut } from "react-icons/go";
import { LuUserRoundPlus } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";

export default async function Header() {
    const session = await getServerSession();
    return (
        <header className="w-full flex justify-between items-center gap-8 py-4 px-5 shadow-md bg-gray-100">
            <Link className="w-28 cursor-pointer" href={"/"}>
                <Image src="/png/paytm.png" alt="logo" className="w-full" width={112} height={32} />
            </Link>
            <div className="flex justify-center items-center gap-5">
                {session?.user ? (
                    <>
                        <h1 className="-mr-2 cursor-default font-mono">{session.user.name}</h1>
                        <Button
                            task="/profile"
                            icon={<CiUser className="text-3xl" />}
                        />

                        <Button
                            task="signout"
                            icon={<GoSignOut className="text-2xl" />}
                        />

                    </>
                ) : (
                    <>
                        <Button
                            task="/api/auth/signin"
                            icon={<GoSignIn className="text-2xl" />}
                        />
                        <Button
                            task="/signup"
                            icon={<LuUserRoundPlus className="text-2xl" />}
                        />
                    </>
                )}
            </div>
        </header>
    )
}