import Image from "next/image";
import { useState, useEffect  } from "react";

function ImageRender({ prop }) {
	const imageUrl = prop;
	const [height, setHeight] = useState(0);
	
	// https://stackoverflow.com/questions/69318420/next-js-image-component-props-onloadingcomplete-not-working
	const handleImageLoad = (e) => {
		setHeight(e.naturalHeight / e.naturalWidth * 100);
	};
	return (
		<div className="flex justify-center">
			<div className={imageUrl.includes('gif') && "gif" } style={{width: "100%", position: "relative"}}>
				<Image src={imageUrl} alt="image"
					onLoadingComplete={(e) => { handleImageLoad(e); }}
					width={100} height={height} layout="responsive" objectFit="contain"
					// placeholder="blur"
					blurDataURL={imageUrl}
					// layout="fill"
					// objectFit="contain"
				/>
			</div>
		</div>
	);
}
export default ImageRender;