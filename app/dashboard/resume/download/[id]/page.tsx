import DownloadPreview from "@/components/resume/download-preview";
import { getResumeById } from "@/lib/actions";
interface Props {
	params: Promise<{ id: string }>;
}
export async function generateMetadata1({ params }: Props) {
	const { id } = await params;
	const { data } = await getResumeById(id);
	return {
		title: `${data?.name} 's Resume`,
		description: `${data?.summary}`,
	};
}
const ResumeDownload = async ({ params }: Props) => {
	const { id } = await params;
	const { data } = await getResumeById(id);
	return (
		<div className="min-h-screen flex flex-col justify-center">
			<h2 className="text-3xl text-center font-bold">
				Hurray! your AI powered resume is ready to download or print.
			</h2>
			<DownloadPreview resume={data!} />
		</div>
	);
};

export default ResumeDownload;
