import find from "../../../components/Find";
import { workData } from "../../../data/works";

export default function handler(req, res) {
	const { workId } = req.query;
	if (req.method === "GET") {
		const work = find(workId);
		res.status(200).json(work);
	} else if (req.method === "POST") {
		// const {id, type, overall} = req.body;

		// const newSection = {
		// 	type: type.charAt(0).toLowerCase() + type.slice(1),
		// 	...overall
		// };

		// console.log(newSection);
			
		// workData[idx].works.push(newSection);
		// res.status(201).json(workData);
	}
}