import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import find from "../../../../components/Find";
import TypeSection from "../../../../components/TypeSection";
import Hero from "../../../../components/sections/Hero";
import Overview from "../../../../components/sections/Overview";
import SelectMenu from "../../../../components/SelectMenu";
import Input from "../../../../components/Input";
import { types } from "../../../../data/type";
import { overall, page, list } from "../../../../data/column";
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
	const [column, setColumn] = useState({});

	// Scroll to end of page
	// https://stackoverflow.com/questions/23843619/js-for-smooth-scroll-to-the-bottom-of-the-page
	const { pathname } = useRouter();
	useEffect(() => {
		window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
	}, [pathname]);


	const submitSection = (e) => {
		e.preventDefault();
		console.log(column);
	};
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
			<section className="mx-auto container">
				<h2 className="text-2xl mb-3">1. Hero</h2>
			</section>
			<Hero data={work} />
			<section className="mt-5 mx-auto container">
				<h2 className="text-2xl mb-3">2. Overview</h2>
				<Overview prop={work} />
			</section>
			<div className="mx-auto container">
				{work.sections.map((section, idx) => (
					<section className="mt-5" key={idx}>
						<h2 className="text-2xl mb-3 text-left">{idx + 3}. {section.type}</h2>
						{/* {dynamicComponent(section, capitalizeFirstLetter(section.type))} */}
						<TypeSection prop={section}/>
					</section>
				))}
				<section className="mx-10 mt-10">
					<SelectMenu prop={types} option={type} name="Type" onChange={setType} />
					{/* {overall.map((item, idx) => (
						<Input key={idx}
							prop={item}
							onChange={e => {
								setColumn({ ...column, [item]: e.target.value });
							}} />
					))} */}
					<div className="mt-5 addNewSection">
						<form action="#" method="POST">
							<div className="shadow overflow-hidden rounded-md">
								<div className="px-4 py-5 bg-gray-50 sm:p-6">
									<div className={`grid grid-cols-1 ${type.charAt(0).toLowerCase() + type.slice(1)}`}>
										{overall.map((item, idx) => (
											<Input key={idx}
												prop={item}
												onChange={e => {
													setColumn({ ...column, [item]: e.target.value });
												}} />
										))}
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button type="submit"
										onClick={(e) => { submitSection(e); }}
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
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
	const work = find(workId);
	console.log(work);

	return {
		props: {
			work,
		}
	};
}