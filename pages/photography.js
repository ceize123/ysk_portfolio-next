import Image from "next/image";
import photography from "../public/image/about/photography.png";
import photography2 from "../public/image/about/photography2.png";
import photography3 from "../public/image/about/photography3.png";
import photography4 from "../public/image/about/photography4.png";
import { useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";
import Link from "next/link";
import Footer from "../components/Footer";

function Resume() { 
	const {loaded} = useBetween(useShareLoading);
	return (
		<>
			<div className={`photography-page md:p-10 p-5 flex justify-center flex-col items-center ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50 md:mt-14 mt-12"}`}>
				<Image src={photography} alt="photography gallery" placeholder="blur" />
				<Image src={photography2} alt="photography gallery" placeholder="blur" />
				<Image src={photography3} alt="photography gallery" placeholder="blur" />
				<Image src={photography4} alt="photography gallery" placeholder="blur" />
				<Link href="/about">
					<div className="fixed bottom-5">
						<button className="py-4 px-5 mt-6"><h4 className="hover:text-secondary">Go Back</h4></button>
					</div>
				</Link>
			</div>
			<Footer />
		</>
	);
}

export default Resume;