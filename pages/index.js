import logo from "../public/image/home-page/logo.png";
import hero from "../public/image/home-page/hero.png";
import heroMobile from "../public/image/home-page/heroMobile.png";
import bgChat from "../public/image/home-page/bg-chat.png";
import bgAbout from "../public/image/home-page/bg-about.png";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { useSharePage, useShareWidth } from "../components/ShareStates";
import { useBetween } from "use-between";
import dbConnect from "../util/connection";
import Category from "../models/Category";
import Link from "next/link";

export default function Home({ works }) {
	const [scrolled, setScrolled] = useState(true);
	// const [page, setPage] = useState(0);
	const { page, setPage } = useBetween(useSharePage);
	const { windowWidth } = useBetween(useShareWidth);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const response = await fetch("/api/works");
	// 		const data = await response.json();
	// 		setWorks(data);
	// 	};

	// 	// call the function
	// 	fetchData()
	// 		// make sure to catch any error
	// 		.catch(console.error);
	// }, []);
	
	useEffect(() => {
		if (windowWidth > 1024) {

			const elements = document.querySelectorAll(".home > section");
			// let move = 0;
	
			const handleScroll = (e) => {
				if (page >= 0 && page <= elements.length - 1) {
					if (e.deltaY > 0) {
						// setHeight(page < elements.length - 1 ? height + elements[page].offsetHeight : height);
						setPage(page < elements.length - 1 ? page + 1 : elements.length - 1);
					} else if (e.deltaY < 0) {
						// setHeight(height > 0 && height - elements[page - 1].offsetHeight);
						setPage(page > 0 ? page - 1 : 0);
					}
					setScrolled(true);
				}
			};
	
			// const saveStart = (e) => {
			// 	move = e.changedTouches[0].clientY;
			// };
	
			// const handleTouchScroll = (e) => {
			// 	if (move - e.changedTouches[0].clientY > 15) {
			// 		setPage(page < elements.length - 1 ? page + 1 : elements.length - 1);
			// 	} else if (move - e.changedTouches[0].clientY < -15) {
			// 		setPage(page > 0 ? page - 1 : 0);
			// 	}
			// 	setScrolled(true);
			// };
	
			if (!scrolled) {
				window.addEventListener("wheel", handleScroll);
				// window.addEventListener("touchstart", saveStart);
				// window.addEventListener("touchend", handleTouchScroll);
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
				window.addEventListener("wheel", handleScroll);
				// window.addEventListener("touchstart", saveStart);
				// window.addEventListener("touchend", handleTouchScroll);
			};
		}
	}, [scrolled]);
	
	useEffect(() => {
		if (windowWidth > 1024) { 
			const elements = document.querySelectorAll(".home > section");
			// const outsideSwiper = document.querySelector(".home > section .swiper");
			// const outsideActiveSlide = outsideSwiper.querySelector(".swiper-slide-active");
			// console.log(outsideActiveSlide);
			elements.forEach((item, idx) => {
				// const bg = item.querySelector(".egg-bg");
				let center;
				
				let cards = [];
				if (idx === 1) {
					cards = item.querySelectorAll(".card");
					// https://stackoverflow.com/questions/70915932/is-it-possible-to-use-child-index-in-calc-in-css
					// cards.forEach((item, idx) => {
					// 	item.style.setProperty("--custom-index", idx);
					// });
				} else {
					center = item.querySelector(".egg-center-div");
					// console.log(center);
				}
	
				
				item.style.transform = `translateY(-${page * 150}vh)`;
				if (page === idx) {
					setTimeout(() => {
						item.classList.remove("opacity-0");
					}, 600);
					if (idx !== 1) {
						setTimeout(() => {
							center.classList.remove("lg:scale-0");
						}, 1000);
					} else {
						setTimeout(() => {
							cards.forEach((item) => {
								item.classList.remove("scale-0");
							});
						}, 1000);
					}
				} else {
					setTimeout(() => {
						item.classList.add("opacity-0");
					}, 200);
					if (idx !== 1) {
						center.classList.add("lg:scale-0");
					} else {
						cards.forEach((item) => {
							item.classList.add("scale-0");
						});
					}
					
					// item.style.transform = `translateY(-${height}px)`;
	
					// center.style.transform = `translateY(${page * 150}vh)`;
					// setTimeout(() => {
					// 	center.style.transform = "translateY(0)";
					// }, 600);
				}
				
			});
		}

	}, [page]);

	// useEffect(() => {
	// 	const body = document.querySelector("body");
	// 	body.style.background = "linear-gradient(80.33deg, rgba(229, 229, 229, 0.7) 13.28%, rgba(245, 245, 245, 0.7) 46.01%, rgba(230, 230, 230, 0.7) 65.96%, rgba(255, 255, 255, 0.175) 95.62%), linear-gradient(252.44deg, #D2D2D2 5.8%, rgba(255, 255, 255, 0.45) 100%)";
	// 	body.style.overflowY = "hidden";

	// }, []);

	return (
		<div className="home">
			{/* {page !== 0 && <Logo />} */}
			<Logo opacity={page !== 0 ? 100 : 0} />
			<section id="hero" className="relative flex justify-center items-center h-screen lg:overflow-y-hidden">
				{windowWidth >= 768
					? <Egg bgImage={hero} centerImage={logo} className="hero" />
					: <Egg bgImage={heroMobile} centerImage={logo} className="hero" />
				}
				<div className="z-20 block md:hidden absolute bottom-5 text-center left-5">
					<h5 className="mb-16">I am a UIUX Designer</h5>
				</div>
			</section>
			<div className="empty-div hidden lg:block"></div>
			<section id="works" className="relative flex justify-center items-center h-auto md:h-screen lg:overflow-y-hidden">
				<section className="carousel-section mx-auto">
					<Carousel works={works} />
				</section>
			</section>
			<div className="empty-div hidden lg:block"></div>
			<section id="about" className="relative flex justify-center items-center h-screen lg:overflow-y-hidden">
				<Egg bgImage={bgAbout} className="about" text="About me" mobile={windowWidth < 768} />
			</section>
			<div className="empty-div hidden lg:block"></div>
			<section id="footer" className="relative flex justify-center items-center h-screen lg:overflow-y-hidden">
				<Egg bgImage={bgChat} className="footer" text="footer" />
			</section>
		</div>
	);
}

export async function getStaticProps() {
	await dbConnect();
	const response = await Category.find();
	// const response = await fetch(`${process.env.URL}/api/works`);
	// const data = await response.json();

	const data = await JSON.parse(JSON.stringify(response));
	const works = data;

	return {
		props: {
			works,
		},
		revalidate: 10
	};
}