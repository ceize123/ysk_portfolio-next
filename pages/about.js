import Image from "next/image";
import headShot from "../public/image/about/about-head-shot.png";
import fashion from "../public/image/about/fashion.png";
import photo from "../public/image/about/photo.png";
import Footer from "../components/Footer";
import { useShareWidth, useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";
import { useRouter } from "next/router";

function About() {
	const router = useRouter();
	const {loaded} = useBetween(useShareLoading);
	const { windowWidth } = useBetween(useShareWidth);
	const handleModal = (option) => {
		router.push(`/${option}`);
	};

	return (
		<div className={`about-page ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50"}`}>
			<section className="md:pt-14 pt-12 flex justify-center">
				<div className="md:px-24 px-5 mt-8">
					<div className="flex">
						<div>
							<h1 className="mt-12 mb-5">Hello! I am Yung-Shin Ko!</h1>
							<div className="flex flex-col introduction">
								<p>Hello! My name is Shin and I am a dedicated and passionate UI/UX designer. I am currently volunteering at NEX Foundation, where I am excited to take on challenges and improve my skills. In my free time, I enjoy exploring new and exciting experiences through activities such as dancing, travel, photography, and fashion design. I am always looking for ways to grow and learn, and I am excited to see where my passions and talents will take me next.</p>
							</div>
						</div>

						<div className="head-shot hidden lg:block ml-24">
							<Image src={headShot} alt="head-shot" />	
						</div>
					</div>
					<div className="mt-6 mb-12">
						<button className="py-4 px-5 mt-6">
							<a
								href="https://drive.google.com/file/d/1sYVBZfGD5MJ5tieahrnH58IXlSbIt0su/view"
								target="_blank"
								rel="noopener noreferrer"	
								className="hover:text-secondary cursor-pointer text-xl font-bold">Resume</a>
						</button>
					</div>
					<div className="lg:mt-8 mt-12 md:mb-24 mb-12">
						<h2 className="mb-5">
							6 “W” Get To Know Me
						</h2>
						<div className="flex md:flex-wrap flex-col md:flex-row md:justify-between md:items-stretch items-center about-me-div">
							<div className="about-me-card p-7">
								<div className="card-text">
									<h5>What did I major before?</h5>
									<ul className="mt-4 text-secondary">
										<li>Interactive media design</li>
										<li>Fashion design</li>
									</ul>
								</div>
							</div>
							<div className="about-me-card p-7">
								<div className="card-text">
									<h5>What do I dislike?</h5>
									<ul className="mt-4 text-secondary">
										<li>Being late</li>
										<li>Irresponsible</li>
										<li>Mean and Rude</li>
									</ul>
								</div>
							</div>
							<div className="about-me-card p-7">
								<div className="card-text">
									<h5>What my friends said about me?</h5>
									<ul className="mt-4 text-secondary">
										<li>Considerate Friend</li>
										<li>Good listener</li>
										<li>Calming decision maker</li>
										<li>Problem solver </li>
									</ul>
								</div>
							</div>
							<div className="about-me-card p-7">
								<div className="card-text">
									<h5>What my ex-bosses said about me?</h5>
									<ul className="mt-4 text-secondary">
										<li>Efficient</li>
										<li>Precise</li>
										<li>Calm</li>
										<li>Reliable</li>
									</ul>
								</div>
							</div>
							<div className="about-me-card p-7">
								<div className="card-text">
									<h5>What’s my personality?</h5>
									<ul className="mt-4 text-secondary">
										<li>Responsible</li>
										<li>Empathy</li>
										<li>Open-minded</li>
										<li>Diligent</li>
										<li>Proactive</li>
									</ul>
								</div>
							</div>
							<div className="about-me-card p-7">
								<div className="card-text">
									<h5>What’s my hobby?</h5>
									<ul className="mt-4 text-secondary">
										<li>Dancing</li>
										<li>Traveling</li>
										<li>Eating</li>
										<li>Playing Board Game</li>
									</ul>
								</div>
							</div>
						</div>
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
		</div>
	);
}

export default About;