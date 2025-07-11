"use client";
import { UserType } from "@/types/types.";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function Signup() {
    const [data, setData] = useState<Omit<UserType, "id">>({ fullname: { firstname: "", lastname: "" }, email: "", password: "" });
    const router = useRouter();

    const addData = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "firstname" || e.target.name === "lastname") {
            setData({ ...data, fullname: { ...data.fullname, [e.target.name]: e.target.value } });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    }

    const createUser = () => {
        if (!data.fullname.firstname || !data.email || !data.password) return;

        axios.post("/api/signup", data)
            .then(() => {
                setData({ fullname: { firstname: "", lastname: "" }, email: "", password: "" });
                router.push("/api/auth/signin");
            }).catch(err => alert(err.response.data.err));
    }
    return (
        <main className="h-screen w-screen m-0 p-0 flex justify-center items-center bg-[#00000064]">
            <div className="w-[30%] bg-white rounded-lg shadow flex flex-col justify-center items-center gap-5 p-4">
                <h1 className="text-center text-3xl font-semibold">Create Account</h1>
                <div className="w-full flex justify-center items-center gap-4">
                    <div className="w-1/2 flex flex-col justify-center items-start">
                        <label htmlFor="firstname">Fisrtname</label>
                        <input
                            id="firstname"
                            className="w-full bg-gray-100 shadow p-2"
                            type="text"
                            placeholder="ex - Alex"
                            name="firstname"
                            value={data.fullname.firstname}
                            onChange={addData}
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            id="lastname"
                            className="w-full bg-gray-100 shadow p-2"
                            type="text"
                            name="lastname"
                            value={data.fullname.lastname}
                            onChange={addData}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start w-full gap-4">
                    <div className="w-full">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="w-full bg-gray-100 shadow p-2"
                            type="text"
                            placeholder="ex - jhon@gmail.com"
                            name="email"
                            value={data.email}
                            onChange={addData}
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="pass">Password</label>
                        <input
                            id="pass"
                            className="w-full bg-gray-100 shadow p-2"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={addData}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <Button
                        backgroundColor="bg-black"
                        textColor="text-white"
                        radius="rounded-lg"
                        Vpad="py-2"
                        fontWeignt="font-semibold"
                        className="w-full"
                        text="Create"
                        onClick={createUser}
                    />
                    <span>Already have account? <Link href="/api/auth/signin" className="text-sky-400 underline hover:text-sky-600">Signin</Link></span>
                </div>
            </div>
        </main>
    );
}