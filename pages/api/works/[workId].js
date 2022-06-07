import find from "../../../components/Find";

export default function handler(req, res) {
	const { workId } = req.query;
	if (req.method === "GET") {
		const work = find(workId);
		res.status(200).json(work);
	}
}