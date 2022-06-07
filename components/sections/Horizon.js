import Image from "next/image";

function Horizon(prop) {
	const data = prop.prop;
	const imageUrl = data.image;
	return (
		<section className="horizon flex justify-center">
			<div className="text-left horizon-text self-center">
				<h1>{data.title}</h1>
				<h2>{data.paragraph}</h2>
			</div>
			<div className="shrink-0">
				<Image src={"/image/horizon.png"} alt="image" width={imageUrl.width} height={imageUrl.height}/>
			</div>
		</section>
	);
}

export default Horizon;