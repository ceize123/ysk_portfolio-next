import Image from "next/image";

function Card({ work }) {

	return (
		<div className="card hover:text-secondary p-3 text-primary">
			<Image src={work.heroImage[0]} alt="banner" width={100} height={60} layout="responsive"/>
			<h4>{work.description}</h4>
		</div>
	);
}

export default Card;