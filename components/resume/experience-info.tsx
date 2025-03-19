//@ts-nocheck
import { Resume } from "@prisma/client";

const ExperienceInfo = ({
	resume,
}: {
	resume: Omit<Resume, "id" | "createdAt" | "userEmail">;
}) => {
	return (
		<div>
			<h2
				className="font-bold text-2xl text-center"
				style={{ color: resume.themeColor }}
			>
				Professional Experience
			</h2>
			<hr style={{ borderColor: resume.themeColor }} />

			{resume.experience.map((exp, i) => {
				return (
					<div key={exp.summary} className="mt-4">
						<h2 className="font-medium">{exp.title}</h2>
						<h3 className="font-medium mb-3">{exp.compnay}</h3>

						<p>{exp.summary}</p>
					</div>
				);
			})}
		</div>
	);
};

export default ExperienceInfo;
