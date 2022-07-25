import Image from "next/image";
import resumeImg from "../public/image/about/resume.png";
import { useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";

function Resume() { 
	const {loaded} = useBetween(useShareLoading);
	return (
		<div className={`resume-page md:p-10 p-5 flex justify-center ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50 md:mt-14 mt-12"}`}>
			<Image src={resumeImg} alt="resume" />
		</div>
	);
}

export default Resume;