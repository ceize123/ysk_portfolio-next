import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import findCat from "../../../../../components/FindCat";
import findId from "../../../../../components/FindId";
import TypeSection from "../../../../../components/TypeSection";
import Hero from "../../../../../components/sections/Hero";
import Overview from "../../../../../components/sections/Overview";
import PostSectionForm from "../../../../../components/PostSectionForm";
import SelectMenu from "../../../../../components/SelectMenu";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import UploadImage from "../../../../../components/UploadImage";
import { overallCol, pageCol, listCol } from "../../../../../data/column";
import { types } from "../../../../../data/type";
import { useShareFiles } from "../../../../../components/ShareFile";

function WorkDetail({category, work}) {
	// const {type} = useBetween(useShareType);
	// const [overall, setOverall] = useState({});
	// const { files } = useBetween(useShareFiles);

	// handle array of object from fields
	// const [array, setArray] = useState([]);

	// function pushArray(ary) {
	// 	if (type === "List") {
	// 		setOverall({
	// 			...overall,
	// 			lists: ary
	// 		});
	// 	} else if (type === "Carousel") {
	// 		setOverall({
	// 			...overall,
	// 			pages: ary
	// 		});
	// 	}
	// }

	// const handleArrayChange = (e, idx) => {
	// 	const { name, value } = e.target;
	// 	const ary = [...array];
	// 	ary[idx][name] = value;
	// 	setArray(ary);
	// 	pushArray(ary);
	// };

	// const handleArrayRemove = (idx) => {
	// 	// store old array first, then splice the one that has been removed
	// 	const list = [...array];
	// 	list.splice(idx, 1);
	// 	setArray(list);
	// 	pushArray(list);
	// };

	// const handleArrayAdd = () => {
	// 	if (type === "List") {
	// 		setArray([...array, { listTitle: "", listParagraph: "" }]);
	// 	} else if (type === "Carousel") {
	// 		setArray([...array, { issue: "", description: "", solution: "", imagesNeed: 2 }]);
	// 	}
	// };

	// useEffect(() => {
	// 	setOverall({ ...overall, images: files });
	// }, [files]);

	// useEffect(() => {
	// 	setOverall({
	// 		title: "",
	// 		paragraph: "",
	// 		images: [],
	// 	});

	// 	switch (type) {
	// 	case "ImageOnly":
	// 		setOverall({
	// 			images: [],
	// 		});
	// 		break;
	// 	case "Carousel":
	// 		setOverall({
	// 			title: "",
	// 			paragraph: "",
	// 		});
	// 		setArray([{
	// 			issue: "",
	// 			description: "",
	// 			solution: "",
	// 			imagesNeed: 2
	// 		}]);
	// 		break;
	// 	case "TextOnly":
	// 		setOverall({
	// 			title: "",
	// 			paragraph: ""
	// 		});
	// 		break;
	// 	case "List":
	// 		setOverall({
	// 			title: "",
	// 			paragraph: "",
	// 			images: [],
	// 			color: ""
	// 		});
	// 		setArray([{
	// 			listTitle: "",
	// 			listParagraph: ""
	// 		}]);
	// 		break;
	// 	default:
	// 		break;

	// 	}
	// }, [type]);
	// handle array of object from fields


	// Scroll to end of page
	// https://stackoverflow.com/questions/23843619/js-for-smooth-scroll-to-the-bottom-of-the-page
	const { pathname } = useRouter();
	useEffect(() => {
		window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
	}, [pathname]);


	// const submitSection = async (e) => {
	// 	e.preventDefault();

	// 	const response = await fetch(`/api/works/category/${category}/${work.id}`, {
	// 		method: "POST",
	// 		body: JSON.stringify({ id: work.id, type: type, overall }),
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		}
	// 	});
	// 	const result = await response.json();
	// 	console.log(result);
	// };

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
						<TypeSection prop={section}/>
					</section>
				))}

				<section className="mx-10 mt-12">
					<div className="mt-5 addNewSection">
						<h2 className="text-center">Add Sections:</h2>
						<PostSectionForm param={category} workId={work.id} filter="add" />
						{/* <form action="#" method="POST">
							<div className="shadow overflow-hidden rounded-md">
								<div className="px-4 py-5 bg-gray-50 sm:p-6">
									<div className={`grid grid-cols-1 ${type.charAt(0).toLowerCase() + type.slice(1)}`}>
										<SelectMenu prop={types} option={type} name="Type" onChange={setType} />

										<div className="mt-3">
											<h3>Overall</h3>
											{overallCol.map((item, idx) => (
												<Input key={idx}
													prop={item}
													val={overall}
													type={type}
													onChange={e => {
														setOverall({ ...overall, [item]: e.target.value });
													}} />
											))}
										</div>
										
										<div className="mt-3">
											<h3 className="col-text">{type === "List" ? "Lists" : "Pages"}</h3>
											
											{(type === "List" || type === "Carousel") && array.map((singleList, index) => (
												<div key={index} className="flex mb-5">
													<div className="w-3/4 shrink-0 sub-section">
														{type === "List"
															? listCol.map((item, idx) => (
																<Input key={idx}
																	prop={item}
																	val={singleList}
																	onChange={(e) => handleArrayChange(e, index)}
																/>
															))
															: pageCol.map((item, idx) => (
																<Input key={idx}
																	prop={item}
																	val={singleList}
																	type={type}
																	onChange={(e) => handleArrayChange(e, index)}
																/>))}
														{array.length - 1 === index && (
															<Button onClick={handleArrayAdd} text={`Add a ${type === "List" ? "List" : "Page"}`} color="indigo"/>
														)}
													</div>

													<div className="ml-10 self-center">
														{array.length !== 1 && (
															<Button onClick={() => handleArrayRemove(index)} text="Remove" color="red"/>
														)}
													</div>
												</div>
											))}
										</div>
										<UploadImage type={type} />
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
						</form> */}
					</div>
				</section>
			</div>
		</div>
	);
}

export default WorkDetail;

export async function getStaticPaths() {
	const response = await fetch("http://localhost:3000/api/works");
	const data = await response.json();

	let dataArray = [];

	data.map(category => {	
		category.works.map(work => {
			const param = { category: category.category, id: work.id };
			dataArray.push(param);
		});
	});

	const paths = dataArray.map(item => {
		return {
			params: {
				category: `${item.category}`,
				workId: `${item.id}`
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
	const { category, workId } = params;
	const works = findCat(category);
	const work = findId(works, workId);
	console.log(work);

	return {
		props: {
			category: category,
			work,
		}
	};
}