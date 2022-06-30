import Image from "next/image";
import logo from "../public/image/home-page/logo.png";
import hero from "../public/image/home-page/hero.png";
import bgChat from "../public/image/home-page/bg-chat.png";
import Tilt from "react-parallax-tilt";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";


export default function Home({ works }) {

	return (
		<div className="home">
			<section className="relative flex justify-center items-center">
				<Egg bgImage={hero} centerImage={logo} text="hero" />
			</section>

			<section className="carousel-section mx-auto">
				<Carousel works={works} />
			</section>

			<section className="relative flex justify-center items-center">
				<Egg bgImage={bgChat} text="footer"/>
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