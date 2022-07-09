// import Image from "next/image";
import ImageRender from "../ImageRender";

function List({prop, images}) {
	const data = prop;
	const lists = data.lists;
	return (
		<section className="list-section">
			<ImageRender prop={images[0]} />
			<div className="relative text-left lg:ml-24 md:ml-16 ml-5 lg:py-24 py-7 list-section-background" style={{ background: `linear-gradient(to right, ${data.color} 40%, transparent 40%) no-repeat` }}>
				{lists.map((list, idx) => (
					<div key={idx} className="list-text md:ml-7 md:mb-7 ml-5 mb-5 ">
						<h2 className="lg:mx-24 md:mx-12 mx-7">{list.listTitle}</h2>
						<p className="lg:mx-24 md:mx-12 mx-7">{list.listParagraph}</p>
					</div>
				))}
			</div>
		</section>
	);
}

export default List;