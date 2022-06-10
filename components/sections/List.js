import Image from "next/image";

function List({prop}) {
	const data = prop;
	const imageUrl = data.image;
	const lists = data.lists;
	return (
		<section className="list-section">
			<Image src={"/image/list.png"} alt="image" width={imageUrl.width} height={imageUrl.height}/>
			<div className="relative text-left -mt-2 ml-12" style={{ background: `linear-gradient(to right, ${data.color} 40%, transparent 40%) no-repeat`}}>
				{lists.map((list, idx) => (
					<div key={idx} className="list-text">
						<h2>{list.listTitle}</h2>
						<p>{list.listParagraph}</p>
					</div>
				))}
			</div>
		</section>
	);
}

export default List;