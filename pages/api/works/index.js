import { workData } from "../../../data/works";

export default function handle(req, res) {
	if (req.method === "GET") {
		res.status(200).json(workData);
	} else if (req.method === "POST") {
		const data = req.body.data;
		const work = data.work;

		let idx = workData.findIndex(i => i.category == data.category);
		console.log(idx);
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
		if (idx === -1) {
			workData.push({ category: data.category, works: [] });
			workData[workData.length - 1].works.push(newWork);
		} else {
			workData[idx].works.push(newWork);
		}
		
		res.status(201).json(workData);
	}
}