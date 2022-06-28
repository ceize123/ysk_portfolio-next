import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import Card from "./WorkCard";

function HomePageCarousel({ works }) {

	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + "</span>";
		},
	};
	return (
		<div className="mt-10">
			<Swiper
				pagination={pagination}
				modules={[Pagination]}
			>
				{works.map((item, idx) => (
					<SwiperSlide key={idx}>
						<div className="grid gap-14 grid-cols-3 slide-page">
							{item.works.map((work) => (
								<Card key={work._id} work={work} />
							))}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default HomePageCarousel;