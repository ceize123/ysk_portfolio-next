import logo from "../public/image/home-page/logo.png";
import arrow from "../public/image/home-page/arrow.png";
import bgChat from "../public/image/home-page/bg-chat.png";
import bgAbout from "../public/image/home-page/bg-about.png";
import headShot from "../public/image/about/about-head-shot.png";
import hero from "../public/image/home-page/hero.png";
import heroMobile from "../public/image/home-page/hero-mobile.png";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";
import { useState, useEffect } from "react";
import { useSharePage, useShareWidth, useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";
import dbConnect from "../util/connection";
import Category from "../models/Category";
import Image from "next/image";
import Link from "next/link";
import { set } from "mongoose";

export default function Home({ works }) {
	const [scrolled, setScrolled] = useState(true);
	const {loaded, setLoaded} = useBetween(useShareLoading);
	const [backgroundSize, setBackgroundSize] = useState(true);
	// const [page, setPage] = useState(0);
	// const { page, setPage } = useBetween(useSharePage);
	const { windowWidth } = useBetween(useShareWidth);

	useEffect(() => {
		// if (windowWidth > 1024) {
		// 	setBackgroundSize("48% top/100.5%");
		// } else if (windowWidth >= 768 && windowWidth < 1024) {
		// 	setBackgroundSize("top/1034px 606px");
		// } else {
		// 	setBackgroundSize("50% -50px/1034px 606px");
		// }
		if (windowWidth >= 768 && windowWidth < 1800) {
			setBackgroundSize("50% top/cover");
		} else if (windowWidth >= 1800) {
			setBackgroundSize("center/contain");
		} else {
			// setBackgroundSize("50% -50px/1034px 606px");
			setBackgroundSize("center/cover");
		}

		
	}, [windowWidth]);

	// useEffect(() => {
	// 	if (loaded) {
	// 		const elements = document.querySelectorAll(".home > section");
	// 	}
	// }, [loaded]);

	// const pageEffect = () => {
	// 	const elements = document.querySelectorAll(".home > section");
	// 	elements.forEach((item, idx) => {
	// 		let center;
	// 		let cards = [];
	// 		if (idx === 1) {
	// 			cards = item.querySelectorAll(".card");
	// 			// https://stackoverflow.com/questions/70915932/is-it-possible-to-use-child-index-in-calc-in-css
	// 			// cards.forEach((item, idx) => {
	// 			// 	item.style.setProperty("--custom-index", idx);
	// 			// });
	// 		} else {
	// 			center = item.querySelector(".egg-center-div");
	// 		}

	// 		item.style.transform = `translateY(-${page * 130}vh)`;
	// 		if (page === idx) {
	// 			setTimeout(() => {
	// 				item.classList.remove("opacity-0");
	// 			}, 600);
	// 			if (idx !== 1) {
	// 				setTimeout(() => {
	// 					center.classList.remove("scale-0");
	// 				}, 1000);
	// 			} else {
	// 				setTimeout(() => {
	// 					cards.forEach((item) => {
	// 						item.classList.remove("scale-0");
	// 					});
	// 				}, 1000);
	// 			}
	// 		} else {
	// 			setTimeout(() => {
	// 				item.classList.add("opacity-0");
	// 			}, 200);
	// 			if (idx !== 1) {
	// 				center.classList.add("scale-0");
	// 			} else {
	// 				cards.forEach((item) => {
	// 					item.classList.add("scale-0");
	// 				});
	// 			}
	// 		}
	// 	});
	// };

	// useEffect(() => {
	// 	pageEffect();
	// }, []);
	
	// useEffect(() => {
	// 	const elements = document.querySelectorAll(".home > section");
	// 	const body = document.querySelector("body");
	// 	let move = 0;
		
	// 	const handleScroll = (e) => {
	// 		if (page >= 0 && page <= elements.length - 1) {
	// 			if (e.deltaY > 0) {
	// 				setPage(page < elements.length - 1 ? page + 1 : elements.length - 1);
	// 			} else if (e.deltaY < 0) {
	// 				setPage(page > 0 ? page - 1 : 0);
	// 			}
	// 			setScrolled(true);
	// 		}
	// 	};

	// 	const saveStart = (e) => {
	// 		move = e.changedTouches[0].clientY;
	// 	};

	// 	const handleTouchScroll = (e) => {
	// 		if (move - e.changedTouches[0].clientY > 15) {
	// 			setPage(page < elements.length - 1 ? page + 1 : elements.length - 1);
	// 		} else if (move - e.changedTouches[0].clientY < -15) {
	// 			setPage(page > 0 ? page - 1 : 0);
	// 		}
	// 		setScrolled(true);
	// 	};

	// 	if (!scrolled) {
	// 		window.addEventListener("wheel", handleScroll);
	// 		window.addEventListener("touchstart", saveStart);
	// 		window.addEventListener("touchend", handleTouchScroll);
	// 	}

	// 	let timer = setTimeout(() => setScrolled(false), 1500);

	// 	return () => {
	// 		clearTimeout(timer);
	// 		window.addEventListener("wheel", handleScroll);
	// 		window.addEventListener("touchstart", saveStart);
	// 		window.addEventListener("touchend", handleTouchScroll);
	// 	};
	// }, [scrolled]);
	
	// useEffect(() => {
	// 	pageEffect();
	// }, [page]);

	// const handleNav = (no) => {
	// 	setPage(no);
	// };

	useEffect(() => {
		const loadingPage = document.querySelector(".loading");
		if (loaded) {
			setTimeout(() => {
				loadingPage.classList.add("hidden");
			}, 4000);
		}
	}, [loaded]);

	const handleArrow = () => {
		const arrow = document.querySelector(".arrow");
		arrow.classList.add("arrow-active");
		setTimeout(() => {
			arrow.classList.remove("arrow-active");
		}, 1000);
	};

	return (
		<>
			<div className={`loading fixed h-screen w-screen ${loaded ? "opacity-0 z-40" : "z-50"}`}>
				<div className="loading-text">
					<span className="loading-text-words">L</span>
					<span className="loading-text-words">O</span>
					<span className="loading-text-words">A</span>
					<span className="loading-text-words">D</span>
					<span className="loading-text-words">I</span>
					<span className="loading-text-words">N</span>
					<span className="loading-text-words">G</span>
				</div>
			</div>
			<div className={`home ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50"}`} onLoad={() => setLoaded(true)}>
				{/* {page !== 0 && <Logo />} */}
				<div className="h-screen -translate-y-14 md:-translate-y-0 mb-20 md:mb-28">

					<section id="hero"
						className="relative flex justify-center items-center h-screen lg:h-auto lg:-ml-1 lg:-mt-1"
						style={{ background: windowWidth < 1024 && `url("./image/home-page/hero-mobile.png") no-repeat ${backgroundSize}` }}
					>
						{/* {windowWidth >= 768
							? <Egg bgImage={hero} centerImage={logo} className="hero" />
							: <Egg bgImage={heroMobile} centerImage={logo} className="hero" />
						} */}
						{/* <Egg bgImage={hero} centerImage={logo} className="hero" /> */}
						<Egg bgImage={hero} centerImage={logo} className="hero" />
						<div className="absolute -bottom-1 lg:-bottom-8 z-20 text-center lg:translate-x-0 sm:-translate-x-0 left-8 sm:left-20 lg:left-auto">
							<h5 className="md:mb-4 mb-2">UIUX Designer</h5>
							<div className="arrow" onClick={handleArrow}>
								<Link href="/#works">
									<Image className="cursor-pointer z-20" src={arrow} alt="arrow" width="76px" height="76px" />
								</Link>
							</div>
						</div>
					</section>
				</div>
				<section id="works" className="relative flex justify-center items-center overflow-x-hidden pt-4 pb-12 lg:pt-20 md:pt-16 md:pb-28">
					<section className="carousel-section mx-auto">
						<Carousel works={works} />
					</section>
				</section>
				<section id="about" className="relative flex flex-col justify-center items-center md:px-10 px-5 pt-12 pb-24 md:pt-24 md:pb-28">
					{/* <Egg bgImage={bgAbout} className="about" text="About me" mobile={windowWidth < 768} /> */}
					<div className="about-image md:mb-9 mb-2">
						<Image src={headShot} alt="head-shot" />
					</div>
					<div className="flex flex-col md:flex-row">
						<h1 className="mr-3">Hello! I am</h1>
						<div className="text-carousel overflow-hidden h-14">
							<div className="inner">
								<h1 className="inner-element mb-2">Yung-Shin Ko!</h1>
								<h1 className="inner-element mb-2">a designer</h1>
								<h1 className="inner-element mb-2">a researcher</h1>
								<h1 className="inner-element">a creator</h1>
							</div>
						</div>
					</div>
					<Link href="/about">
						<button className="py-4 px-5 mt-6"><h4 className="hover:text-secondary">About Me</h4></button>
					</Link>
				</section>
				<section id="footer" className="relative flex justify-center items-center overflow-x-hidden pt-16 pb-24 md:pt-20 md:pb-28">
					<Egg bgImage={bgChat} className="footer" text="footer" />
				</section>
			</div>
		</>
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