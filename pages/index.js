import logo from "../public/image/home-page/logo.png";
import hero from "../public/image/home-page/hero.png";
import bgChat from "../public/image/home-page/bg-chat.png";
import bgAbout from "../public/image/home-page/bg-about.png";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";


export default function Home({ works }) {

	let oldScrollY = 0;

	const [direction, setDirection] = useState('up');

	const controlDirection = (e) => {
		console.log(e.deltaY);
		// if (window.scrollY > oldScrollY) {
		// 	setDirection('down');
		// } else {
		// 	setDirection('up');
		// }
		// oldScrollY = window.scrollY;
		// console.log(oldScrollY);
		// if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		// 	console.log("hey");
		// }
	};

	// useEffect(() => {
	// 	window.addEventListener("wheel", controlDirection);
	// 	return () => {
	// 		window.removeEventListener("wheel", controlDirection);
	// 	};
	// },[]);
	return (
		<div className="home">
			<section className="relative flex justify-center items-center">
				<Egg bgImage={hero} centerImage={logo} className="hero" />
			</section>

			<div id="works" className="relative">
				<Logo />
				<section className="carousel-section mx-auto">
					<Carousel works={works} />
				</section>
			</div>

			<section id="about" className="relative flex justify-center items-center">
				<Logo />
				<Egg bgImage={bgAbout} className="about" text="About me" />
			</section>

			<section id="footer" className="relative flex justify-center items-center">
				<Logo />
				<Egg bgImage={bgChat} className="footer" text="footer" />
			</section>
		</div>
	);
}

export async function getStaticProps() {
	const response = await fetch("http://localhost:3000/api/works");
	const data = await response.json();
	const works = data;

	return {
		props: {
			works,
		},
	};
}