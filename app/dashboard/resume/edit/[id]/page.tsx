"use client";
import PreviewCard from "@/components/resume/preview-card";
import BasicInfo from "@/components/steps/basic-info";
import Education from "@/components/steps/education";
import Experience from "@/components/steps/experience";
import Skills from "@/components/steps/skills";
import StepsNav from "@/components/steps/steps-nav";
import Summary from "@/components/steps/summary";
import { ResumeContext } from "@/context/resume";
import React, { useContext } from "react";

const ResumeEditPage = () => {
	const ctx = useContext(ResumeContext);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
			<div className="flex flex-col gap-4 items-center justify-center">
				<StepsNav />
				{ctx?.step === 1 && <BasicInfo />}
				{ctx?.step === 2 && <Summary />}
				{ctx?.step === 3 && <Experience />}
				{ctx?.step === 4 && <Education />}
				{ctx?.step === 5 && <Skills />}
			</div>
			<PreviewCard />
		</div>
	);
};

export default ResumeEditPage;
