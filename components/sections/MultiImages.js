import ImageRender from "../ImageRender";

function MultiImages({ prop, images }) {
	const data = prop;

	return (
		// <section className="mx-auto multi-images" style={{ maxWidth: `${divWidth}px` }}>
		<section className="multi-images mx-5 xl:mx-auto lg:mx-12 md:mx-10">
			<h1 className="text-left">{data.title}</h1>
			<h2 className="text-left">{data.paragraph}</h2>
			<div className="grid lg:grid-cols-3 gap-6 grid-cols-2">
				{images.map((image, idx) => (
					<ImageRender key={idx} prop={image} />
				))}
			</div>
		</section>
	);
}

export default MultiImages;