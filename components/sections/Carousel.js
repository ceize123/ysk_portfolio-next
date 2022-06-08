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
					<SwiperSlide key={idx} className="carousel-page grid grid-cols-12 gap-8">
						<div className="col-start-2 col-span-5">
							<div className={`grid grid-cols-2 ${page.images.length > 2 ? "carousel-image-div" : ""}`} style={{ height: `${page.images[0].height}px` }}>
								{page.images.map((image, index) => (
									// className={index <= 1 ? "carousel-page-active" : "hidden"}
									<div className="px-2" key={index}>
										{index % 2 === 0 ? <h3 className="mb-4">Before</h3> : <h3 className="mb-4">After</h3>}
										<Image src={`/image/carousel-page${idx + 1}-${index + 1}.png`} alt="image" width={image.width} height={image.height} />
									</div>
								))}
							</div>
							
						</div>
						<div className="col-span-5 text-left carousel-text-div">
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