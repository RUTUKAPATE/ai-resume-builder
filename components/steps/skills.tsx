import { ResumeContext } from "@/context/resume";
import { useContext } from "react";

const Skills = () => {
	const ctx = useContext(ResumeContext);
	const {
		addSkill,
		removeSkill,
		skills,
		handleSkillChange,
		handleSkillSubmit,
	} = ctx!;

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Skills</h2>
			{skills.map((skill, i) => {
				return (
					<div className="mb-5 space-y-4" key={i}>
						<input
							type="text"
							name="name"
							value={skill.name}
							onChange={(e) => handleSkillChange(e, i)}
							placeholder="Skill name"
							className="input input-bordered w-full"
							required
						/>
						<input
							type="number"
							name="rating"
							min={1}
							value={skill.rating}
							onChange={(e) => handleSkillChange(e, i)}
							max={5}
							placeholder="Rate (1-5)"
							className="input input-bordered w-full"
							required
						/>
					</div>
				);
			})}

			<div className="flex justify-between gap-4">
				<button
					onClick={addSkill}
					className="btn btn-success text-white min-w-20"
				>
					Add
				</button>

				{skills.length > 1 && (
					<button className="btn btn-error text-white min-w-20">Remove</button>
				)}

				<button
					onClick={() => handleSkillSubmit(skills)}
					className="btn btn-success text-white min-w-20"
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Skills;
