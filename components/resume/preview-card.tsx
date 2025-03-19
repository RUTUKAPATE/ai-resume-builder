import { Resume } from "@prisma/client";
import PersonalInfo from "./personal-info";
import SummaryInfo from "./summary-info";
import { useContext } from "react";
import { ResumeContext } from "@/context/resume";
import ExperienceInfo from "./experience-info";
import EducationInfo from "./education-info";
import SkillsInfo from "./skill-info";

const PreviewCard = () => {
	const ctx = useContext(ResumeContext);
	const {
		themeColor,
		address,
		education,
		email,
		experience,
		name,
		phone,
		skill,
		summary,
		title,
	} = ctx!;
	const resume = {
		themeColor,
		address,
		education,
		email,
		experience,
		name,
		phone,
		skill,
		summary,
		title,
	};
	return (
		<div
			className={`shadow-lg space-y-4 w-full max-h-full p-4 border-b-[10px] border-${[
				themeColor,
			]} `}
		>
			<PersonalInfo resume={resume} />
			<SummaryInfo resume={resume} />
			<ExperienceInfo resume={resume} />
			<EducationInfo resume={resume} />
			<SkillsInfo resume={resume} />
		</div>
	);
};

export default PreviewCard;
