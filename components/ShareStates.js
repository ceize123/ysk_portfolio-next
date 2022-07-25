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

export const useShareCategories= () => {
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

export const useShareWidth = () => {
	const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" && window.innerWidth);

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.addEventListener("resize", handleResize);
		};
	}, [windowWidth]);
	return {
		windowWidth,
		setWindowWidth,
	};
};

export const useShareLoading = () => {
	const [loaded, setLoaded] = useState(false);
	return {
		loaded,
		setLoaded,
	};
};


