import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import Footer from "./Footer";

function Egg({ bgImage = "", centerImage = "", text = "", className }) {

	return (
		<>
			{bgImage &&
				<div className={`z-10 egg-bg flex justify-center items-center ${className}`} >
					<Image src={bgImage} alt={bgImage}
						placeholder="blur" />
				</div>
			}

			{/* https://www.npmjs.com/package/react-parallax-tilt */}
			{text !== "footer"
				? <Link href="/#works">
					<div className="absolute egg-center-div z-10">
						<Tilt className="egg-hover egg-center flex justify-center items-center"
							perspective={550}>
							{centerImage && <Image src={centerImage} alt={centerImage}
								className="egg-center-text"
							/>}
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
		</>
	);
}

export default Egg;