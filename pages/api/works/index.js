import { works } from "../../../data/works";

export default function handle(req, res) {
	if (req.method === "GET") {
		res.status(200).json(works);
	} else if (req.method === "POST") {
		const work = req.body.work;
		const newWork = {
			id: Date.now(),
			title: work.title,
			description: work.description,
			navColor: work.navColor,
			heroImage: work.heroImage,
			overview: {
				subtile: work.overview.subtile,
				paragraph: work.overview.paragraph,
				timeline: work.overview.timeline,
				role: work.overview.role,
				team: work.overview.team
			}
		};
		works.push(newWork);
		res.status(201).json(newWork);
	}
}