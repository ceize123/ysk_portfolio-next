// import Image from "next/image";
import ImageRender from "../ImageRender";

function Horizon({prop, images}) {
	const data = prop;

	return (
		<section className="horizon flex flex-col lg:flex-row xl:justify-center lg:ml-12 mx-5 md:mx-8 lg:mx-0">
			<div className="text-left horizon-text self-center mb-12 lg:mb-0">
				<h1>{data.title}</h1>
				<h2>{data.paragraph}</h2>
			</div>
			{/* <div className="shrink-0"> */}
			{/* Have to have w-1/2 to render image */}
			<div className="shrink-0 lg:w-1/2">
				{/* <Image src={"/image/horizon.png"} alt="image" width={imageUrl.width} height={imageUrl.height}/> */}
				<ImageRender prop={images[0]} />
			</div>
		</section>
	);
}

export default Horizon;