import { useState } from "react";
import { types } from "../data/type";

export const useShareFiles = () => {
	const [files, setFiles] = useState([]);
	return {
		files,
		setFiles,
	};
};

export const useShareUpdateFiles = () => {
	const [files, setFiles] = useState([]);
	return {
		files,
		setFiles,
	};
};

export const useShareType = () => {
	const [type, setType] = useState(types[0]);
	return {
		type,
		setType,
	};
};

export const useShareOverall = () => {
	const [overall, setOverall] = useState({});
	return {
		overall,
		setOverall,
	};
};

export const useShareArray = () => {
	const [array, setArray] = useState([]);
	return {
		array,
		setArray,
	};
};