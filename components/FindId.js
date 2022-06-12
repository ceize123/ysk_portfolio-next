// import { workData } from "../data/works";

// https://appdividend.com/2022/06/04/javascript-array-find/
// export default function findId(id) {
// 	let work = undefined;
// 	for (let i = 0; i < workData.length; i++) {
// 		work = workData[i].works.find(x => x.id === parseInt(id));
// 		if (work !== undefined) {
// 			break;
// 		}
// 	}
// 	return work;
// }

export default function findId(data, id) {
	return data.works.find(work => work.id === parseInt(id));
}