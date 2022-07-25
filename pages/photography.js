import Image from "next/image";
import photography from "../public/image/about/photography.png";
import photography2 from "../public/image/about/photography2.png";
import photography3 from "../public/image/about/photography3.png";
import photography4 from "../public/image/about/photography4.png";
import photography5 from "../public/image/about/photography5.png";
import photography6 from "../public/image/about/photography6.png";
import photography7 from "../public/image/about/photography7.png";
import photography8 from "../public/image/about/photography8.png";
import photography9 from "../public/image/about/photography9.png";
import photography10 from "../public/image/about/photography10.png";
import photography11 from "../public/image/about/photography11.png";
import { useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";
import Link from "next/link";
import Footer from "../components/Footer";

function Resume() { 
	const {loaded} = useBetween(useShareLoading);
	return (
		<>
			<div className={`photography-page flex justify-center  flex-col items-center ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50 md:mt-14 mt-12"}`}>
				<div className="container">
					<div className="h-screen flex justify-center items-center flex-col">
						<h1 className="mb-3.5">Photography</h1>
						<h4>The stories from the corner</h4>
					</div>
					<div className="lg:px-20 md:px-10 photo-gallery">
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography2} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography3} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography4} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography5} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography6} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography7} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography8} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography9} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography10} alt="photography gallery" placeholder="blur" />
						</div>
						<div className="lg:pb-12 pb-10 md:hover:scale-105">
							<Image src={photography11} alt="photography gallery" placeholder="blur" />
						</div>
					</div>
				</div>
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