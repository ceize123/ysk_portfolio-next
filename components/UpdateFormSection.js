import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import firstLetter from "./FirstLetter";
import Button from "./Button";
import Input from "./Input";
import ImageInput from "./ImageInput";
import ImageInputMobile from "./ImageInputMobile";
import UploadImage from "./UploadImage";
import { validate } from "./Validate";
import { deleteFromFirebase } from "./ImageDelete";
import { failAlert, successAlert } from "./Alerts";
import { useShareUpdateFiles, useShareUpdateNo, useShareImageUrls } from "./ShareStates";
import Swal from "sweetalert2";

function UpdateFormSection({ prop, isOverview = false, param, workId, filter, sectionNo = "", title="" }) {

	const { setUpdateNo } = useBetween(useShareUpdateNo);
	// 
	const [work, setWork] = useState(prop);
	const [overview, setOverview] = useState();

	useEffect(() => {
		setWork({ ...work, overview: overview });
	}, [overview]);

	// 
	// const { updateFiles, setUpdateFiles } = useBetween(useShareUpdateFiles);
	const [overall, setOverall] = useState(prop);
	const [array, setArray] = useState([]);
	const [hasImage, setHasImage] = useState(false);
	const { imageUrls, imageUrlsMobile } = useBetween(useShareImageUrls);
	const [keys, setKeys] = useState(Object.keys(prop));
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

	// useEffect(() => {
	// 	if (filter === "sections") {
	// 		setOverall({ ...overall, images: updateFiles });
	// 	} else {
	// 		setWork({ ...work, heroImage: updateFiles });
	// 	}
	// }, [updateFiles]);

	useEffect(() => {
		if (filter === "sections") setOverall({ ...overall, images: imageUrls });
		else setWork({ ...work, heroImage: imageUrls });
	}, [imageUrls]);

	useEffect(() => {
		if (filter === "sections") setOverall({ ...overall, imagesMobile: imageUrlsMobile });
		else setWork({ ...work, heroImageMobile: imageUrlsMobile });
	}, [imageUrlsMobile]);

	useEffect(() => {
		
		if (filter === "sections") {
			// https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
			setKeys(keys.filter(item => !["_id", "__v"].includes(item)));

			if (overall.type === "list") {
				setArray(overall.lists);
			} else if (overall.type === "carousel") {
				setArray(overall.pages);
			}
			
			if (overall.type !== "textOnly") {
				setHasImage(true);
				// setUpdateFiles(prop.images);
			} else {
				setHasImage(false);
			}
		} else {
			setOverview(prop.overview);
			// setUpdateFiles(prop.heroImage);
			setHasImage(true);
			// setSubKeys(Object.keys(work[overview]));
			if (isOverview) {
				setHasImage(false);
			}
		}
	}, []);

	const handleSave = async (e) => {
		e.preventDefault();
		let data;
		
		if (filter === "sections") {
			data = overall;
			console.log(data);
			if (!validate(data, data.type)) {
				failAlert("Shin! Please Please Please fill in all the fields!");
				return null;
			}
			const response = await fetch(`/api/works/category/${param}/${workId}/section`, {
				method: "PUT",
				body: JSON.stringify({ data }),
				headers: {
					"Content-Type": "application/json"
				}
			});
			
			const result = await response.json();
			console.log(result);
			successAlert(filter, "Section has been updated!", refresh);

		} else {
			data = work;
			if (!validate(data)) {
				failAlert("Shin! Please Please Please fill in all the fields!");
				return null;
			}
			const response = await fetch(`/api/works/category/${param}/${workId}`, {
				method: "PUT",
				body: JSON.stringify({ data }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const result = await response.json();
			console.log(result);
			successAlert(filter, "Project info has been updated!", refresh);
		}
		setUpdateNo(null);
		
		
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4f46e5",
			cancelButtonColor: "#f43f5e",
			confirmButtonText: "Yes, delete it!"
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					"Deleted!",
					"Section has been deleted.",
					"success"
				).then(() => {
					fetch(`/api/works/category/${param}/${workId}`, {
						method: "DELETE",
						body: JSON.stringify({ number: sectionNo, data: overall }),
						headers: {
							"Content-Type": "application/json"
						}
					});
					deleteFromFirebase(`${param}/${title}/${overall.type}`, overall.images);
					setUpdateNo(null);
				}).then(() => {
					refresh();
				});
			}
		});
		
	};

	const refresh = async () => {
		window.location.reload();
	};

	return (
		<section className="mb-12">
			<form action="#" method="PUT" >
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
								{hasImage && <ImageInput prop={`${param}/${title}/${overall.type}`} category={param} imageAry={prop.images} />}
								{hasImage && <ImageInputMobile prop={`${param}/${title}/${overall.type}/mobile`} category={param} imageAry={prop.imagesMobile} />}
								{/* {hasImage && <UploadImage type={overall.type} isUpdate={true}/>} */}
							</div> 
							: <div className="grid grid-cols-1">
								<div className="mt-3">
									{!isOverview
										? <>
											<h3>Info</h3>
											{/* Title, Description, NavColor, NavTextColor */}
											{keys.slice(1, 5).map((key, idx) => (
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
								{hasImage && <ImageInputMobile prop={`${param}/${work.title}/heroImage/mobile`} category={param} />}
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
		</section>
	);
}

export default UpdateFormSection;