import ReactPlayer from "react-player";

function VideoSec({ prop, images }) {
	const data = prop;
	return (
		<section className="relative video-section mx-5 xl:mx-auto lg:mx-12 md:mx-10" >
			<h1 className="text-center">{data.title}</h1>
			<div className="flex justify-center">
				<ReactPlayer url={data.paragraph} controls={true} width="800px" height="auto" />
			</div>
		</section>
	);
}

export default VideoSec;