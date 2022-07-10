import Image from "next/image";
import Link from "next/link";

function Card({ work, category, text }) {
	return (
		<Link href={`/works/${category}/${work.title}`}>
			<div className="card hover:text-secondary p-3 text-primary card">
				<Image src={work.heroImage[0]} alt="banner" width={100} height={60} layout="responsive" />
				{/* <div className="card-image relative block md:hidden">
					<Image src={work.heroImage[0]} alt="banner" layout="fill" />
				</div> */}
				{/* <h4>{work.description.slice(0, 40)}</h4> */}
				<h4>{text}</h4>
			</div>
		</Link>
	);
}

export default Card;