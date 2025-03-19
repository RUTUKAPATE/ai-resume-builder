import { ResumeContext } from "@/context/resume";
import { useUser, SignInButton } from "@clerk/nextjs";
import { ChangeEvent, FormEvent, useContext } from "react";

const BasicInfoCreate = () => {
	const ctx = useContext(ResumeContext);
	const { isSignedIn } = useUser();
	const { name, address, email, phone, title, setResume, saveResume } = ctx!;
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		saveResume();
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setResume((resume) => {
			const updatedResume = {
				...resume,
				[name]: value,
			};
			localStorage.setItem("resume", JSON.stringify(updatedResume));
			return updatedResume;
		});
	};
	return (
		<div className="flex flex-col gap-y-4">
			<h2 className="text-2xl font-bold">Personal information</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
				<input
					type="text"
					placeholder="Name"
					name="name"
					className="input input-bordered w-full max-w-xs"
					value={name}
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					placeholder="Job title"
					className="input input-bordered w-full max-w-xs"
					value={title}
					name="title"
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					placeholder="Address"
					className="input input-bordered w-full max-w-xs"
					value={address}
					name="address"
					onChange={handleChange}
					required
				/>
				<input
					type="email"
					placeholder="Email"
					name="email"
					className="input input-bordered w-full max-w-xs"
					value={email}
					onChange={handleChange}
				/>
				<input
					type="number"
					placeholder="Phone number"
					name="phone"
					className="input input-bordered w-full max-w-xs"
					value={phone}
					onChange={handleChange}
					required
				/>
				{isSignedIn ? (
					<button className="btn btn-success text-white">Save</button>
				) : (
					<SignInButton>
						<button className="btn btn-success text-white">
							Sign in to save
						</button>
					</SignInButton>
				)}
			</form>
		</div>
	);
};

export default BasicInfoCreate;
