"use client";
import BasicInfo from "@/components/steps/basic-info";
import BasicInfoCreate from "@/components/steps/basic-info-create";
import StepsNav from "@/components/steps/steps-nav";
import { ResumeContext } from "@/context/resume";
import { useContext } from "react";

const CreateResume = () => {
	const ctx = useContext(ResumeContext);
	return (
		<div className="flex flex-col gap-4 items-center justify-center h-screen">
			<StepsNav />
			{ctx?.step === 1 && <BasicInfoCreate />}
		</div>
	);
};

export default CreateResume;
