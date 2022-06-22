// import Image from "next/image";
import ImageRender from "../ImageRender";

function TextImage({prop}) {
	const data = prop;
	const imageUrl = data.images[0];
	return (
		// style={{ maxWidth: `${imageUrl.width}px` }} make div's max width as image width
		<section className="relative mx-auto text-image" >
			<h1 className="text-left">{data.title}</h1>
			<h2 className="text-left">{data.paragraph}</h2>
			<ImageRender prop={imageUrl} />
		</section>
	);
}

export default TextImage;