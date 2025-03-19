"use client";
import { ResumeContext } from "@/context/resume"
import { useContext } from "react"

const CreateResume = () => {
    const ctx = useContext(ResumeContext);
    return (
        <div>
            {ctx?.step === 1 && "step"}
        </div>
  );
};

export default CreateResume