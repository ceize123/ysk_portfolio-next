import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import Footer from "./Footer";
import headShot from "../public/image/home-page/head-shot.png";
import headShotMobile from "../public/image/home-page/head-shot-mobile.png";
import { useSharePage, useShareWidth } from "./ShareStates";
import { useBetween } from "use-between";

function Egg({ bgImage = "", centerImage = "", text = "", className, mobile }) {

	const { windowWidth } = useBetween(useShareWidth);
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
	const handleNav = (no) => {
		if (windowWidth > 1024 && className === "hero") {
			setPage(no);
		}
	};

	return (
		<>
			{bgImage && <div className={`absolute z-10 egg-bg ${className}`} >
				<Image src={bgImage} alt={bgImage}
					placeholder="blur"
				// blurDataURL={bgImage}
				/>
			</div>}

			{/* about */}
			{className === "about" &&
				<div className="absolute z-10 head-shot md:-right-28 lg:-bottom-24 md:bottom-0">
					{!mobile ? <Image src={headShot} alt="head-shot" width={100} height={100} layout="responsive" /> : <Image src={headShotMobile} alt="head-shot" width={100} height={100} layout="responsive" />}
				</div>
			}

			{/* https://www.npmjs.com/package/react-parallax-tilt */}
			{text !== "footer"
				? <Link href={className === "about" ? "/about" : windowWidth > 1024 ? "/" : "/#works"}>
					<div className="egg-center-div z-20 lg:scale-0" onClick={() => handleNav(1)}>
						<Tilt className={`${text !== "footer" && "egg-hover"} egg-center flex justify-center items-center`}
							perspective={550}>
							{centerImage && <Image src={centerImage} alt={centerImage}
								className="egg-center-text"
							/>}
							<h1>{text}</h1>
						</Tilt>
					</div>
				</Link>
				: <div className="egg-center-div z-20 lg:scale-0" >
					<Tilt className={`${text !== "footer" && "egg-hover"} egg-center flex justify-center items-center`}
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