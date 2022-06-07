import React, { useRef, useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

function Carousel(prop) {
	const data = prop.prop;
	const pages = data.pages;
	return (
		<section className="carousel">
			<Swiper
				cssMode={true}
				navigation={true}
				pagination={true}
				mousewheel={true}
				keyboard={true}
				modules={[Navigation, Pagination, Mousewheel, Keyboard]}
				className="mySwiper"
			>
				{pages.map((page, idx) => (
					<SwiperSlide key={idx} className="carousel-page grid grid-cols-12 gap-5">
						<div className="col-start-2 col-span-5">
							<div>
								<h3>Before</h3>
							</div>
							<div>
								<h3>After</h3>
							</div>
						</div>
						<div className="col-span-5 text-left">
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