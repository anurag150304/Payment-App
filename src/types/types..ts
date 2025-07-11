import { JSX } from "react";

export interface UserType {
    id: number;
    fullname: {
        firstname: string;
        lastname?: string;
    },
    email: string;
    password: string;
}

export interface AccountType {
    userId: string;
    user: { firstname: string, lastname?: string },
    balance: string;
}

export interface ButtonType {
    text: string;
    textColor: string;
    textSize: string;
    fontWeignt: string;
    Vpad: string;
    Hpad: string;
    borderLine: string;
    borderColor: string;
    backgroundColor: string;
    radius: string;
    className: string;
    icon: JSX.Element;
    task: string;
    onClick?: () => void;
}

export class errHandler extends Error {
    status: number;
    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    }
}
