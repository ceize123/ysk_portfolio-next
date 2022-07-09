import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBetween } from "use-between";
import SelectMenu from "./SelectMenu";
import firstLetter from "./FirstLetter";
import { validate } from "./Validate";
import Button from "./Button";
import Input from "./Input";
import { failAlert, successAlert } from "./Alerts";
import ImageInput from "./ImageInput";
import ImageInputMobile from "./ImageInputMobile";
import { useShareCategories, useShareImageUrls } from "./ShareStates";
import { overallCol, pageCol, listCol, infoCol, overviewCol } from "../data/column";
import { types } from "../data/type";

function PostFormSection({ workId = "", filter, title="" }) {

	const router = useRouter();
	// Create work part
	const {categories, category, setCategory} = useBetween(useShareCategories);
	const [work, setWork] = useState({
		title: "",
		description: "",
		navColor: "",
		navTextColor: "",
		heroImage: [],
		// heroImageMobile: [],
	});
	const [overview, setOverview] = useState({});

	useEffect(() => {
		setWork({ ...work, overview: overview });
	}, [overview]);
	
	useEffect(() => {
		setWork({
			title: "",
			description: "",
			navColor: "",
			navTextColor: "",
			heroImage: [],
			// heroImageMobile: [],
		});
		setOverview({
			subtitle: "",
			paragraph: "",
			timeline: "",
			role: "",
			team: "",
		});
	}, [category]);
	
	// const validateWork = (work) => {
	// 	let flag = true;
	// 	const keys = Object.keys(work);
	// 	const subKeys = Object.keys(overview);
	// 	keys.map(key => {
	// 		if (work[key] === "" || work[key].length === 0) {
	// 			flag = false;
	// 		}
	// 	});

	// 	subKeys.map(key => {
	// 		if (work.overview[key] === "") {
	// 			flag = false;
	// 		}
	// 	});
	// 	if (!flag) {
	// 		failAlert("Shin! Please Please Please fill in all the fields!");
	// 	}
	// 	return flag;
	// };

	// // Add section part
	const [type, setType] = useState(types[0]);
	const [overall, setOverall] = useState({});
	// const { files, setFiles } = useBetween(useShareFiles);
	const { imageUrls, setImageUrls, imageUrlsMobile, setImageUrlsMobile } = useBetween(useShareImageUrls);
	const [array, setArray] = useState([]);

	// handle array of object from fields

	function pushArray(ary) {
		if (type === "list") {
			setOverall({
				...overall,
				lists: ary
			});
		} else if (type === "carousel") {
			setOverall({
				...overall,
				pages: ary
			});
		}
	}

	const handleArrayChange = (e, idx) => {
		const { name, value } = e.target;
		const ary = [...array];
		ary[idx][name] = value;
		setArray(ary);
		pushArray(ary);
	};

	const handleArrayRemove = (idx) => {
		// store old array first, then splice the one that has been removed
		const list = [...array];
		list.splice(idx, 1);
		setArray(list);
		pushArray(list);
	};

	const handleArrayAdd = () => {
		if (type === "list") {
			setArray([...array, { listTitle: "", listParagraph: "" }]);
		} else if (type === "carousel") {
			setArray([...array, { issue: "", description: "", solution: "", imagesNeed: 2 }]);
		}
	};

	// useEffect(() => {
	// 	if (filter === "sections") setOverall({ ...overall, images: files });
	// 	else setWork({ ...work, heroImage: files });
	// }, [files]);

	useEffect(() => {
		if (filter === "sections") setOverall({ ...overall, images: imageUrls });
		else setWork({ ...work, heroImage: imageUrls });
	}, [imageUrls]);

	useEffect(() => {
		if (filter === "sections") setOverall({ ...overall, imagesMobile: imageUrlsMobile });
		// else setWork({ ...work, heroImageMobile: imageUrlsMobile });
	}, [imageUrlsMobile]);

	useEffect(() => {
		setOverall({
			title: "",
			paragraph: "",
			images: [],
			imagesMobile: [],
		});
		
		switch (type) {
		case "imageOnly":
			setOverall({
				images: [],
				imagesMobile: [],
			});
			break;
		case "titleImage":
			setOverall({
				title: "",
				images: [],
				imagesMobile: [],
			});	
			break;
		case "carousel":
			// setOverall({
			// 	title: "",
			// 	paragraph: "",
			// });
			setOverall({
				images: [],
				imagesMobile: [],
				pages: []
			});
			setArray([{
				issue: "",
				description: "",
				solution: "",
				imagesNeed: 2
			}]);
			break;
		case "textOnly":
			setOverall({
				title: "",
				paragraph: ""
			});
			break;
		case "list":
			// setOverall({
			// 	title: "",
			// 	paragraph: "",
			// 	images: [],
			// 	color: ""
			// });
			setOverall({
				images: [],
				imagesMobile: [],
				color: "",
				lists: []
			});
			setArray([{
				listTitle: "",
				listParagraph: ""
			}]);
			break;
		default:
			break;

		}
		
		// if (type === "List") {
		// 	setOverall({
		// 		...overall,
		// 		color: ""
		// 	});
		// 	setArray([{
		// 		listTitle: "",
		// 		listParagraph: ""
		// 	}]);
		// } else if (type === "Carousel") {
		// 	setArray([{
		// 		issue: "",
		// 		description: "",
		// 		solution: ""
		// 	}]);
		// }
	}, [type]);
	// handle array of object from fields


	// useEffect(() => {

	// 	setOverall(prevState => ({
	// 		...overall,
	// 		pages: [...prevState.pages, page],
	// 		lists: [...prevState.lists, list],
	// 	}));
	// },[list, page]);


	const handleSubmit = async (e) => {
		e.preventDefault();

		if (filter === "sections") {
			console.log(overall);
			if (!validate(overall, type)) {
				failAlert("Shin! Please Please Please fill in all the fields!");
				return null;
			}
			const response = await fetch(`/api/works/category/${category}/${workId}/section`, {
				method: "POST",
				body: JSON.stringify({ type: type, overall }),
				headers: {
					"Content-Type": "application/json"
				}
			});
			
			const result = await response.json();
			console.log("From Add section");
			console.log(result);
			setOverall({});
			setArray([]);
			setImageUrls([]);
			setImageUrlsMobile([]);
			successAlert(filter, "Section is created!", refresh);


		} else {
			console.log(work);
			if (!validate(work)) {
				failAlert("Shin! Please Please Please fill in all the fields!");
				return null;
			}

			const response = await fetch(`/api/works/category/${category}`, {
				method: "POST",
				body: JSON.stringify({work}),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const result = await response.json();
			console.log("From Create work");
			console.log(result);
			if (result._id) {
				successAlert(filter, "Project is created!", redirect);
					
			} else {
				failAlert("This Project name is already exist");
			}

		}
	};

	const redirect = async () => {
		router.push("/dashboard");
	};
	const refresh = async () => {
		window.location.reload();
	};
	

	return (
		<section className="mt-5">
			<form action="#" method="POST">
				<div className="shadow overflow-hidden rounded-md">
					<div className="px-4 py-8 bg-gray-50 sm:p-6">
						{filter === "sections"
							? <div className={`grid grid-cols-1 ${firstLetter("lower", type)}`}>
								<SelectMenu prop={types} option={type} name="Type" onChange={setType} />

								<div className="mt-3">
									<h3>Overall</h3>
									{overallCol.map((item, idx) => (
										<Input key={idx}
											prop={item}
											val={overall}
											// type={type}
											onChange={e => {
												setOverall({ ...overall, [item]: e.target.value });
											}} />
									))}
								</div>
												
								<div className="mt-3">
									<h3 className="col-text">{type === "list" ? "Lists" : "Pages"}</h3>
													
									{(type === "list" || type === "carousel") && array.map((singleList, index) => (
										<div key={index} className="flex mb-5">
											<div className="w-3/4 shrink-0 sub-section">
												{type === "list"
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
															// type={type}
															onChange={(e) => handleArrayChange(e, index)}
														/>))}
												{array.length - 1 === index && (
													<Button onClick={handleArrayAdd} text={`Add a ${type === "list" ? "List" : "Page"}`} color="border-cyan-600 hover:bg-cyan-500 focus:ring-cyan-500" />
												)}
											</div>

											<div className="ml-10 self-center">
												{array.length !== 1 && (
													<Button onClick={() => handleArrayRemove(index)} text="Remove" color="border-red-600 hover:bg-red-500 focus:ring-red-500" />
												)}
											</div>
										</div>
									))}
								</div>
								{/* <UploadImage type={type} /> */}
								<ImageInput prop={`${category}/${title}/${type}`} type={type} />
								<ImageInputMobile prop={`${category}/${title}/${type}/mobile`} type={type} />
							</div>
							: <div className="grid grid-cols-1">
								{category !== undefined && <SelectMenu prop={categories} option={category} name="Category" onChange={setCategory} />}
								<div className="mt-3">
									<h3>Info</h3>
									{infoCol.map((item, idx) => (
										<Input key={idx}
											prop={item}
											val={work}
											onChange={e => {
												setWork({ ...work, [item]: e.target.value });
											}} />
									))}
								</div>
								{/* <UploadImage /> */}
								<ImageInput prop={`${category}/${work.title}/heroImage`} category={category} />
								{/* <ImageInputMobile prop={`${category}/${work.title}/heroImage/mobile`} category={category} /> */}
								{/* add overview */}
								<div className="mt-3">
									<h3>Overview</h3>
									{overviewCol.map((item, idx) => (
										<Input key={idx}
											prop={item}
											val={overview}
											onChange={e => {
												setOverview({ ...overview, [item]: e.target.value });
											}} />
									))}
								</div>
							</div>
						}
					</div>
					<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
						<Button type="submit" onClick={(e) => handleSubmit(e)} text="Save" color="text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
					</div>
				</div>
			</form>
		</section>
	);
}

export default PostFormSection;