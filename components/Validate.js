export const validate = (work, type) => {
	let flag = true;
	const keys = Object.keys(work);
	let subKeys;
	let subKeyName;

	keys.map(key => {
		if (work[key] === "" || (type !== "textOnly" && work[key].length === 0)) {
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
			if (work[subKeyName][key] === "") {
				flag = false;
			}
		});
	}

	return flag;
}; 