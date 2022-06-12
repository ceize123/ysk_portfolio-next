import find from "../../../../../components/Find";

function UpdateWork({ work }) {
	return (
		<div>123</div>
	);
}

export default UpdateWork;

export async function getStaticPaths() {
	const response = await fetch("http://localhost:3000/api/works");
	const data = await response.json();

	const paths = data.map(work => {
		return {
			params: {
				workId: `${work.id}`
			}
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const { workId } = params;
	const work = find(workId);

	return {
		props: {
			work,
		}
	};
}