import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import Card from "./WorkCard";
import firstLetter from "./FirstLetter";

function HomePageCarousel({ works }) {
	const [slideIdx, setSlideIdx] = useState(0);
	
	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return `<span class="${className} text-sm">${works[index].category !== "UIUX" ? firstLetter("upper", works[index].category) : "UI/UX"}</span>`;
		},
	};

	return (
		<div>
			<Swiper
				className="outside-swiper"
				pagination={pagination}
				modules={[Pagination]}
				threshold={70}
				onSlideChange={(swiper) => { setSlideIdx(swiper.activeIndex); }}
			>
				{works.map((item, idx) => (
					<SwiperSlide key={idx}>
						<div className={`slide-element grid m-5 md:gap-x-6 gap-x-3 md:gap-y-7 gap-y-3 justify-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 slide-page mb-2 ${slideIdx === idx ? "opacity-100" : "opacity-0"}`}>
							{slideIdx === idx && item.works.map((work) => (
								<Card key={work._id} work={work} category={item.category} />
							))}
						</div>
						{/* <div className={`slide-element grid xl:mx-20 md:mx-12 mx-5 xl:gap-x-14 md:gap-x-7 gap-x-3 md:gap-y-7 gap-y-3 justify-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 slide-page mb-2 ${slideIdx === idx ? "opacity-100" : "opacity-0"}`}>
							{slideIdx === idx && item.works.map((work) => (
								<Card key={work._id} work={work} category={item.category} />
							))}
						</div> */}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default HomePageCarousel;