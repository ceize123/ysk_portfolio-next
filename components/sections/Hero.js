import React, { useState } from "react";
import { useShareWidth } from "../ShareStates";
import { useBetween } from "use-between";


function Hero({ data }) {
	const work = data;
	
	const { windowWidth } = useBetween(useShareWidth);
	const [heroImage] = useState(work.heroImage[0]);

	return (
		<div className="hero-image" style={{ background: `url(${heroImage}) no-repeat ${windowWidth < 2200 ? `50% ${windowWidth/100 + 50}%/cover` : "center/contain"}` }}>

		</div>
	);
}

export default Hero;