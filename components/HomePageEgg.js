import Image from "next/image";
import Tilt from "react-parallax-tilt";
import Footer from "./Footer";

function Egg({ bgImage, centerImage = "", text = "" }) {
	return (
		<>
			<div className={`absolute z-10 egg-bg ${text}`} >
				<Image src={bgImage} alt={bgImage}
					// placeholder="blur"
					// blurDataURL={bgImage}
				/>
			</div>

			{/* https://www.npmjs.com/package/react-parallax-tilt */}
			<Tilt className={`z-20 ${text !== "footer" && "egg-hover"} egg-center flex justify-center items-center`}
				perspective={550}>
				{centerImage && <Image src={centerImage} alt={centerImage}
					className="egg-center-text"
				/>}
				{text === "footer" ? <Footer /> : ""}
			</Tilt>
		</>
	);
}

export default Egg;