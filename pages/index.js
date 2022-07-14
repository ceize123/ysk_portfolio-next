import logo from "../public/image/home-page/logo.png";
import arrow from "../public/image/home-page/arrow.png";
import hero from "../public/image/home-page/hero.png";
import bgChat from "../public/image/home-page/bg-chat.png";
import bgAbout from "../public/image/home-page/bg-about.png";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";
import { useState, useEffect } from "react";
import { useSharePage, useShareWidth } from "../components/ShareStates";
import { useBetween } from "use-between";
import dbConnect from "../util/connection";
import Category from "../models/Category";
import Image from "next/image";
import Link from "next/link";
import { set } from "mongoose";

export default function Home({ works }) {
	const [scrolled, setScrolled] = useState(true);
	const [backgroundSize, setBackgroundSize] = useState(true);
	// const [page, setPage] = useState(0);
	const { page, setPage } = useBetween(useSharePage);
	const { windowWidth } = useBetween(useShareWidth);

	useEffect(() => {
		if (windowWidth > 1024) {
			setBackgroundSize("48% top/100.5%");
		} else if (windowWidth >= 768 && windowWidth < 1024) {
			setBackgroundSize("top/1034px 606px");
		} else {
			setBackgroundSize("50% -50px/1034px 606px");
		}

		
	}, [windowWidth]);
	
	useEffect(() => {
		const elements = document.querySelectorAll(".home > section");
		const body = document.querySelector("body");
		const handleOverflow = () => {
			body.style.overflowY = "visible";
			elements[0].classList.remove("lg:overflow-y-hidden");
			setPage(-1);
		};

		if (windowWidth > 1024) {
	
			const handleScroll = (e) => {
				if (page === -1) {
					body.style.overflowY = "hidden";
					elements[0].classList.add("lg:overflow-y-hidden");
					setPage(0);
					setScrolled(true);
				} else if (page >= 0 && page <= elements.length - 1) {
					if (e.deltaY > 0) {
						setPage(page < elements.length - 1 ? page + 1 : elements.length - 1);
					} else if (e.deltaY < 0) {
						setPage(page > 0 ? page - 1 : 0);
					}
					setScrolled(true);
				}
			};
	
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
				window.addEventListener("touchstart", handleOverflow);
			}
	
			let timer = setTimeout(() => setScrolled(false), 1500);

			
			// window.scrollBy(0, height);
			// window.scrollTo(0, height);
			return () => {
				clearTimeout(timer);
				window.addEventListener("wheel", handleScroll);
				window.addEventListener("touchstart", handleOverflow);
			};
		} else {
			if (!scrolled) {
				window.addEventListener("wheel", handleOverflow);
				window.addEventListener("touchstart", handleOverflow);
			}
	
			let timer = setTimeout(() => setScrolled(false), 1500);

			return () => {
				clearTimeout(timer);
				window.addEventListener("wheel", handleOverflow);
				window.addEventListener("touchstart", handleOverflow);
			};
		}
	}, [scrolled]);
	
	useEffect(() => {
		const elements = document.querySelectorAll(".home > section");
		if (page !== -1 && windowWidth > 1024) {
			elements.forEach((item, idx) => {
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
				}
	
				item.style.transform = `translateY(-${page * 130}vh)`;
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
				}
				
			});
		} else {
			elements.forEach((item, idx) => {
				let center;
				let cards = [];
				if (idx === 1) {
					cards = item.querySelectorAll(".card");
				} else {
					center = item.querySelector(".egg-center-div");
				}
	
				item.style.transform = "translateY(-0vh)";
				item.classList.remove("opacity-0");
				if (idx !== 1) {
					center.classList.remove("lg:scale-0");
				} else {
					cards.forEach((item) => {
						item.classList.remove("scale-0");
					});
				}
			});
		}

	}, [page]);

	const handleNav = (no) => {
		if (windowWidth > 1024) {
			setPage(no);
		}
	};

	const handleArrow = () => {
		const arrow = document.querySelector(".arrow");
		arrow.classList.add("arrow-active");
		setTimeout(() => {
			arrow.classList.remove("arrow-active");
		}, 1000);
	};

	return (
		<div className="home">
			{/* {page !== 0 && <Logo />} */}
			<section id="hero"
				// className="relative flex justify-center md:items-center h-screen lg:overflow-y-hidden"
				className="relative flex justify-center h-screen lg:overflow-y-hidden"
				style={{ background: `url("./image/home-page/hero.png") no-repeat ${backgroundSize}` }}
			>
				{/* {windowWidth >= 768
					? <Egg bgImage={hero} centerImage={logo} className="hero" />
					: <Egg bgImage={heroMobile} centerImage={logo} className="hero" />
				} */}
				{/* <Egg bgImage={hero} centerImage={logo} className="hero" /> */}
				<Egg centerImage={logo} className="hero" />
				<div className="z-20 absolute lg:bottom-8 bottom-5 text-center lg:left-24 md:left-12 left-5 ">
					<h5 className="mb-4">I am a UIUX Designer</h5>
					<div className="arrow" onClick={handleArrow}>
						<Link href={windowWidth > 1024 ? "/" : "/#works"}>
							<Image className="cursor-pointer" src={arrow} alt="arrow" width="76px" height="76px" onClick={() => handleNav(1)}/>
						</Link>
					</div>
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