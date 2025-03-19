//@ts-nocheck
import { Resume } from "@prisma/client";

const SkillsInfo = ({
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
				Skills
			</h2>
			<hr style={{ borderColor: resume.themeColor }} />
			<div className="grid grid-cols-2">
				{resume.skill.map((skill, i) => {
					return (
						<div key={i} className="mt-4 gap-2">
							<h2 className="font-bold mb-1">{skill?.name}</h2>
							<progress
								value={skill?.rating}
								max={5}
								className="progress progress-success w-56"
							></progress>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SkillsInfo;
