// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination } from "swiper";
import { useState, useEffect } from "react";
import ImageRender from "../ImageRender";

function Carousel({ prop, images }) {
	const data = prop;
	const pages = data.pages;
	const [array, setArray] = useState([]);

	// https://thewebdev.info/2021/02/21/how-to-split-a-javascript-array-into-chunks/
	useEffect(() => {
		let result = [];
		let count = 0;
		pages.forEach((item) => {
			// result.push(data.images.length % item.imagesNeed ? [] : [data.images.slice(i, i + item.imagesNeed)]);
			// result.push(data.images.length % item.imagesNeed ? [] : [data.images.slice(count, count + item.imagesNeed)]);
			result.push([images.slice(count, count + item.imagesNeed)]);
			count += item.imagesNeed;
		});
		setArray(result);
	}, []);

	return (
		<section className="carousel-section">
			<Swiper
				navigation={true}
				loop={true}
				loopFillGroupWithBlank={true}
				pagination={{ clickable: true }}
				modules={[Navigation, Pagination]}
			>
				{pages.map((page, pIdx) => (
					<SwiperSlide key={pIdx} className="carousel-page px-5 md:px-12 lg:px-0 pt-6 lg:pt-12 flex flex-col lg:grid lg:grid-cols-12 gap-6">
						<div className="lg:col-start-2 lg:col-span-5">
							{array.length !== 0 && array[pIdx].map((elem, idx) => (
								// <div key={idx} className={`grid grid-cols-2 ${page.imagesNeed > 2 ? "carousel-image-div" : ""}`} style={{ height: `${elem[0].height}px` }}>
								<div key={idx} className={`grid grid-cols-2 ${page.imagesNeed > 2 ? "carousel-image-div" : ""}`}>
									{elem.map((item, index) => (
										<div className="p-0 lg:p-2 text-center" key={index}>
											{index % 2 === 0 ? <h3 className="mb-4">Before</h3> : <h3 className="mb-4">After</h3>}
											<ImageRender prop={item} />
										</div>
									))}
								</div>
							))}
							
						</div>
						<div className="lg:col-span-5 text-left carousel-text-div lg:ml-5 lg:mt-12 lg:pb-24 pb-12">
							<h2>Issue:</h2>
							<p>{page.issue}</p>
							<h2>Description:</h2>
							<p>{page.description}</p>
							<h2>Solution:</h2>
							<p>{page.solution}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}

export default Carousel;