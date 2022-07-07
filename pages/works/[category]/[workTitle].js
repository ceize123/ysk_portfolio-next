import Hero from "../../../components/sections/Hero";
import Overview from "../../../components/sections/Overview";
import TypeSection from "../../../components/TypeSection";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../../components/Footer";

function Work({ category, work }) {
	useEffect(() => {
		AOS.init({
			// initialise with other settings
			delay: 200,
			duration: 800,
			offset: 0
		});

	}, []);

	return (
		<div className="front-end">
			<Hero data={work} />
			<section className="mx-auto container templates">
				<Overview prop={work} />
				{work.sections.map((section, idx) => (
					<section key={idx}
						data-aos={`${idx % 2 ? "fade-left" : "fade-right"}`}
						data-aos-easing="ease-out"
						data-aos-anchor-placement="center-bottom"
					>
						<TypeSection prop={section} />
					</section>
				))}
			</section>
			<Footer />
		</div>
	);
}

export default Work;

export async function getStaticPaths() {
	const response = await fetch("http://localhost:3000/api/works");
	const data = await response.json();
	let dataArray = [];

	data.map(category => {	
		category.works.map(work => {
			const param = { category: category.category, title: work.title };
			dataArray.push(param);
		});
	});

	const paths = dataArray.map(item => {
		return {
			params: {
				category: `${item.category}`,
				workTitle: `${item.title}`
			}
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const { category, workTitle } = params;
	const response = await fetch(`http://localhost:3000/api/works/${workTitle}`);
	const data = await response.json();
	const work = data;

	return {
		props: {
			category: category,
			work,
		},
	};
}