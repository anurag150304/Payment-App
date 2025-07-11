"use client";
import { Button } from "@/components/Button";
import Loader from "@/components/Loader";
import { AccountType } from "@/types/types.";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { RiUserMinusFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbMathGreater } from "react-icons/tb";
import axios from "axios";

export default function TransferFundsPage() {
    return (
        <Suspense fallback={<Loader />}>
            <TransferFunds />
        </Suspense>
    );
}

function TransferFunds() {
    const [accounts, setAccounts] = useState<{ sender: AccountType, receiver: AccountType }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [render, setRender] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>("");
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const senderId = searchParams.get("senderId");
        const recieverId = searchParams.get("recieverId");

        if (!senderId || !recieverId) {
            alert("Sender & Reciever Id required!");
            return router.push("/dashboard");
        }

        function getAccounts() {
            setLoading(true);
            axios.get(`/api/get-accounts`, {
                params: { senderId, recieverId }
            })
                .then(res => {
                    setLoading(false);
                    const DATA = res.data.accounts;
                    if (DATA.length < 2) return;
                    setAccounts({
                        sender: DATA.find((acc: { userId: string }) => acc.userId == senderId),
                        receiver: DATA.find((acc: { userId: string }) => acc.userId == recieverId)
                    });
                }).catch(err => {
                    setLoading(false);
                    alert(err.response.data.error);
                });
        }
        getAccounts();
    }, [render, router, searchParams]);

    function sendMoney() {
        if (!amount.trim()) return;
        setLoading(true);
        axios.post("/api/send-money", {
            senderId: accounts?.sender.userId,
            receiverId: accounts?.receiver.userId,
            amount: amount.trim()
        })
            .then(res => {
                setRender(!render);
                setAmount("");
                alert(res.data.message);
            }).catch(err => {
                setLoading(false);
                alert(err.response.data.error);
            });
    }
    return (
        <main>
            {loading && (<Loader />)}
            {accounts && (
                <div className="w-1/2 mx-auto bg-gray-100 shadow-md rounded-xl mt-20 p-5 flex flex-col justify-center items-center gap-4">
                    <h1 className="text-4xl font-semibold">Send Money</h1>
                    <div className="w-full flex justify-between items-center gap-4">
                        <div className="flex flex-col justify-center items-center gap-2">
                            <RiUserMinusFill className="text-4xl" />
                            <h2 className="text-center">{accounts.sender.user.firstname} {accounts.sender.user.lastname} <br /> (You)</h2>
                        </div>
                        <span className="w-[50%] flex justify-center items-center gap-1.5">
                            <span className="w-full border-1 border-black" />
                            <RiMoneyRupeeCircleLine className="text-7xl" />
                            <span className="w-full border-1 border-black" />
                            <TbMathGreater className="text-5xl -ml-3" />
                        </span>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <RiUserAddFill className="text-4xl" />
                            <h2>{accounts.receiver.user.firstname} {accounts.receiver.user.lastname}</h2>
                        </div>
                    </div>
                    <span className="-mb-3 text-lg font-medium">
                        Your balance : <span className="font-normal">&#x20B9; {accounts.sender.balance}</span>
                    </span>
                    <div className="w-full flex justify-center items-center gap-4">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter the amount"
                            className="bg-white p-2 rounded-lg border-1 border-black"
                        />
                        <Button
                            text="Send"
                            fontWeignt="font-semibold"
                            textColor="text-white"
                            backgroundColor="bg-black"
                            Vpad="py-2"
                            Hpad="px-4"
                            radius="rounded-lg"
                            onClick={sendMoney}
                        />
                    </div>
                </div>
            )}
        </main>
    )
}