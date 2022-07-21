import { useShareWidth } from "../ShareStates";
import { useBetween } from "use-between";
import ReactPlayer from "react-player";

function VideoSec({ prop, images }) {
	const { windowWidth } = useBetween(useShareWidth);
	const data = prop;
	// const imageUrl = data.images[0];
	return (
		<section className="relative video-section mx-5 xl:mx-auto lg:mx-12 md:mx-10" >
			<h1 className="text-center">{data.title}</h1>
			<div className="flex justify-center">
				<ReactPlayer url={data.paragraph} controls={true} width="100%" height="auto" />
			</div>
			{/* <div className="md:flex justify-center hidden lg:hidden">
				<ReactPlayer url={data.paragraph} controls={true} width="720px" height="auto" />
			</div>
			<div className="flex justify-center md:hidden">
				<ReactPlayer url={data.paragraph} controls={true} width="350px" height="auto" />
			</div> */}
		</section>
	);
}

export default VideoSec;