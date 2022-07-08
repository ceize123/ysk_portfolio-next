export default function findId(cate, id) {
	// return data.works.find(work => work.id === parseInt(id));
	return cate.works.find(work => work._id === id);
}