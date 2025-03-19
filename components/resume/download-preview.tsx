"use client";
import { Resume } from "@prisma/client";
import PersonalInfo from "./personal-info";
import EducationInfo from "./education-info";
import ExperienceInfo from "./experience-info";
import SkillsInfo from "./skill-info";
import SummaryInfo from "./summary-info";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
const DownloadPreview = ({ resume }: { resume: Resume }) => {
	const componentRef = useRef<HTMLDivElement>(null);
	const printIt = useReactToPrint({ contentRef: componentRef });
	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<div className="flex gap-10 mt-5">
				<button
					onClick={() => printIt()}
					className="btn btn-success text-white min-w-20"
				>
					Download
				</button>

				<button
					onClick={() => printIt()}
					className="btn btn-success text-white min-w-20"
				>
					Print
				</button>
			</div>
			<div
				className={`shadow-lg space-y-4 w-3/4 print:w-full min-h-52 print:min-h-full p-4 border-b-[10px]`}
				style={{ borderColor: resume.themeColor }}
				ref={componentRef}
			>
				<PersonalInfo resume={resume} />
				<SummaryInfo resume={resume} />
				<ExperienceInfo resume={resume} />
				<EducationInfo resume={resume} />
				<SkillsInfo resume={resume} />
			</div>
		</div>
	);
};

export default DownloadPreview;
