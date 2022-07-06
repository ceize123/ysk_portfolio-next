import Hero from "../../../components/sections/Hero";
import Overview from "../../../components/sections/Overview";
import TypeSection from "../../../components/TypeSection";
import { useEffect } from "react";

function Work({ category, work }) {
	console.log(work);
	// useEffect(() => {
	// 	const body = document.querySelector("body");
	// 	body.style.background = "#FFF";
	// 	body.style.overflowY = "visible";

	// }, []);

	return (
		<div className="front-end">
			<Hero data={work} />
			<section className="mx-auto container templates">
				<Overview prop={work} />
				{work.sections.map((section, idx) => (
					<section key={idx}>
						<TypeSection prop={section} />
					</section>
				))}
			</section>
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