export const validate = (work, type) => {
	let flag = true;
	const keys = Object.keys(work);
	let subKeys;
	let subKeyName;
	if (type === "textOnly") {
		if (keys[0] === "") {
			flag = false;
		}
	} else {
		keys.map(key => {
			// if (work[key] === "" || (type !== "textOnly" && work[key].length === 0)) {
			if (work[key] === "" || work[key].length === 0) {
				console.log(key);
				if (key === "pages" || key === "lists" || key === "overview") {
					subKeyName = key;
				} else if (key !== "sections") {
					flag = false;
				}
			}
		});
	
		if (subKeyName) {
			subKeys = Object.keys(work[subKeyName]);
			subKeys.length !== 0 && subKeys.map(key => {
				console.log(key);
				if (work[subKeyName][key] === "" && key !== "listParagraph") {
					flag = false;
				}
			});
		}
	}

	return flag;
}; 