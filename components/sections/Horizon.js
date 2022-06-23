// import Image from "next/image";
import ImageRender from "../ImageRender";

function Horizon({prop}) {
	const data = prop;
	const imageUrl = data.images[0];
	console.log(imageUrl);
	return (
		<section className="horizon flex justify-center">
			<div className="text-left horizon-text self-center">
				<h1>{data.title}</h1>
				<h2>{data.paragraph}</h2>
			</div>
			{/* <div className="shrink-0"> */}
			{/* Have to have w-1/2 to render image */}
			<div className="shrink-0 w-1/2">
				{/* <Image src={"/image/horizon.png"} alt="image" width={imageUrl.width} height={imageUrl.height}/> */}
				<ImageRender prop={imageUrl} />
			</div>
		</section>
	);
}

export default Horizon;