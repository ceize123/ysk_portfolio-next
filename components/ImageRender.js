import Image from "next/image";
import { useState  } from "react";

function ImageRender({ prop }) {
	const imageUrl = prop;
	const [height, setHeight] = useState(0);
	
	// https://stackoverflow.com/questions/69318420/next-js-image-component-props-onloadingcomplete-not-working
	const handleImageLoad = (e) => {
		setHeight(e.naturalHeight / e.naturalWidth * 100);
	};
	return (
		<div className="flex justify-center">
			<div style={{width: "100%", position: "relative"}}
				// style={{
				// 	width: dimension.width,
				// 	height: dimension.height,
				// }}
			>
				<Image src={imageUrl} alt="image"
					onLoadingComplete={(e) => { handleImageLoad(e); }}
					width={100} height={height} layout="responsive" objectFit="contain"
					// layout="fill"
					// objectFit="contain"
				/>
				{/* <Image src={img2} alt="image" width="200" height="200"/> */}
				{/* Can't do this */}
				{/* <Image src={imageUrl} alt="image" width="200" height="200"/> */}
			</div>
		</div>
	);
}
export default ImageRender;