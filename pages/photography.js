import Image from "next/image";
import photography from "../public/image/about/photography.png";
import { useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";

function Resume() { 
	const {loaded, setLoaded} = useBetween(useShareLoading);
	return (
		<div className={`photography-page md:p-10 p-5 flex justify-center ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50 md:mt-14 mt-12"}`} onLoad={() => setLoaded(true)}>
			<Image src={photography} alt="photography gallery" />
		</div>
	);
}

export default Resume;