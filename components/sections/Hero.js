import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useShareWidth } from "../ShareStates";
import { useBetween } from "use-between";


function Hero({ data }) {
	const work = data;
	
	const { windowWidth } = useBetween(useShareWidth);
	const [heroImage, setHeroImage] = useState(work.heroImage[0]);
	//https://stackoverflow.com/questions/68732392/window-width-in-react
	// const [width, setWidth] = useState(0);
  
	// useEffect(() => {
	// 	function handleResize() {
	// 		setWidth(window.innerWidth);
	// 	}
	// 	window.addEventListener("resize", handleResize);
	// 	handleResize();
	// 	return () => {
	// 		window.removeEventListener("resize", handleResize);
	// 	};
	// }, [width]);
	useEffect(() => {
		if (windowWidth >= 768) {
			setHeroImage(work.heroImage[0]);
		} else {
			setHeroImage(work.heroImageMobile[0]);
		}
	}, [windowWidth]);


	return (
		<div className="hero-image" style={{ background: `url(${heroImage}) no-repeat ${windowWidth < 2200 ? `50% ${windowWidth/100 + 50}%/cover` : "center/contain"}` }}>
			{/* <div className="mr-2">
				<Image
					src={heroImage}
					// Revoke data uri after image is loaded
					// width={100}
					// height={100}
					layout='fill'
					alt="Hero Image"
					placeholder="blur"
					blurDataURL={heroImage}
				/>
			</div> */}
		</div>
	);
}

export default Hero;