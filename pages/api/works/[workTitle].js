import dbConnect from "../../../util/connection";
import Work from "../../../models/Work";

export default async function handler(req, res) {
	const { workTitle } = req.query;
	dbConnect();
	
	if (req.method === "GET") {
		try {
			const work = await Work.findOne({ "title": workTitle });
			res.status(200).json(work);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}