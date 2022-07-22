import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import Footer from "./Footer";
// import headShot from "../public/image/home-page/head-shot.png";
import headShot from "../public/image/about/about-head-shot.png";
import headShotMobile from "../public/image/home-page/head-shot-mobile.png";
import { useSharePage, useShareWidth } from "./ShareStates";
import { useBetween } from "use-between";

function Egg({ bgImage = "", centerImage = "", text = "", className, mobile }) {

	const { windowWidth } = useBetween(useShareWidth);
	// const { setPage } = useBetween(useSharePage);
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
	// const handleNav = (no) => {
	// 	if (className === "hero") {
	// 		setPage(no);
	// 	}
	// };

	return (
		<>
			{bgImage ? className === "hero" ?
				<div className={`hidden z-10 egg-bg lg:flex justify-center items-center ${className}`} >
					<Image src={bgImage} alt={bgImage}
						placeholder="blur"
					/>
				</div>
				: <div className={`z-10 egg-bg flex justify-center items-center ${className}`} >
					<Image src={bgImage} alt={bgImage}
						placeholder="blur" />
				</div> : ""
			}

			{/* about */}
			{/* {className === "about" &&
				<div className="absolute block md:hidden z-10 head-shot top-12">
					<Image src={headShotMobile} alt="head-shot" width={100} height={63} layout="responsive" />
				</div>
			} */}

			{/* https://www.npmjs.com/package/react-parallax-tilt */}
			{text !== "footer"
				? <Link href="/#works">
					<div className="absolute egg-center-div z-10">
						<Tilt className="egg-hover egg-center flex justify-center items-center"
							perspective={550}>
							{centerImage && <Image src={centerImage} alt={centerImage}
								className="egg-center-text"
							/>}
							{/* <h1>{text}</h1> */}
						</Tilt>
					</div>
				</Link>
				: <div className="absolute egg-center-div z-10" >
					<Tilt className="egg-center flex justify-center items-center"
						perspective={550}>
						{centerImage && <Image src={centerImage} alt={centerImage}
							className="egg-center-text"
						/>}
						<Footer />
					</Tilt>
				</div>
			}

			{/* <div className={`z-20 egg-${className} flex justify-center items-center`}></div> */}
		</>
	);
}

export default Egg;