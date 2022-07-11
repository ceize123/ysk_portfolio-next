import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import Footer from "./Footer";
import headShot from "../public/image/home-page/head-shot.png";
import headShotMobile from "../public/image/home-page/head-shot-mobile.png";
import { useSharePage } from "../components/ShareStates";
import { useBetween } from "use-between";
import { useState, useEffect } from "react";

function Egg({ bgImage, centerImage = "", text = "", className, mobile }) {

	const { setPage } = useBetween(useSharePage);

	// const [width, setWidth] = useState(25);
	// const [height, setHeight] = useState(25);
	
	// useEffect(() => {
	// 	const element = document.querySelector(".egg-hero");
	// 	const handleScale = (e) => {
	// 		console.log(e.deltaY);
			
	// 		console.log(element);
	// 		if (e.deltaY > 0) {
	// 			setHeight(height + 8);
	// 			setWidth(width + 8);
	// 		} else if (e.deltaY < 0 && width > 25) {
	// 			setHeight(height - 8);
	// 			setWidth(width - 8);
	// 		}
	// 	};

	// 	window.addEventListener("wheel", handleScale);
	// 	element.style.width = `${width}vw`;
	// 	element.style.height = `${height}vw`;
	// 	return () => {
	// 		window.removeEventListener("wheel", handleScale);
	// 	};
	// },[width, height]);

	return (
		<>
			<div className={`absolute z-10 egg-bg ${className}`} >
				<Image src={bgImage} alt={bgImage}
					placeholder="blur"
					// blurDataURL={bgImage}
				/>
			</div>

			{/* about */}
			{className === "about" &&
				<div className="absolute z-10 head-shot">
					{!mobile ? <Image src={headShot} alt="head-shot" /> : <Image src={headShotMobile} alt="head-shot" />}
				</div>
			}

			{/* https://www.npmjs.com/package/react-parallax-tilt */}
			<Link href={className === "about" ? "/about" : "/"}>
				<div className="egg-center-div z-20 lg:scale-0" >
					<Tilt className={`${text !== "footer" && "egg-hover"} egg-center flex justify-center items-center`}
						perspective={550}>
						{centerImage && <Image src={centerImage} alt={centerImage}
							className="egg-center-text"
						/>}
						{text === "footer" ? <Footer /> : <h1>{text}</h1>}
					</Tilt>
				</div>
			</Link>

			{/* <div className={`z-20 egg-${className} flex justify-center items-center`}></div> */}
		</>
	);
}

export default Egg;