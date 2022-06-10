import { workData } from "../data/works";

// https://appdividend.com/2022/06/04/javascript-array-find/
export default function find(id) {
	let work = undefined;
	for (let i = 0; i < workData.length; i++) {
		work = workData[i].works.find(x => x.id === parseInt(id));
		if (work !== undefined) {
			break;
		}
	}
	// workData.forEach(item => {		
	// 	if (item.works.find(x => x.id === parseInt(id))) {
	// 		work = item.works.find(x => x.id === parseInt(id));
	// 	}
	// });
	return work;
}