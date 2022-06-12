import { useState } from "react";

export const useShareFiles = () => {
	const [files, setFiles] = useState([]);
	return {
		files,
		setFiles,
	};
};