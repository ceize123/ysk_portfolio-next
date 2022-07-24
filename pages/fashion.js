import Image from "next/image";
import fashion from "../public/image/about/fashion.png";
import { useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";

function Fashion() { 
	const {loaded, setLoaded} = useBetween(useShareLoading);
	return (
		<div className={`fashion-page md:p-10 p-5 flex justify-center ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50 md:mt-14 mt-12"}`} onLoad={() => setLoaded(true)}>
			<Image src={fashion} alt="fashion design" />
		</div>
	);
}

export default Fashion;