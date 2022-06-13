import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import SelectMenu from "./SelectMenu";
import Button from "./Button";
import Input from "./Input";
import UploadImage from "./UploadImage";
import { useShareFiles, useShareType, useShareOverall, useShareArray } from "./ShareStates";
import { overallCol, pageCol, listCol } from "../data/column";
import { types } from "../data/type";

function DetailCols({to}) {

	// Detail columns
	const { type, setType } = useBetween(useShareType);
	const { overall, setOverall } = useBetween(useShareOverall);
	const { files } = useBetween(useShareFiles);
	const { array, setArray } = useBetween(useShareArray);

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

	return (
		<>
			<SelectMenu prop={types} option={type} name="Type" onChange={setType} />

			<div className="mt-3">
				<h3>Overall</h3>
				{overallCol.map((item, idx) => (
					<Input key={idx}
						prop={item}
						for={to}
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
		</>
	);
}

export default DetailCols;