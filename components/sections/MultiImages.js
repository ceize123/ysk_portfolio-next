import Image from "next/image";
import ImageRender from "../ImageRender";

function MultiImages(prop) {
	const data = prop.prop;
	const imageUrls = data.images;
	const divWidth = imageUrls[0].width * 3 + 42 * 2; // 3 images + 2 gap
	return (
		// <section className="mx-auto multi-images" style={{ maxWidth: `${divWidth}px` }}>
		<section className="mx-auto multi-images">
			<h1 className="text-left">{data.title}</h1>
			<h2 className="text-left">{data.paragraph}</h2>
			<div className="grid grid-cols-3 gap-6">
				{imageUrls.map((image, idx) => (
					<ImageRender key={idx} prop={image} />
					// <div key={idx}>
					// 	<Image src={`/image/card${idx+1}.png`} alt="image" width={image.width} height={image.height}/>
					// </div>
				))}
			</div>
		</section>
	);
}

export default MultiImages;