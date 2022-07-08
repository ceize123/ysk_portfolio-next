export default function findWork(cate, title) {
	// return data.works.find(work => work.id === parseInt(id));
	return cate.works.find(work => work.title.toLowerCase() === title.toLowerCase());
}