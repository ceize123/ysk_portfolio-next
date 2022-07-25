import ImageRender from "../ImageRender";

function TitleImage({prop, images}) {
	const data = prop;
	return (
		// style={{ maxWidth: `${imageUrl.width}px` }} make div's max width as image width
		<section className="relative mx-auto title-image" >
			<h1 className="text-left lg:ml-12 md:ml-10 ml-5">{data.title}</h1>
			{images.map((image, idx) => (
				<ImageRender key={idx} prop={image} />
			))}
		</section>
	);
}

export default TitleImage;