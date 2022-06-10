import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import find from "../../../components/Find";
import TypeSection from "../../../components/TypeSection";
import Hero from "../../../components/sections/Hero";
import Overview from "../../../components/sections/Overview";
import SelectMenu from "../../../components/SelectMenu";
import Input from "../../../components/Input";
import { types } from "../../../data/type";
import { overallCol, pageCol, listCol } from "../../../data/column";
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

// const columns = [
// 	overall,
// 	page,
// 	list
// ];

function AddNewSection({ work }) {
	const [type, setType] = useState(types[0]);
	const [overall, setOverall] = useState({});
	// const [page, setPage] = useState([]);
	// const [list, setList] = useState([]);

	// handle array of object from fields
	const [array, setArray] = useState([]);

	const handleArrayChange = (e, idx) => {
		const { name, value } = e.target;
		const ary = [...array];
		ary[idx][name] = value;
		setArray(ary);
	};

	const handleArrayRemove = (idx) => {
		// store old array first, then splice the one that has been removed
		const list = [...array];
		list.splice(idx, 1);
		setArray(list);
	};

	const handleArrayAdd = () => {
		if (type === "List") {
			setArray([...array, { listTitle: "", listParagraph: "" }]);
		} else if (type === "Carousel") {
			setArray([...array, { issue: "", description: "", solution: "" }]);
		}
		console.log(array);
	};

	useEffect(() => {
		if (type === "List") {
			setArray([{
				listTitle: "",
				listParagraph: ""
			}]);
		} else if (type === "Carousel") {
			setArray([{
				issue: "",
				description: "",
				solution: ""
			}]);
		}
	}, [type]);
	// handle array of object from fields


	// useEffect(() => {

	// 	setOverall(prevState => ({
	// 		...overall,
	// 		pages: [...prevState.pages, page],
	// 		lists: [...prevState.lists, list],
	// 	}));
	// },[list, page]);

	// Scroll to end of page
	// https://stackoverflow.com/questions/23843619/js-for-smooth-scroll-to-the-bottom-of-the-page
	const { pathname } = useRouter();
	useEffect(() => {
		window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
	}, [pathname]);


	const submitSection = (e) => {
		e.preventDefault();

		console.log(overall);
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

					<div className="mt-5 addNewSection">
						<form action="#" method="POST">
							<div className="shadow overflow-hidden rounded-md">
								<div className="px-4 py-5 bg-gray-50 sm:p-6">
									<div className={`grid grid-cols-1 ${type.charAt(0).toLowerCase() + type.slice(1)}`}>
										{/* {columns.map((column ,index) => (
											<div key={index} className="mt-4">
												{column.map((item, idx) => (
													<Input key={idx}
														prop={item}
														onChange={e => {
															setOverall({ ...overall, [item]: e.target.value });
														}} />
												))}
											</div>
										))} */}

										<h3>Overall</h3>
										{overallCol.map((item, idx) => (
											<Input key={idx}
												prop={item}
												onChange={e => {
													setOverall({ ...overall, [item]: e.target.value });
												}} />
										))}
										
										<h3 className="col-text">{type === "List" ? "Lists" : "Pages"}</h3>
										
										{/* handle array of object from fields */}
										{/* https://github.com/chaoocharles/add-remove-form-field/blob/main/src/App.js */}
										{(type === "List" || type === "Carousel") && array.map((singleList, index) => (
											<div key={index} className="flex mt-3">
												<div className="w-3/4 shrink-0">
													{type === "List"
														? listCol.map((item, idx) => (
															<Input key={idx}
																prop={item}
																onChange={(e) => handleArrayChange(e, index)}
															/>
														))
														: pageCol.map((item, idx) => (
															<Input key={idx}
																prop={item}
																val={singleList}
																onChange={(e) => handleArrayChange(e, index)}
															/>))}
													{array.length - 1 === index && (
														<button
															type="button"
															onClick={handleArrayAdd}
															className="inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md border-indigo-600 hover:border-indigo-700">	
															<span>Add a {type === "List" ? "List" : "Page"}</span>
														</button>
													)}
												</div>
												<div className="ml-10 self-center">
													{array.length !== 1 && (
														<button
															type="button"
															onClick={() => handleArrayRemove(index)}
															className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
															<span>Remove</span>
														</button>
													)}
												</div>
											</div>
											
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

	let idArray = [];
	// console.log(data[0].works);
	// const paths = data.map(work => {
	// 	return {
	// 		params: {
	// 			workId: `${work.id}`
	// 		}
	// 	};
	// });
	data.map(category => {	
		category.works.map(work => {
			idArray.push(work.id);
		});
	});

	const paths = idArray.map(id => {
		return {
			params: {
				workId: `${id}`
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
	console.log("work", work);

	return {
		props: {
			work,
		}
	};
}