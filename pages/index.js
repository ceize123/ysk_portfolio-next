import logo from "../public/image/home-page/logo.png";
import arrow from "../public/image/home-page/arrow.png";
import bgChat from "../public/image/home-page/bg-chat.png";
import headShot from "../public/image/about/about-head-shot.png";
import hero from "../public/image/home-page/hero.png";
import Egg from "../components/HomePageEgg";
import Carousel from "../components/HomePageCarousel";
import { useState, useEffect } from "react";
import { useShareWidth, useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";
import dbConnect from "../util/connection";
import Category from "../models/Category";
import Image from "next/image";
import Link from "next/link";
import { set } from "mongoose";

export default function Home({ works }) {
	const {loaded} = useBetween(useShareLoading);
	const [backgroundSize, setBackgroundSize] = useState(true);
	const { windowWidth } = useBetween(useShareWidth);

	useEffect(() => {
		if (windowWidth >= 768 && windowWidth < 1800) {
			setBackgroundSize("50% top/cover");
		} else if (windowWidth >= 1800) {
			setBackgroundSize("center/contain");
		} else {
			setBackgroundSize("center/cover");
		}

	}, [windowWidth]);

	const handleArrow = () => {
		const arrow = document.querySelector(".arrow");
		arrow.classList.add("arrow-active");
		setTimeout(() => {
			arrow.classList.remove("arrow-active");
		}, 1000);
	};

	return (
		<>
			<div className={`home ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50"}`}>
				<div className="h-screen -translate-y-14 md:-translate-y-0 mb-20 md:mb-28">

					<section id="hero"
						className="relative flex justify-center items-center h-screen lg:h-auto lg:-ml-1 lg:-mt-1"
						style={{ background: windowWidth < 1024 && `url("./image/home-page/hero-mobile.png") no-repeat ${backgroundSize}` }}
					>
						<Egg bgImage={hero} centerImage={logo} className="hero" />
						<div className="absolute -bottom-1 lg:-bottom-8 z-20 text-center lg:translate-x-0 sm:-translate-x-0 left-8 sm:left-20 lg:left-auto">
							<h5 className="md:mb-4 mb-2">UI/UX Designer</h5>
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