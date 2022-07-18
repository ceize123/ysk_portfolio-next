import Image from "next/image";
import headShot from "../public/image/about/about-head-shot.png";
import fashion from "../public/image/about/fashion.png";
import photo from "../public/image/about/photo.png";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { useShareModal, useShareWidth } from "../components/ShareStates";
import { useBetween } from "use-between";
import { useState } from "react";

function About() {
	const { open, setOpen } = useBetween(useShareModal);
	const { windowWidth } = useBetween(useShareWidth);
	const [PDF, setPDF] = useState("");
	const handleModal = (option) => {
		setOpen(true);
		setPDF(option);
	};

	return (
		<div className="about-page">
			<section className="md:pt-14 pt-12 flex justify-center">
				<div className="md:px-24 px-5 mt-8">
					<div className="flex">
						<div>
							<h1 className="mt-12 mb-5">Hello! I am Yung-Shin Ko!</h1>
							<div className="flex flex-col quote">
								<q>Life is a series of experience, each one of which makes us bigger, even though sometimes it is hard to realize this.</q>
								<p className="self-end">By Henry Ford</p>
							</div>
						</div>

						<div className="head-shot hidden lg:block ml-24">
							<Image src={headShot} alt="head-shot" />	
						</div>
					</div>

					<div className="lg:mt-8 mt-12 md:mb-24 mb-12">
						<h2 className="mb-5">
							8 “W” Get To Know Me
						</h2>
						<p className="mb-10">
							Where am I from: <span className="text-secondary">Taiwan</span>
						</p>
						<p className="mb-10">
							Where do I currently live in: <span className="text-secondary">Toronto Canada</span>
						</p>
						<p className="mb-10">
							What did I major before: <span className="text-secondary">Interactive Media Design and Fashion design</span>
						</p>
						<p className="mb-10">
							What do I dislike: <span className="text-secondary">Being late, Irresponsible, Mean and Rude</span>
						</p>
						<p className="mb-10">
							What my friends said about me: <span className="text-secondary">Considerate Friend, Good listener, Calming decision maker, Problem solver </span>
						</p>
						<p className="mb-10">
							What’s my personality: <span className="text-secondary">Responsible, Empathy, Open-minded, Diligent, Proactive</span>
						</p>
						<p className="mb-10">
							What’s my hobby: <span className="text-secondary">Dance, Exercise, Travel, Eating</span>
						</p>
						<p>
							What’s my faith: <span className="text-secondary">Life is all about experience</span>
						</p>
					</div>
					<div className="md:mb-24 mb-12">
						<h2>
							I am also interested in...
						</h2>
						<div className="flex justify-center text-center md:mt-12 mt-5 flex-col md:flex-row">
							<div className="md:w-1/2 sm:px-12 mb-5 md:mb-0 relative">
								<p className="md:mb-5 mb-2.5">
									Fashion Design
								</p>
								<div className="relative image-div cursor-pointer" onClick={() => windowWidth > 768 && handleModal("fashion")}>
									<Image src={fashion} alt="fashion" />
									<div className="items-center justify-center absolute bottom-0 w-full md:h-full see-more py-2.5" onClick={() => handleModal("fashion")}>
										<h2 className="z-10">See More</h2>
									</div>
								</div>
							</div>
							<div className="md:w-1/2 sm:px-12 relative">
								<p className="md:mb-5 mb-2.5">
									Photography
								</p>
								<div className="relative image-div cursor-pointer" onClick={() => windowWidth > 768 && handleModal("photography")}>
									<Image src={photo} alt="photography" />
									<div className="items-center justify-center absolute bottom-0 w-full md:h-full see-more py-2.5" onClick={() => handleModal("photography")}>
										<h2 className="z-10">See More</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
			{open && <Modal prop={PDF} />}
		</div>
	);
}

export default About;