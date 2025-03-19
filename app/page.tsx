import ToggleMode from "@/components/toggle-mode/toggle-mode";

const Home = () => {
  return (
    <div>
      <ToggleMode />
    </div>
  )
}

export default Home;import Link from "next/link";

export default function Home() {
	return (
		<div className="relative isolate px-6 pt-14 lg:px-8">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-48"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				/>
			</div>
			<div className="mx-auto max-w-5xl">
				<div className="text-center">
					<h1 className="text-5xl font-semibold  ">
						Create Your Perfect Resume with AI Fast, Smart, and Tailored to You!
					</h1>
					<p className="mt-5 text-pretty text-lg font-medium  sm:text-xl/8">
						Our AI-powered resume builder helps you craft a standout resume in
						minutes. With smart suggestions and personalized templates, you can
						easily create a professional, job-winning resume that highlights
						your skills and experience. Start building your future today!
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							href="/resume/create"
							className="btn btn-success text-base text-white shadow-sm   "
						>
							Get started for free 🔥
						</Link>
					</div>
				</div>
			</div>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
				/>
			</div>
		</div>
	);
}
