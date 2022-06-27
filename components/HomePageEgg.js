import Image from "next/image";

function Egg({ image, className }) {
	return (
		<div className={`absolute z-10 ${className}`} >
			<Image src={image} alt={image}
				placeholder="blur"
				blurDataURL={image}
			/>
		</div>
	);
}

export default Egg;