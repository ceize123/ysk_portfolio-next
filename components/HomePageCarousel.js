import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import Card from "./WorkCard";
import firstLetter from "./FirstLetter";
import { useBetween } from "use-between";
import { useShareWidth } from "./ShareStates";

function HomePageCarousel({ works }) {
	const [insideSlide, setInsideSlide] = useState([]);
	const { windowWidth } = useBetween(useShareWidth);

	useEffect(() => {
		let slideArray = [];
		let temp = [];
		let size;
		if (windowWidth < 768) {
			size = 2;
		} else {
			size = 3;
		}
		

		works.forEach((item) => {
			slideArray.push(item.works);
		});
		slideArray.forEach(item => {
			temp = [];
			if (item.length > size) {
				for (let i = 0; i < item.length; i += size)
					temp.push(item.slice(i, i + size));
			}
			setInsideSlide((prev) => [...prev, temp.length > 0 ? temp : [item]]);
		});
		// works.forEach((item) => {
		// 	setInsideSlide((prev) => [...prev, { [item.category]: item.works }]);
		// });
	}, [works]);
	
	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			// return '<span class="' + className + '">' + (index + 1) + "</span>";
			return `<span class="${className} text-sm">${firstLetter("upper", works[index].category)}</span>`;
		},
	};
	const insidePagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return `<span class=${className}>${index + 1}</span>`;
		},
	};

	return (
		// <div className="pt-24">
		<div>
			<Swiper
				className="outside-swiper"
				pagination={pagination}
				modules={[Pagination]}
				threshold={70}
				// onSlideChange={(swiper) => { setSlideIdx(swiper.activeIndex); }}
			>
				{works.map((item, idx) => (
					<SwiperSlide key={idx}>
						{/* {windowWidth < 768
							? <div className="flex flex-col slide-page items-center">
								{item.works.map((work) => (
									<Card key={work._id} work={work} />
								))}
							</div>
							: insideSlide.length > 0 &&
							<Swiper
								className="inside-swiper"
								pagination={insidePagination}
								modules={[Pagination]}
								threshold={20}
								// onSlideChange={(swiper) => { setInsideSlideIdx(swiper.activeIndex); }}
							>
								{insideSlide[idx].map((ele, index) => (
									<SwiperSlide key={index}>
										<div className="grid gap-x-14 gap-y-7 grid-cols-3 slide-page">
											{ele.map((work) => (
												<Card key={work._id} work={work} category={item.category} />
											))}
										</div>
									</SwiperSlide>
								))}
							
							</Swiper>
						} */}
						{insideSlide.length > 0 && <Swiper
							className="inside-swiper"
							pagination={insidePagination}
							modules={[Pagination]}
							threshold={20}
						// onSlideChange={(swiper) => { setInsideSlideIdx(swiper.activeIndex); }}
						>
							{insideSlide[idx].map((ele, index) => (
								<SwiperSlide key={index}>
									<div className="grid lg:mx-20 md:mx-12 mx-5 lg:gap-x-14 md:gap-x-7 gap-x-3 md:gap-y-7 gap-y-3  md:grid-cols-3 grid-cols-2 slide-page">
										{ele.map((work) => (
											<Card key={work._id} work={work} category={item.category}
												text={windowWidth >= 768 ? work.description : `${work.description.split(" ").slice(0, 3).join(" ")}...`} />
										))}
									</div>
								</SwiperSlide>
							))}
						
						</Swiper>}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default HomePageCarousel;