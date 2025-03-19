import { Resume } from "@prisma/client";
import React from "react";

const SummaryInfo = ({
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
				Summary
			</h2>
			<p className="text-xs">{resume.summary}</p>
		</div>
	);
};

export default SummaryInfo;
