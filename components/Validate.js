export const validate = (work) => {
	let flag = true;
	const keys = Object.keys(work);
	let subKeys;
	let subKeyName;

	keys.map(key => {
		if (work[key] === "" || work[key].length === 0) {
			flag = false;
		}
		if (key === "page" || key === "lists" || key === "overview") {
			subKeyName = key;
		}
	});

	if (subKeyName) {
		subKeys = Object.keys(work[subKeyName]);
		subKeys.map(key => {
			if (work[subKeyName][key] === "") {
				flag = false;
			}
		});
	}

	return flag;
}; 