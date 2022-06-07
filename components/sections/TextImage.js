import Image from "next/image";

function TextImage(prop) {
	const data = prop.prop;
	const imageUrl = data.image;
	return (
		// style={{ maxWidth: `${imageUrl.width}px` }} make div's max width as image width
		<section className="relative mx-auto text-image" style={{ maxWidth: `${imageUrl.width}px` }} >
			<h1 className="text-left">{data.title}</h1>
			<h2 className="text-left">{data.paragraph}</h2>
			<Image src={"/image/textImage.png"} alt="image" width={imageUrl.width} height={imageUrl.height}/>
		</section>
	);
}

export default TextImage;