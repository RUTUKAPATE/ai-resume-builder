import { ResumeContext } from "@/context/resume";
import { generateResumeSummary } from "@/lib/actions";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const Summary = () => {
	const ctx = useContext(ResumeContext);
	const [isLoading, setIsLoading] = useState(false);
	const { updateResume, setStep, setResume, summary, title } = ctx!;
	const handleSubmit = async () => {
		await updateResume();
		setStep(3);
	};
	const handleGenerateSummary = async () => {
		setIsLoading(true);
		if (!title) {
			toast.error("Please enter a title");
			setIsLoading(false);
			return;
		}
		try {
			const res = await generateResumeSummary(
				`generate resume summary based on the job title ${title}`
			);
			if (res.status === "success") {
				setResume((resume) => ({
					...resume,
					summary: res.text!,
				}));
			}
		} catch (error) {
			toast.error("error creating resume summary");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="space-y-2">
			<div className="flex justify-between my-2">
				<h2 className="text-2xl font-bold">Summary</h2>
				<button
					onClick={handleGenerateSummary}
					disabled={isLoading}
					className="btn btn-success text-white"
				>
					{isLoading ? (
						<span className="animate-pulse">Generating summary...</span>
					) : (
						"Generate summary with AI"
					)}
				</button>
			</div>

			<textarea
				placeholder="Write brief summary about yourself"
				className="textarea textarea-bordered textarea-lg w-full max-w-lg"
				rows={5}
				onChange={(e) =>
					setResume((resume) => ({ ...resume, summary: e.target.value }))
				}
				value={summary}
				cols={40}
			/>
			<button
				onClick={handleSubmit}
				className="btn btn-success text-white btn-block"
			>
				Next
			</button>
		</div>
	);
};

export default Summary;
