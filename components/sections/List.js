import Image from "next/image";

function List(prop) {
	const data = prop.prop;
	const imageUrl = data.image;
	const lists = data.lists;
	return (
		<section className="list">
			<Image src={"/image/list.png"} alt="image" width={imageUrl.width} height={imageUrl.height}/>
			<div className="relative text-left -mt-2">
				{lists.map((list, idx) => (
					<div key={idx} className={`list-text ${data.color}`}>
						<h2>{list.title}</h2>
						<p>{list.paragraph}</p>
					</div>
				))}
			</div>
		</section>
	);
}

export default List;