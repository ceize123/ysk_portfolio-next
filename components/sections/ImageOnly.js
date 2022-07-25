import ImageRender from "../ImageRender";

function ImageOnly({prop, images}) {
	const data = prop;
	return (
		<div className="image-only">
			<ImageRender prop={images[0]} />
		</div>
	);
}

export default ImageOnly;