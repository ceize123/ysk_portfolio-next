import logo from "../public/image/home-page/logo.png";
import hero from "../public/image/home-page/hero.png";
import bgChat from "../public/image/home-page/bg-chat.png";
import bgAbout from "../public/image/home-page/bg-about.png";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";

export default function Home({ works }) {
	const [scrolled, setScrolled] = useState(false);
	const [page, setPage] = useState(0);
	const [height, setHeight] = useState(0);
	
	useEffect(() => {
		// const wHeight = window.innerHeight;
		const elements = document.querySelectorAll(".home > section");
		const handleScroll = (e) => {
			console.log(e);
			console.log(elements);
			console.log(page);
			if (e.deltaY > 0) {
				setHeight(height + elements[page].offsetHeight);
				setPage(page < elements.length - 1 && page + 1);
			} else if (e.deltaY < 0) {
				setHeight(height - elements[page].offsetHeight);
				setPage(page > 0 && page - 1);
			}
			setScrolled(true);
		};

		if (!scrolled) {
			window.addEventListener("wheel", handleScroll);
		}
		// elements.forEach((item, idx) => {
		// 	item.style.transform = `translateY(-${page*100}vh)`;
		// 	// if (page === idx) {
		// 	// 	console.log(page, "123");
		// 	// 	setTimeout(() => {
		// 	// 		item.style.transform = `translateY(-${page*100}vh)`;
		// 	// 	}, 500);
		// 	// } else {
		// 	// 	console.log(idx, item.style.transform);
		// 	// 	item.style.transform = `translateY(-${page*100}vh)`;
		// 	// }

		// });
		// console.log(page);

		
		let timer = setTimeout(() => setScrolled(false), 1500);


		// const interval = setInterval(() => {
		// 	console.log(height);
		// 	// elements[0].style.transform = `translateY(-${height}vh)`;
		// }, 1500);
		
		// window.scrollBy(0, height);
		// window.scrollTo(0, height);
		return () => {
			// clearInterval(interval);
			clearTimeout(timer);
			window.removeEventListener("wheel", handleScroll);
		};
	}, [scrolled]);
	
	useEffect(() => {
		const elements = document.querySelectorAll(".home > section");
		elements.forEach((item, idx) => {
			// item.style.transform = `translateY(-${page*100}vh)`;

			if (page === idx) {
				setTimeout(() => {
					item.style.transform = `translateY(-${height}px)`;
				}, 600);
			} else {
				item.style.transform = `translateY(-${height}px)`;
			}
		});
		console.log(page);
	}, [page]);

	return (
		<div className="home">
			<section id="hero" className="relative flex justify-center items-center">
				<Egg bgImage={hero} centerImage={logo} className="hero" />
			</section>

			<section id="works" className="relative">
				<Logo />
				<section className="carousel-section mx-auto">
					<Carousel works={works} />
				</section>
			</section>

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