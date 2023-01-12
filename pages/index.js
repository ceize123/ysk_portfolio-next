// import logo from "../public/image/home-page/logo.png";
import arrow from "../public/image/home-page/arrow.png";
import bgChat from "../public/image/home-page/bg-chat.png";
// import headShot from "../public/image/about/about-head-shot.png";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";
import { useState } from "react";
import { useShareWidth, useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";
import dbConnect from "../util/connection";
import Category from "../models/Category";
import Image from "next/image";
import Link from "next/link";
import { set } from "mongoose";

export default function Home({ works }) {
	const { loaded } = useBetween(useShareLoading);
	const [rotate, setRotate] = useState(false)
	// const [backgroundSize, setBackgroundSize] = useState(true);
	// const { windowWidth } = useBetween(useShareWidth);

	// useEffect(() => {
	// 	if (windowWidth >= 768 && windowWidth < 1800) {
	// 		setBackgroundSize("50% top/cover");
	// 	} else if (windowWidth >= 1800) {
	// 		setBackgroundSize("center/contain");
	// 	} else {
	// 		setBackgroundSize("center/cover");
	// 	}

	// }, [windowWidth]);

	// const handleArrow = () => {
	// 	const arrow = document.querySelector(".arrow");
	// 	arrow.classList.add("arrow-active");
	// 	setTimeout(() => {
	// 		arrow.classList.remove("arrow-active");
	// 	}, 1000);
	// };

	const handleRotate = (e) => {
		e.target.style.transform = `rotateY(${rotate ? '0' : '180'}deg)`

		setTimeout(() => {
			rotate ? e.target.classList.remove('rotate') : e.target.classList.add('rotate')
		}, 150)

		setTimeout(() => {
			setRotate(!rotate)
		}, 800)
	}

	return (
		<>
			<div className={`home ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50"}`}>
				<div className="h-screen">

					<section id="hero"
						className="relative flex flex-col justify-center items-center h-screen"
					>
						<div className="egg-center z-10 text-center flex items-center"
							onMouseOver={handleRotate}>
							{/* {<Image src={logo} alt="logo"
								className="egg-center-text"
							/>} */}
						</div>
						<div className="flex flex-col md:flex-row mt-8">
							<h1 className="mr-3">Hello! I am</h1>
							<div className="text-carousel overflow-hidden h-14">
								<div className="inner">
									<h1 className="inner-element lg:mb-3 mb-5">Shin!</h1>
									<h1 className="inner-element lg:mb-3 mb-5">a designer</h1>
									<h1 className="inner-element lg:mb-3 mb-5">a researcher</h1>
									<h1 className="inner-element">a creator</h1>
								</div>
							</div>
						</div>
						<h5 className="md:mb-5 mb-2">A UX designer based in Toronto</h5>
						<Link href="/#works">
							<Image className="cursor-pointer z-20" src={arrow} alt="arrow" width="76px" height="76px" />
						</Link>
						{/* <div className="z-20 mt-20 text-center left-8 sm:left-20 lg:left-auto text-secondary">
							<h5 className="mb-2">This is Shin!</h5>
							<h5 className="md:mb-4 mb-2">A UX designer based in Toronto</h5>
							<div className="arrow" onClick={handleArrow}>
								<Link href="/#works">
									<Image className="cursor-pointer z-20" src={arrow} alt="arrow" width="76px" height="76px" />
								</Link>
							</div>
						</div> */}
					</section>
				</div>
				<section id="works" className="relative flex justify-center items-center overflow-x-hidden pt-4 pb-12 lg:pt-20 md:pt-16 md:pb-28">
					<section className="carousel-section mx-auto">
						<Carousel works={works} />
					</section>
				</section>
				{/* <section id="about" className="relative flex flex-col justify-center items-center md:px-10 px-5 pt-12 pb-24 md:pt-24 md:pb-28">
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
				</section> */}
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