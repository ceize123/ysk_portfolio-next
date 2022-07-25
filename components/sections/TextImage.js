import ImageRender from "../ImageRender";

function TextImage({prop, images}) {
	const data = prop;
	return (
		// style={{ maxWidth: `${imageUrl.width}px` }} make div's max width as image width
		<section className="relative text-image mx-5 xl:mx-auto lg:mx-12 md:mx-10" >
			<h1 className="text-left">{data.title}</h1>
			<h2 className="text-left">{data.paragraph}</h2>
			<ImageRender prop={images[0]} />
		</section>
	);
}

export default TextImage;