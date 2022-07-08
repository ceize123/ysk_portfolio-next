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
	const [updateNo, setUpdateNo] = useState(null);
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

export const useShareWorks= () => {
	const [works, setWorks] = useState(null);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState();
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/works");
			const data = await response.json();
			setWorks(data);
			setCategories(data.map(value => value.category));
			setCategory(data[0].category);
		}
		fetchData();
	}, []);

	return {
		works,
		setWorks,
		categories,
		setCategories,
		category,
		setCategory
	};
};

export const useShareImageUrls = () => {
	const [imageUrls, setImageUrls] = useState([]);
	const [imageUrlsMobile, setImageUrlsMobile] = useState([]);
	return {
		imageUrls,
		setImageUrls,
		imageUrlsMobile,
		setImageUrlsMobile
	};
};

export const useSharePage = () => {
	const [page, setPage] = useState(0);
	return {
		page,
		setPage,
	};
};


