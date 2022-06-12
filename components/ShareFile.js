import { useState } from "react";

export const useShareableState = () => {
	const [files, setFiles] = useState([]);
	return {
		files,
		setFiles,
	};
};