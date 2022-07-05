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
			if (page >= 0 && page <= elements.length - 1) {
				if (e.deltaY > 0) {
					setHeight(page < elements.length - 1 ? height + elements[page].offsetHeight : height);
					setPage(page < elements.length - 1 ? page + 1 : elements.length - 1);
				} else if (e.deltaY < 0) {
					setHeight(height > 0 && height - elements[page - 1].offsetHeight);
					setPage(page > 0 ? page - 1 : 0);
				}
				setScrolled(true);
			}
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
			const bg = item.querySelector(".egg-bg");
			const center = item.querySelector(".egg-center-div");
			// item.style.transform = `translateY(-${page*100}vh)`;

			
			item.style.transform = `translateY(-${page * 150}vh)`;
			if (page === idx) {

				setTimeout(() => {
					bg.classList.remove("opacity-0");
					// item.classList.remove("opacity-0");
				}, 800);
				setTimeout(() => {
					center.classList.remove("opacity-0");
				}, 900);
			} else {
				bg.classList.add("opacity-0");
				center.classList.add("opacity-0");
				// item.classList.add("opacity-0");
				
				// item.style.transform = `translateY(-${height}px)`;

				// item.style.transform = `translateY(-${page * 150}vh)`;

				// center.style.transform = `translateY(${page * 150}vh)`;
				// setTimeout(() => {
				// 	center.style.transform = "translateY(0)";
				// }, 600);
			}
			
		});

	}, [page]);

	return (
		<div className="home">
			{/* {page !== 0 && <Logo />} */}
			<Logo opacity={page !== 0 ? 100 : 0} />
			<section id="hero" className="relative flex justify-center items-center">
				<Egg bgImage={hero} centerImage={logo} className="hero" />
			</section>
			<div className="empty-div"></div>
			{/* <section id="works" className="relative">
				<section className="carousel-section mx-auto">
					<Carousel works={works} />
				</section>
			</section>
			<div className="empty-div"></div> */}
			<section id="about" className="relative flex justify-center items-center">
				<Egg bgImage={bgAbout} className="about" text="About me" />
			</section>
			<div className="empty-div"></div>
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