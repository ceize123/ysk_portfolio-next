import Image from "next/image";
// Have to apply static image first to make dynamic image works. Don't know why
// import img2 from "../../public/image/imageOnly.png"; 

function ImageOnly({prop}) {
	const data = prop;
	const imageUrl = data.images[0];
	return (
		<div className="relative">
			<Image src={"/image/imageOnly.png"} alt="image" width={imageUrl.width} height={imageUrl.height}/>
			{/* <Image src={img2} alt="image" width="200" height="200"/> */}
			{/* Can't do this */}
			{/* <Image src={imageUrl} alt="image" width="200" height="200"/> */}
		</div>
	);
}

export default ImageOnly;