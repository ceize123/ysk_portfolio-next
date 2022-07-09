// import Image from "next/image";
import ImageRender from "../ImageRender";

function TitleImage({prop, images}) {
	const data = prop;
	// const imageUrl = data.images[0];
	return (
		// style={{ maxWidth: `${imageUrl.width}px` }} make div's max width as image width
		<section className="relative mx-auto title-image" >
			<h1 className="text-left lg:ml-12 md:ml-10 ml-5">{data.title}</h1>
			<ImageRender prop={images[0]} />
		</section>
	);
}

export default TitleImage;