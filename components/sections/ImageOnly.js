// import Image from "next/image";
// import { useState  } from "react";
// Have to apply static image first to make dynamic image works. Don't know why
// import img2 from "../../public/image/imageOnly.png"; 
import ImageRender from "../ImageRender";

function ImageOnly({prop}) {
	const data = prop;
	const imageUrl = data.images[0];
	// const [dimension, setDimension] = useState({ width: 0, height: 0 });
	
	// const handleImageLoad = (e) => {
	// 	setDimension({ width: e.naturalWidth, height: e.naturalHeight });
	// };
	return (
		<div className="flex justify-center">
			<ImageRender prop={imageUrl} />
		</div>
		// <div className="relative"
		// 	style={{
		// 		width: dimension.width,
		// 		height: dimension.height,
		// 	}}>
		// 	<Image src={imageUrl} alt="image"
		// 		onLoadingComplete={(e) => {handleImageLoad(e);}}
		// 		layout="fill"
		// 		objectFit="contain"
		// 	/>
		// </div>
	);
}

export default ImageOnly;