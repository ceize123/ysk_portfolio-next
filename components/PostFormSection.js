import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import SelectMenu from "./SelectMenu";
import firstLetter from "./FirstLetter";
import Button from "./Button";
import Input from "./Input";
import UploadImage from "./UploadImage";
import DetailCols from "./DetailCols";
import { useShareFiles } from "./ShareStates";
import { overallCol, pageCol, listCol, infoCol, overviewCol } from "../data/column";
import { types } from "../data/type";
import { categories } from "../data/category";

function PostFormSection({ param = "", workId = "", filter }) {

	// Create work part
	const [category, setCategory] = useState(categories[0]);
	const [work, setWork] = useState({
		title: "",
		description: "",
		navColor: "",
		heroImage: ""
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
			heroImage: ""
		});
		setOverview({
			subtile: "",
			paragraph: "",
			timeline: "",
			role: "",
			team: "",
		});
	}, [category]);
	
	const validateInput = (title, description, navColor,  heroImage) => {
		if (title === "" || description === "" || navColor === "" || heroImage === "") {
			console.log("Invalid Input");
			return false;
		}

		return true;
	};

	// // Add section part
	const [type, setType] = useState(types[0]);
	const [overall, setOverall] = useState({});
	const { files } = useBetween(useShareFiles);
	const [array, setArray] = useState([]);

	// handle array of object from fields

	function pushArray(ary) {
		if (type === "List") {
			setOverall({
				...overall,
				lists: ary
			});
		} else if (type === "Carousel") {
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
		if (type === "List") {
			setArray([...array, { listTitle: "", listParagraph: "" }]);
		} else if (type === "Carousel") {
			setArray([...array, { issue: "", description: "", solution: "", imagesNeed: 2 }]);
		}
	};

	useEffect(() => {
		setOverall({ ...overall, images: files });
	}, [files]);

	useEffect(() => {
		setOverall({
			title: "",
			paragraph: "",
			images: [],
		});

		switch (type) {
		case "ImageOnly":
			setOverall({
				images: [],
			});
			break;
		case "Carousel":
			setOverall({
				title: "",
				paragraph: "",
			});
			setArray([{
				issue: "",
				description: "",
				solution: "",
				imagesNeed: 2
			}]);
			break;
		case "TextOnly":
			setOverall({
				title: "",
				paragraph: ""
			});
			break;
		case "List":
			setOverall({
				title: "",
				paragraph: "",
				images: [],
				color: ""
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

		if (filter === "details") {
			const response = await fetch(`/api/works/category/${param}/${workId}`, {
				method: "POST",
				body: JSON.stringify({ id: workId, type: type, overall }),
				headers: {
					"Content-Type": "application/json"
				}
			});
			
			const result = await response.json();
			console.log("From Add section");
			console.log(result);
		} else {
			const validInput = validateInput(work.title, work.description, work.navColor, work.heroImage);

			if (!validInput) {
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
		}
	};

	return (
		<form action="#" method="POST">
			<div className="shadow overflow-hidden rounded-md">
				<div className="px-4 py-5 bg-gray-50 sm:p-6">
					{filter === "details"
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
														// type={type}
														onChange={(e) => handleArrayChange(e, index)}
													/>))}
											{array.length - 1 === index && (
												<Button onClick={handleArrayAdd} text={`Add a ${type === "List" ? "List" : "Page"}`} color="border-cyan-600 hover:bg-cyan-500 focus:ring-cyan-500" />
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
							<UploadImage type={type} />
						</div>
						: <div className="grid grid-cols-1">
							<SelectMenu prop={categories} option={category} name="Category" onChange={setCategory} />
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
	);
}

export default PostFormSection;