import Image from "next/image";
import fashionDesign from "../public/image/about/fashionDesign.png";
import { useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";
import Link from "next/link";

function Fashion() { 
	const {loaded} = useBetween(useShareLoading);
	return (
		<div className={`fashion-page md:p-10 p-5 flex justify-center flex-col items-center ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50 md:mt-14 mt-12"}`}>
			<Image src={fashionDesign} alt="fashion design" />
			<Link href="/about">
				<div className="fixed bottom-3">
					<button className="py-4 px-5 mt-6"><h4 className="hover:text-secondary">Go Back</h4></button>
				</div>
			</Link>
		</div>
	);
}

export default Fashion;