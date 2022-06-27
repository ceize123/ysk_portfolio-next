import Image from "next/image";
import logo from "../public/image/home-page/logo.png";
import hero from "../public/image/home-page/hero.png";
import Tilt from "react-parallax-tilt";
import Egg from "../components/HomePageEgg";


export default function Home() {
	return (
		<div className="hero-section relative flex justify-center items-center">
			{/* <div className="hero absolute z-10">
				<Image src={hero} alt="hero"
					placeholder="blur"
					blurDataURL={hero}
				/>
			</div> */}
			<Egg image={hero} className="hero" />
			
			{/* https://www.npmjs.com/package/react-parallax-tilt */}
			<Tilt className="z-20 logo flex justify-center items-center"
				perspective={500}>
				{/* <div className="logo flex justify-center items-center"> */}
				<Image src={logo} alt="logo"
					className="logo-text"
				/>

				{/* </div> */}
			</Tilt>
			

			{/* <div className="absolute circle-green">
				<Image src={circleGreen} alt="green" />
			</div> */}
		</div>
	);
}
