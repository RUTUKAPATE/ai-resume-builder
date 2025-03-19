import ResumeCard from "@/components/resume/resume-card";
import { getUserResumes } from "@/lib/actions";

const DashboardPage = async () => {
	const { data } = await getUserResumes();
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mx-20">
			{data?.map((resume) => (
				<ResumeCard resume={resume} key={resume.id} />
			))}
		</div>
	);
};

export default DashboardPage;
