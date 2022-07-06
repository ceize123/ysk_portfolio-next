import Image from "next/image";
import React,{ useState, useEffect } from "react";


function Hero({ data }) {
	const work = data;
	const heroImage = work.heroImage[0];

	//https://stackoverflow.com/questions/68732392/window-width-in-react
	const [width, setWidth] = useState(0);
  
	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [width]);


	return (
		<div className="hero-image" style={{ background: `url(${heroImage}) no-repeat ${width < 2200 ? `50% ${width/100 + 50}%/cover` : "center/contain"}` }}>
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