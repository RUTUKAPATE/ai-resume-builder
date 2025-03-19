import { ResumeContext } from "@/context/resume";
import { useContext, useState } from "react";

const Experience = () => {
	const ctx = useContext(ResumeContext);
	const [loading, setLoading] = useState(false);
	const {
		addExperience,
		handleExperienceChange,
		handleExperienceSubmit,
		removeExperience,
		handleExperienceSummaryWithAi,
		experiences,
	} = ctx!;
	const handleExperienceSummary = async (index: number) => {
		setLoading(true);
		try {
			await handleExperienceSummaryWithAi(index);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Experience</h2>

			<form onSubmit={handleExperienceSubmit}>
				{experiences &&
					experiences.map((exp: any, i: number) => {
						return (
							<div key={i} className="mb-5 space-y-4">
								<input
									type="text"
									name="title"
									placeholder="Job title"
									value={exp.title}
									className="input input-bordered w-full"
									onChange={(e) => handleExperienceChange(e, i)}
									required
								/>
								<input
									type="text"
									name="company"
									placeholder="Company"
									value={exp.company}
									className="input input-bordered w-full"
									onChange={(e) => handleExperienceChange(e, i)}
									required
								/>
								<input
									type="date"
									name="startDate"
									placeholder="Start date"
									value={exp.startDate}
									className="input input-bordered w-full"
									onChange={(e) => handleExperienceChange(e, i)}
									required
								/>
								<input
									type="date"
									name="endDate"
									placeholder="End date"
									value={exp.endDate}
									className="input input-bordered w-full"
									onChange={(e) => handleExperienceChange(e, i)}
									required
								/>
								<div className="relative">
									<textarea
										name="summary"
										placeholder="Write brief summary about yourself"
										className="textarea textarea-bordered textarea-lg w-full"
										onChange={(e) => handleExperienceChange(e, i)}
										rows={5}
										cols={40}
										value={exp.summary}
									/>
									<button
										type="button"
										onClick={() => handleExperienceSummary(i)}
										className="btn bottom-5 right-5 btn-success text-white min-w-20 absolute"
									>
										{loading ? (
											<span className="animate-pulse transition-all">
												Generating...
											</span>
										) : (
											"Generate With AI"
										)}
									</button>
								</div>
							</div>
						);
					})}
				<div className="flex justify-between gap-4">
					<button
						type="button"
						onClick={addExperience}
						className="btn btn-success text-white min-w-20"
					>
						Add
					</button>

					{experiences.length > 1 && (
						<button
							onClick={removeExperience}
							className="btn btn-error text-white min-w-20"
						>
							Remove
						</button>
					)}

					<button type="submit" className="btn btn-success text-white min-w-20">
						Next
					</button>
				</div>
			</form>
		</div>
	);
};

export default Experience;
