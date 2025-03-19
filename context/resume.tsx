"use client";
import {
	generateResumeSummary,
	getResumeById,
	saveResumeToDb,
	updateResumeById,
	updateResumeEducation,
	updateResumeExprience,
	updateResumeSkill,
} from "@/lib/actions";
import { JsonValue } from "@prisma/client/runtime/library";
import { useParams, useRouter } from "next/navigation";
import {
	ChangeEvent,
	createContext,
	Dispatch,
	FormEvent,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { toast } from "react-hot-toast";
interface Resume {
	name: string;
	email: string;
	phone: string;
	title: string;
	address: string;
	skill: JsonValue[];
	experience: JsonValue[];
	education: JsonValue[];
	summary: string;
	themeColor: string;
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	setResume: Dispatch<
		SetStateAction<{
			name: string;
			email: string;
			phone: string;
			title: string;
			address: string;
			skill: JsonValue[];
			experience: JsonValue[];
			education: JsonValue[];
			themeColor: string;
			summary: string;
		}>
	>;
	saveResume: () => Promise<void>;
	updateResume: () => Promise<void>;
	addExperience: () => void;
	removeExperience: () => void;
	handleExperienceSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	handleExperienceSummaryWithAi: (index: number) => Promise<void>;

	handleExperienceChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => void;
	addEducation: () => void;
	removeEducation: () => void;
	handleEducationSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	handleEducationChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => void;
	addSkill: () => void;
	removeSkill: () => void;
	handleSkillSubmit: (skills: any[]) => Promise<void>;
	handleSkillChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
	educations: any[];
	skills: any[];
	experiences: any[];
}

export const ResumeContext = createContext<Resume | null>(null);
const intialState = {
	name: "",
	email: "",
	phone: "",
	title: "",
	address: "",
	skill: [] as JsonValue[],
	experience: [] as JsonValue[],
	education: [] as JsonValue[],
	themeColor: "",
	summary: "",
};
export const ResumeProvider = ({ children }: { children: ReactNode }) => {
	const [resume, setResume] = useState(intialState);
	const [step, setStep] = useState(1);
	const [experiences, setExperiences] = useState<any[]>([]);
	const [educations, setEducations] = useState<any[]>([]);
	const [skills, setSkills] = useState<any[]>([]);

	const router = useRouter();
	const params = useParams<{ id: string }>();
	useEffect(() => {
		const savedResume = localStorage.getItem("resume");
		if (savedResume) {
			setResume(JSON.parse(savedResume));
		}
	}, []);
	const getResume = async () => {
		try {
			const res = await getResumeById(params.id);
			if (res.status === "success") {
				setResume(res.data!);
			}
		} catch (error) {
			console.log(error);
			toast.error("Error getting resume");
		}
	};
	useEffect(() => {
		if (params.id) {
			getResume();
		}
	}, [params.id]);
	const saveResume = async () => {
		try {
			const res = await saveResumeToDb(resume);
			if (res.status === "success") {
				setResume(res.data!);
				localStorage.removeItem("resume");
				toast.success(res.message);
				router.push(`/dashboard/resume/edit/${res.data?.id}`);
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to save resume");
		}
	};

	const updateResume = async () => {
		try {
			const res = await updateResumeById({ id: params.id, ...resume });
			if (res.status === "success") {
				setResume(res.data!);
				toast.success(res.message);
			}
		} catch (error) {
			toast.error("Failed to update resume");
		}
	};
	//experience
	useEffect(() => {
		if (resume.experience) {
			setExperiences(resume.experience);
		}
	}, [resume]);
	const addExperience = () => {
		const newExperience = {
			title: "",
			company: "",
			startDate: "",
			endDate: "",
			summary: "",
		};
		setExperiences([...experiences, newExperience]);
	};
	const removeExperience = () => {
		if (experiences.length === 1) return;
		const newExperiences = experiences.slice(0, experiences.length - 1);
		setExperiences(newExperiences);
	};
	const handleExperienceSummaryWithAi = async (index: number) => {
		const selectedExprience = experiences[index];
		if (!selectedExprience || !selectedExprience.title) {
			toast.error("Please enter title first");
			return;
		}
		try {
			const res = await generateResumeSummary(
				`generate responsibilites and duties for the given job title ${selectedExprience.title} with years start from ${selectedExprience.startDate} to ${selectedExprience.endDate} in plain text and it should not be in mark down format it should less than 1000 characters `
			);
			if (res.status === "success") {
				const updatedExperiences = experiences.slice();
				updatedExperiences[index].summary = res.text;
				setExperiences(updatedExperiences);
				setResume((resume) => {
					return {
						...resume,
						experience: updatedExperiences,
					};
				});
			}
		} catch (error) {}
	};
	const handleExperienceSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await updateResumeExprience(params.id, experiences);
			if (res.status === "success") {
				toast.success(res.message);
				setResume(res.data!);
				setStep(4);
			}
		} catch (error) {}
	};
	const handleExperienceChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const newExperiences = [...experiences];
		const { value, name } = e.target;
		newExperiences[index][name] = value;
		setExperiences(newExperiences);
	};
	//educations
	useEffect(() => {
		if (resume.education) {
			setEducations(resume.education);
		}
	}, [resume]);
	const addEducation = () => {
		const newEducation = {
			university: "",
			degree: "",
			year: "",
		};
		setEducations([...educations, newEducation]);
	};
	const removeEducation = () => {
		if (educations.length === 1) return;
		const newEducations = educations.slice(0, educations.length - 1);
		setEducations(newEducations);
	};
	const handleEducationSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await updateResumeEducation(params.id, educations);
			if (res.status === "success") {
				toast.success(res.message);
				setResume(res.data!);
				setStep(5);
			}
		} catch (error) {}
	};
	const handleEducationChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const newEducations = [...educations];
		const { value, name } = e.target;
		newEducations[index][name] = value;
		setEducations(newEducations);
	};
	//skills
	useEffect(() => {
		if (resume.skill) {
			setSkills(resume.skill);
		}
	}, [resume]);
	const handleSkillSubmit = async (skills: any[]) => {
		const inValidSkills = skills.filter(
			(skill) => !skill.name || !skill.rating
		);
		if (inValidSkills.length > 0) {
			toast.error("Please fill all the fields");
			return;
		}
		try {
			const res = await updateResumeSkill(params.id, skills);
			if (res.status === "success") {
				toast.success(res.message);
				setResume(res.data!);
				router.push(`/dashboard/resume/download/${res.data?.id}`);
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to update skills");
		}
	};
	const addSkill = () => {
		const newSkill = {
			name: "",
			rating: "",
		};
		setSkills([...skills, newSkill]);
	};
	const removeSkill = () => {
		if (skills.length === 1) return;
		const newSkills = skills.slice(0, skills.length - 1);
		setSkills(newSkills);
	};
	const handleSkillChange = (
		e: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const newSkills = [...skills];
		const { value, name } = e.target;
		newSkills[index][name] = value;
		setSkills(newSkills);
	};
	return (
		<ResumeContext.Provider
			value={{
				step,
				setStep,
				setResume,
				saveResume,
				updateResume,
				addExperience,
				handleExperienceSubmit,
				removeExperience,
				handleExperienceChange,
				handleExperienceSummaryWithAi,
				experiences,
				addEducation,
				educations,
				handleEducationChange,
				handleEducationSubmit,
				removeEducation,
				addSkill,
				removeSkill,
				handleSkillChange,
				handleSkillSubmit,
				skills,
				...resume,
			}}
		>
			{children}
		</ResumeContext.Provider>
	);
};
