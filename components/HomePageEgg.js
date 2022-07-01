import Image from "next/image";
import Tilt from "react-parallax-tilt";
import Footer from "./Footer";
import headShot from "../public/image/home-page/head-shot.png";

function Egg({ bgImage, centerImage = "", text = "", className }) {
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
			<Tilt className={`z-20 ${text !== "footer" && "egg-hover"} egg-center flex justify-center items-center`}
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