import logo from "../public/image/home-page/logo.png";
import hero from "../public/image/home-page/hero.png";
import bgChat from "../public/image/home-page/bg-chat.png";
import bgAbout from "../public/image/home-page/bg-about.png";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";


export default function Home({ works }) {

	return (
		<div className="home">
			<section className="relative flex justify-center items-center">
				<Egg bgImage={hero} centerImage={logo} className="hero" />
			</section>

			<section id="works" className="carousel-section mx-auto">
				<Carousel works={works} />
			</section>

			<section id="about" className="relative flex justify-center items-center">
				<Egg bgImage={bgAbout} className="about" text="About me" />
			</section>

			<section id="footer" className="relative flex justify-center items-center">
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