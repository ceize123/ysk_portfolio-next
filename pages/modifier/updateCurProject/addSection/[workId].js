import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import find from "../../../../components/Find";
import Section from "../../../../components/Section";
import Hero from "../../../../components/sections/Hero";
import SelectInput from "../../../../components/SelectInput";
import { types } from "../../../../data/type";
// import Overview from "../../../../components/sections/Overview";
// import ImageOnly from "../../../../components/sections/ImageOnly";
// import TextImage from "../../../../components/sections/TextImage";                           
// import MultiImages from "../../../../components/sections/MultiImages";
// import Carousel from "../../../../components/sections/Carousel";
// import TextOnly from "../../../../components/sections/TextOnly";
// import Horizon from "../../../../components/sections/Horizon";
// import List from "../../../../components/sections/List";

// Dynamic Layout used in the function dynamicComponent
// const LAYOUTS = {
// 	Overview,
// 	ImageOnly,
// 	TextImage,
// 	MultiImages,
// 	Carousel,
// 	TextOnly,
// 	Horizon,
// 	List
// };

function AddNewSection({ work }) {
	const [type, setType] = useState(types[0]);

	// Scroll to end of page
	// https://stackoverflow.com/questions/23843619/js-for-smooth-scroll-to-the-bottom-of-the-page
	const { pathname } = useRouter();
	useEffect(() => {
		window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
	}, [pathname]);

	// function capitalizeFirstLetter(string) {
	// 	return string.charAt(0).toUpperCase() + string.slice(1);
	// }


	// // https://stackoverflow.com/questions/66238016/reactjs-dynamic-component-name-with-closing-tag-and-children-elements
	// function dynamicComponent(prop, type) {
	// 	const Layout = LAYOUTS[type];
	// 	return <Layout prop={prop}/>;
	// }

	return (
		<div className="mt-3">
			<h1 className="text-3xl mb-3 text-center">
				Add New Section to {work.id} | {work.title} | {work.description}
			</h1>
			<div className="mx-auto container">
				<h2 className="text-2xl mb-3">1. Hero</h2>
			</div>
			<Hero data={work}/>
			<div className="mx-auto text-center container">
				{work.sections.map((section, idx) => (
					<section className="mt-5" key={idx}>
						<h2 className="text-2xl mb-3 text-left">{idx + 2}. {section.type}</h2>
						{/* {dynamicComponent(section, capitalizeFirstLetter(section.type))} */}
						<Section prop={section}/>
					</section>
				))}
				<section className="mx-12 mt-12 add-new-section">
					<SelectInput data={types} option={type} name="Type" onChange={setType}/>
				</section>
			</div>
		</div>
	);
}

export default AddNewSection;

export async function getStaticPaths() {
	const response = await fetch("http://localhost:3000/api/works");
	const data = await response.json();

	const paths = data.map(work => {
		return {
			params: {
				workId: `${work.id}`
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
	const { workId } = params;
	console.log(workId);
	const work = find(workId);
	console.log(work);

	return {
		props: {
			work,
		}
	};
}