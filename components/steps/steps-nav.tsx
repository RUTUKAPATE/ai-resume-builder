import { ResumeContext } from "@/context/resume";
import { useContext } from "react";

const StepsNav = () => {
	const ctx = useContext(ResumeContext);
	const { setStep, step } = ctx!;
	return (
		<ul className="steps">
			<li
				onClick={() => setStep(1)}
				className={`step cursor-pointer ${step === 1 && "step-primary"}`}
			/>
			<li
				onClick={() => setStep(2)}
				className={`step cursor-pointer ${step === 2 && "step-primary"}`}
			/>
			<li
				onClick={() => setStep(3)}
				className={`step cursor-pointer ${step === 3 && "step-primary"}`}
			/>
			<li
				onClick={() => setStep(4)}
				className={`step cursor-pointer ${step === 4 && "step-primary"}`}
			/>
			<li
				onClick={() => setStep(5)}
				className={`step cursor-pointer ${step === 5 && "step-primary"}`}
			/>
		</ul>
	);
};

export default StepsNav;