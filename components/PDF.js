import dynamic from "next/dynamic";

const FileViewer = dynamic(() => import("react-file-viewer"), {
	ssr: false
});

export default function Index() {
	return (
		<div className="w-full h-1/2">
			<FileViewer fileType="pdf" filePath="./image/about/resume_yung-shin_ko.pdf" />
		</div>
	);
}