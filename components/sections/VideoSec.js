import { useShareWidth } from "../ShareStates";
import { useBetween } from "use-between";
import ReactPlayer from "react-player";

function VideoSec({ prop, images }) {
	const { windowWidth } = useBetween(useShareWidth);
	const data = prop;
	// const imageUrl = data.images[0];
	return (
		<section className="relative video-section mx-5 xl:mx-auto lg:mx-12 md:mx-10" >
			<h1 className="text-left">{data.title}</h1>
			<div className="flex justify-center">
				{/* <ReactPlayer url={images[0]} controls={true} width="640px" height="400px" /> */}
				{windowWidth >= 768
					? <ReactPlayer url={images[0]} controls={true} width="640px" height="400px" />
					: <ReactPlayer url={images[0]} controls={true} width="375px" height="200px" />
				}
			</div>
		</section>
	);
}

export default VideoSec;