import Image from "next/image";
import Link from "next/link";

function Card({ work, category }) {
	return (
		<Link href={`/works/${category}/${work.title}`}>
			<div className="card hover:text-secondary p-3 text-primary card">
				<Image src={work.heroImage[0]} alt="banner" width={100} height={60} layout="responsive" />
				<h4>{work.description}</h4>
			</div>
		</Link>
	);
}

export default Card;