import { useState, useEffect } from "react";
import { types } from "../data/type";

export const useShareFiles = () => {
	const [files, setFiles] = useState([]);
	return {
		files,
		setFiles,
	};
};

export const useShareUpdateFiles = () => {
	const [updateFiles, setUpdateFiles] = useState();
	return {
		updateFiles,
		setUpdateFiles,
	};
};

export const useShareUpdateNo = () => {
	const [updateNo, setUpdateNo] = useState();
	return {
		updateNo,
		setUpdateNo,
	};
};

export const useShareProject = () => {
	const [project, setProject] = useState();
	return {
		project,
		setProject,
	};
};

export const useShareCategories = () => {
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState();
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/works");
			const data = await response.json();
			setCategories(data.map(value => value.category));
			setCategory(data[0].category);
		}
		fetchData();
	}, []);
	return {
		categories,
		setCategories,
		category,
		setCategory
	};
};

export const useShareImageUrls = () => {
	const [imageUrls, setImageUrls] = useState([]);
	return {
		imageUrls,
		setImageUrls,
	};
};



// export const useShareType = () => {
// 	const [type, setType] = useState(types[0]);
// 	return {
// 		type,
// 		setType,
// 	};
// };

// export const useShareOverall = () => {
// 	const [overall, setOverall] = useState({});
// 	return {
// 		overall,
// 		setOverall,
// 	};
// };

// export const useShareArray = () => {
// 	const [array, setArray] = useState([]);
// 	return {
// 		array,
// 		setArray,
// 	};
// };