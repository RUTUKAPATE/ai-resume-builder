"use client"
import { createContext, Dispatch, SetStateAction, useState } from "react";
interface Resume {
    name: string;
    email: string;
    phone: string;
    title: string;
    address: string;
    step: number;
    setStep: Dispatch<SetStateAction<number>>
}

export const ResumeContext = createContext<Resume | null>(null);
const initialState = {
    name: "",
    email: "",
    phone: "",
    title: "",
    address: "",
};
export const ResumeProvider = ({ children }:{ children:React.ReactNode }) => {
    const [resume, setResume] = useState(initialState);
    const [step, setStep] = useState(1)
    return (
        <ResumeContext value={{ step, setStep, ...resume }}>
            {children}
        </ResumeContext>
    );
};