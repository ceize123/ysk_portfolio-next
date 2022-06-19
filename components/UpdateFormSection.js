import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import firstLetter from "./FirstLetter";
import Button from "./Button";
import Input from "./Input";
import ImageInput from "./ImageInput";
import UploadImage from "./UploadImage";
import { useShareUpdateFiles, useShareUpdateNo, useShareImageUrls } from "./ShareStates";

function UpdateFormSection({ prop, isOverview = false, param, workId, filter, sectionNo = "" }) {

	const { setUpdateNo } = useBetween(useShareUpdateNo);
	// 
	const [work, setWork] = useState(prop);
	const [overview, setOverview] = useState();

	useEffect(() => {
		setWork({ ...work, overview: overview });
	}, [overview]);

	// 
	const { updateFiles, setUpdateFiles } = useBetween(useShareUpdateFiles);
	const [overall, setOverall] = useState(prop);
	const [array, setArray] = useState([]);
	const [hasImage, setHasImage] = useState(false);
	const { imageUrls } = useBetween(useShareImageUrls);
	const keys = Object.keys(prop);
	const subKeys = isOverview
		? Object.keys(prop.overview)
		: prop.type === "list" ? Object.keys(prop.lists[0])
			: prop.type === "carousel" ? Object.keys(prop.pages[0])
				: "";

	// handle array of object from fields
	function pushArray(ary) {
		if (overall.type === "list") {
			setOverall({
				...overall,
				lists: ary
			});
		} else if (overall.type === "carousel") {
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
		if (overall.type === "list") {
			setArray([...array, { listTitle: "", listParagraph: "" }]);
		} else if (overall.type === "carousel") {
			setArray([...array, { issue: "", description: "", solution: "", imagesNeed: 2 }]);
		}
	};

	useEffect(() => {
		if (filter === "sections") {
			setOverall({ ...overall, images: updateFiles });
		} else {
			setWork({ ...work, heroImage: updateFiles });
		}
	}, [updateFiles]);

	useEffect(() => {
		if (filter === "sections") setOverall({ ...overall, images: imageUrls });
		else setWork({ ...work, heroImage: imageUrls });
	}, [imageUrls]);

	useEffect(() => {
		
		if (filter === "sections") {
			if (overall.type === "list") {
				setArray(overall.lists);
			} else if (overall.type === "carousel") {
				setArray(overall.pages);
			}
			
			if (overall.type !== "textOnly") {
				setHasImage(true);
				setUpdateFiles(prop.images);
			} else {
				setHasImage(false);
			}
		} else {
			setOverview(prop.overview);
			setUpdateFiles(prop.heroImage);
			setHasImage(true);
			// setSubKeys(Object.keys(work[overview]));
			if (isOverview) {
				setHasImage(false);
			}
		}
	}, []);

	const handleSave = async (e) => {
		e.preventDefault();
		const data = (filter === "sections" ? overall : work);
		console.log(data);
		const response = await fetch(`/api/works/category/${param}/${workId}`, {
			method: "PUT",
			body: JSON.stringify({ number: sectionNo, data }),
			headers: {
				"Content-Type": "application/json"
			}
		});
		setUpdateNo();
		const result = await response.json();
		console.log(result);
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		const response = await fetch(`/api/works/category/${param}/${workId}`, {
			method: "DELETE",
			body: JSON.stringify({ number: sectionNo }),
			headers: {
				"Content-Type": "application/json"
			}
		});
		setUpdateNo();
		const result = await response.json();
		console.log(result);
	};

	return (
		<form action="#" method="PUT">
			<div className="shadow overflow-hidden rounded-md">
				<div className="px-4 py-5 bg-gray-50 sm:p-6">
					{filter === "sections"
						? <div className={`grid grid-cols-1 ${firstLetter("lower", overall.type)}`}>
							<div className="mt-3">
								{keys.map((key, idx) => (
									(key !== "type" && key !== "images" && key !== "lists" && key !== "pages")
									&& <Input key={idx}
										prop={key}
										val={overall}
										onChange={e => {
											setOverall({ ...overall, [key]: e.target.value });
										}} />
									
								))}
							</div>
							<div className="mt-3">
								<h3 className="col-text">
									{overall.type === "list" ? "Lists" : overall.type === "carousel" ? "Pages" : ""}
								</h3>
								{(overall.type === "list" || overall.type === "carousel") && array.map((singleList, index) => (
									<div key={index} className="flex mb-5">
										<div className="w-3/4 shrink-0 sub-section">
											{subKeys.map((item, idx) => (
												<Input key={idx}
													prop={item}
													val={singleList}
													onChange={(e) => handleArrayChange(e, index)}
												/>
											))}
											{array.length - 1 === index && (
												<Button onClick={handleArrayAdd} text={`Add a ${overall.type === "list" ? "List" : "Page"}`} color="border-cyan-600 hover:bg-cyan-500 focus:ring-cyan-500" />
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
							{/* {hasImage && <UploadImage type={overall.type} isUpdate={true}/>} */}
						</div> 
						: <div className="grid grid-cols-1">
							<div className="mt-3">
								{!isOverview
									? <>
										<h3>Info</h3>
										{/* Title, Description, NavColor */}
										{keys.slice(1, 4).map((key, idx) => (
											<Input key={idx}
												prop={key}
												val={work}
												onChange={e => {
													setWork({ ...work, [key]: e.target.value });
												}} />
											
										))}
									</>
									: <>
										{/* add overview */}
										<h3>Overview</h3>
										{subKeys.map((key, idx) => (
											<Input key={idx}
												prop={key}
												val={overview}
												onChange={e => {
													setOverview({ ...overview, [key]: e.target.value });
												}} />
											
										))}
									</>
								}
							</div>
							{hasImage && <ImageInput prop={`${param}/${work.title}/heroImage`} category={param} />}
							{/* {hasImage && <UploadImage isUpdate={true}/>} */}
						</div>	
					}
				</div>
				
				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
					{filter === "sections" && <Button onClick={(e) => handleDelete(e)} text="Delete" color="border-red-600 hover:bg-red-500 focus:ring-red-500" />}
					<Button type="submit" onClick={(e) => handleSave(e)} text="Save" color="text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
				</div>
			</div>
		</form>
	);
}

export default UpdateFormSection;