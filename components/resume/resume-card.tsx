"use client";
import { Resume } from "@prisma/client";
import PersonalInfo from "./personal-info";
import Link from "next/link";
import SummaryInfo from "./summary-info";
import { deleteResume } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ResumeCard = ({ resume }: { resume: Resume }) => {
	const router = useRouter();
	const handleDeleteResume = async (id: string) => {
		try {
			const res = await deleteResume(id);
			if (res.status === "success") {
				toast.success(res.message);
				router.refresh();
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to delete resume");
		}
	};
	return (
		<div>
			<div
				className={`shadow-lg space-y-4 w-full h-full p-4 border-b-[10px] border-${[
					resume.themeColor,
				]} `}
			>
				<PersonalInfo resume={resume} />
				<div className="line-clamp-2">
					<SummaryInfo resume={resume} />
				</div>

				<div />
			</div>
			<div className="flex mt-5 justify-between gap-4">
				<Link
					href={`/dashboard/resume/edit/${resume.id}`}
					className="btn btn-success text-white min-w-20"
				>
					Edit
				</Link>

				<Link
					href={`/dashboard/resume/download/${resume.id}`}
					className="btn btn-success text-white min-w-20"
				>
					Download
				</Link>
				<button
					onClick={() => handleDeleteResume(resume.id)}
					type="button"
					className="btn btn-error text-white min-w-20"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default ResumeCard;
