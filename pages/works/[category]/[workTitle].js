import { useState, useEffect } from "react";
import Hero from "../../../components/sections/Hero";
import Overview from "../../../components/sections/Overview";
import TypeSection from "../../../components/TypeSection";
import Footer from "../../../components/Footer";
import dbConnect from "../../../util/connection";
import Category from "../../../models/Category";
import Work from "../../../models/Work";
import { useShareWidth, useShareLoading } from "../../../components/ShareStates";
import { useBetween } from "use-between";

function WorkDetail({ work }) {
	const { windowWidth } = useBetween(useShareWidth);
	const {loaded} = useBetween(useShareLoading);

	useEffect(() => {
		if (windowWidth >= 768) {
			const ul = document.querySelector("nav ul");
			ul.style.color = work.navTextColor;
			ul.style.backgroundColor = work.navColor;
		}
	}, [work]);

	return (
		<div className={`front-end ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50 md:mt-14 mt-12"}`}>
			{work &&
				<>
					<Hero data={work} />
					<section className="mx-auto container templates">
						<Overview prop={work} />
						{work.sections.map((section, idx) => (
							<section key={idx} >
								<TypeSection prop={section} />
							</section>
						))}
					</section>
				</>
			}
			<Footer />
		</div>
	);
}

export default WorkDetail;

export async function getStaticPaths() {
	// const response = await fetch("http://localhost:3000/api/works");
	// const response = await fetch(`${process.env.URL}/api/works`);
	// const data = await response.json();

	await dbConnect();
	const response = await Category.find();

	const data = await JSON.parse(JSON.stringify(response));
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
	// const response = await fetch(`http://localhost:3000/api/works/${workTitle}`);
	// const response = await fetch(`${process.env.URL}/api/works/${workTitle}`);
	// const data = await response.json();

	await dbConnect();
	const response = await Work.findOne({ "title": workTitle });

	const data = await JSON.parse(JSON.stringify(response));
	const work = data;

	return {
		props: {
			category: category,
			work,
		},
		revalidate: 10
	};
}