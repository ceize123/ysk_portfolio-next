import Image from "next/image";
import React, {useEffect} from "react";

function Hero({ data }) {
	const work = data;
	const image = work.description;
	console.log(data.heroImage[0]);
	const heroImage = data.heroImage[0];

	console.log(heroImage.base64Image);

	return (
		// <div className={`hero-image ${data ? image : ""}`}>
		<div className="mr-2">
			<Image
				src={heroImage.base64Image}
				// Revoke data uri after image is loaded
				width={100}
				height={100}
				// layout='fill'
				alt={heroImage.name}
			/>
		</div>
		// </div>
	);
}

export default Hero;