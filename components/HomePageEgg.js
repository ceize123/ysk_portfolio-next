import Image from "next/image";
import Tilt from "react-parallax-tilt";
import Footer from "./Footer";
import headShot from "../public/image/home-page/head-shot.png";
import { useState, useEffect } from "react";

function Egg({ bgImage, centerImage = "", text = "", className }) {

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
			<div className={`relative z-10 egg-bg ${className}`} >
				<Image src={bgImage} alt={bgImage}
					// placeholder="blur"
					// blurDataURL={bgImage}
				/>
			</div>

			{/* about */}
			{className === "about" &&
				<div className="absolute z-10 head-shot">
					<Image src={headShot} alt="head-shot" />
				</div>
			}

			{/* https://www.npmjs.com/package/react-parallax-tilt */}
			{/* <Tilt className={`z-20 ${text !== "footer" && "egg-hover"} egg-center flex justify-center items-center`}
				perspective={550}>
				{centerImage && <Image src={centerImage} alt={centerImage}
					className="egg-center-text"
				/>}
				{text === "footer" ? <Footer /> : <h1>{text}</h1>}
			</Tilt> */}

			{/* <div className={`z-20 egg-${className} flex justify-center items-center`}></div> */}
		</>
	);
}

export default Egg;