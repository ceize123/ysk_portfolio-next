import Image from "next/image";
import React from "react";

function Hero({ data }) {
	const work = data;
	const heroImage = work.heroImage[0];

	return (
		<div className="hero-image">
			<div className="mr-2">
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
			</div>
		</div>
	);
}

export default Hero;