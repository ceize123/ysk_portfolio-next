import Image from "next/image";
import { useState  } from "react";

function ImageRender({ prop }) {
	const imageUrl = prop;
	const [dimension, setDimension] = useState({ width: 0, height: 0 });
	
	// https://stackoverflow.com/questions/69318420/next-js-image-component-props-onloadingcomplete-not-working
	const handleImageLoad = (e) => {
		setDimension({ width: e.naturalWidth, height: e.naturalHeight });
	};
	return (
		<div className="relative"
			style={{
				width: dimension.width,
				height: dimension.height,
			}}>
			<Image src={imageUrl} alt="image"
				onLoadingComplete={(e) => {handleImageLoad(e);}}
				layout="fill"
				objectFit="contain"
			/>
			{/* <Image src={img2} alt="image" width="200" height="200"/> */}
			{/* Can't do this */}
			{/* <Image src={imageUrl} alt="image" width="200" height="200"/> */}
		</div>
	)
}
export default ImageRender;