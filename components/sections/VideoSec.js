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
				{/* <ReactPlayer url={images[0]} controls={true} width="57vw" height="42vw" /> */}
				{/* {windowWidth >= 768
					? <ReactPlayer url={images[0]} controls={true} width="57vw" height="42vw" />
					: <ReactPlayer url={images[0]} controls={true} width="90vw" height="66vw" />
				} */}
			</div>
		</section>
	);
}

export default VideoSec;