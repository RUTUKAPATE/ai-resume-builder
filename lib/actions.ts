"use server";
import { prisma } from "@/prisma/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma, Resume } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAi = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
export const saveResumeToDb = async (
	resume: Omit<Resume, "id" | "userEmail">
) => {
	const user = await currentUser();
	const userEmail = user?.emailAddresses[0].emailAddress;
	try {
		const resumeData = await prisma.resume.create({
			data: {
				userEmail: userEmail!,
				...resume,
				skill: resume.skill as Prisma.InputJsonValue[],
				experience: resume.experience as Prisma.InputJsonValue[],
				education: resume.education as Prisma.InputJsonValue[],
			},
		});
		return {
			status: "success",
			message: "Resume created successfully",
			data: resumeData,
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Error creating resume",
		};
	}
};
export const getUserResumes = async () => {
	const user = await currentUser();
	if (!user?.emailAddresses[0].emailAddress) {
		return {
			status: "error",
			message: "User does not exist",
		};
	}
	try {
		const resumes = await prisma.resume.findMany({
			where: {
				userEmail: user.emailAddresses[0].emailAddress,
			},
		});
		return {
			data: resumes,
			status: "success",
			message: "Resumes fetched successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			data: null,
			status: "error",
			message: "Error fetching resumes",
		};
	}
};
export const getResumeById = async (id: string) => {
	const user = await currentUser();
	if (!user?.emailAddresses[0].emailAddress) {
		return {
			status: "error",
			message: "User does not exist",
		};
	}
	try {
		const resume = await prisma.resume.findFirst({
			where: {
				userEmail: user.emailAddresses[0].emailAddress,
				id,
			},
		});
		return {
			data: resume,
			status: "success",
			message: "resume fetched successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			data: null,
			status: "error",
			message: "error fetching resume",
		};
	}
};
export const checkResumeOwnership = async (id: string) => {
	const user = await currentUser();
	if (!user?.emailAddresses[0].emailAddress) {
		return {
			status: "error",
			message: "User does not exist",
		};
	}
	try {
		const resume = await prisma.resume.findFirst({
			where: {
				id,
			},
		});
		if (!resume) {
			throw new Error("No resume found");
		}
		if (resume.userEmail !== user.emailAddresses[0].emailAddress) {
			throw new Error("unauthenticated");
		}
		return true;
	} catch (error) {
		console.log(error);
		throw new Error("Unable to retrieve resume");
	}
};
export const updateResumeById = async (resume: Omit<Resume, "userEmail">) => {
	try {
		await checkResumeOwnership(resume.id);
		const updatedResume = await prisma.resume.update({
			where: {
				id: resume.id,
			},
			data: {
				name: resume.name,
				address: resume.address,
				education: resume.education as Prisma.InputJsonValue[],
				email: resume.email,
				experience: resume.experience as Prisma.InputJsonValue[],
				phone: resume.phone,
				skill: resume.skill as Prisma.InputJsonValue[],
				summary: resume.summary,
				themeColor: resume.themeColor,
				title: resume.title,
			},
		});
		return {
			status: "success",
			message: "resume updated successfully",
			data: updatedResume,
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "failed to update resume",
		};
	}
};
export const generateResumeSummary = async (prompt: string) => {
	try {
		const res = await model.generateContent(prompt);
		const text = await res.response.text();
		return {
			text,
			status: "success",
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Error generating resume summary",
		};
	}
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateResumeExprience = async (id: string, experience: any) => {
	try {
		await checkResumeOwnership(id);
		const resume = await prisma.resume.update({
			where: {
				id,
			},
			data: {
				experience,
			},
		});
		return {
			status: "success",
			message: "Experience updated successfully",
			data: resume,
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Error updating experience",
		};
	}
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateResumeEducation = async (id: string, education: any) => {
	try {
		await checkResumeOwnership(id);
		const resume = await prisma.resume.update({
			where: {
				id,
			},
			data: {
				education,
			},
		});
		return {
			status: "success",
			message: "Education updated successfully",
			data: resume,
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Error updating education",
		};
	}
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateResumeSkill = async (id: string, skill: any) => {
	try {
		await checkResumeOwnership(id);
		const resume = await prisma.resume.update({
			where: {
				id,
			},
			data: {
				skill,
			},
		});
		return {
			status: "success",
			message: "Skills updated successfully",
			data: resume,
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Error updating skills",
		};
	}
};
export const deleteResume = async (id: string) => {
	try {
		await checkResumeOwnership(id);
		await prisma.resume.delete({
			where: {
				id,
			},
		});
		return {
			status: "success",
			message: "Resume deleted successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Error while deleting resume",
		};
	}
};
