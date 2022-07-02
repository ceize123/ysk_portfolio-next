import Image from "next/image";
import Tilt from "react-parallax-tilt";
import Footer from "./Footer";
import headShot from "../public/image/home-page/head-shot.png";
import { useState, useEffect } from "react";

function Egg({ bgImage, centerImage = "", text = "", className }) {

	let oldScrollY = 0;

	const [direction, setDirection] = useState('up');

	const controlDirection = (e) => {
		console.log(e.deltaY);
		const element = document.querySelector(".egg-hero");
		console.log(element);
		// if (window.scrollY > oldScrollY) {
		// 	setDirection('down');
		// } else {
		// 	setDirection('up');
		// }
		// oldScrollY = window.scrollY;
		// console.log(oldScrollY);
		// if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		// 	console.log("hey");
		// }
	};

	useEffect(() => {
		
		window.addEventListener("wheel", controlDirection);
		return () => {
			window.removeEventListener("wheel", controlDirection);
		};
	},[]);

	return (
		<>
			<div className={`absolute z-10 egg-bg ${className}`} >
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
			<Tilt className={`z-20 ${text !== "footer" && "egg-hover"} egg-${className} egg-center flex justify-center items-center`}
				perspective={550}>
				{centerImage && <Image src={centerImage} alt={centerImage}
					className="egg-center-text"
				/>}
				{text === "footer" ? <Footer /> : <h1>{text}</h1>}
			</Tilt>
		</>
	);
}

export default Egg;