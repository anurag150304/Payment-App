"use client";
import { ButtonType } from "@/types/types.";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Button(props: Partial<ButtonType>) {
    const router = useRouter();
    const performTask = () => {
        if (props.task === "signout") {
            signOut();
            return router.push("/");
        }
        if (props.task) return router.push(props.task);
    }
    return (
        <button
            className={`
                ${props.textColor}
                ${props.textSize}
                ${props.fontWeignt}
                ${props.Hpad} ${props.Vpad}
                ${props.borderLine}
                ${props.borderColor}
                ${props.backgroundColor}
                ${props.radius}
                ${props.className}
                cursor-pointer
                flex justify-center items-center gap-2`}
            onClick={props.onClick ?? performTask}>
            {props.text}
            {props.icon}
        </button>
    )
}
