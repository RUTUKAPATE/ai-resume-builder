import { Resume } from "@prisma/client";

const PersonalInfo = ({
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
				{resume.name}
			</h2>
			<p className="text-center text-sm font-semibold">{resume.title}</p>
			<p className="text-center text-sm font-semibold">{resume.address}</p>
			<div className="flex justify-between mt-4">
				<p className="text-center text-sm">{resume.phone}</p>
				<p className="text-center text-sm">{resume.email}</p>
			</div>
			<hr className="h-1 mt-1" />
		</div>
	);
};

export default PersonalInfo;
