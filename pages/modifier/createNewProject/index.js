import { useState, useEffect } from "react";
import InputNoVal from "../../../components/InputNoVal";
import Input from "../../../components/Input";
import SelectMenu from "../../../components/SelectMenu";
import { categories } from "../../../data/category";
import PostFormSection from "../../../components/PostFormSection";

function AddNew() {
	// const [category, setCategory] = useState(categories[0]);
	// const [work, setWork] = useState({
	// 	title: "",
	// 	description: "",
	// 	navColor: "",
	// 	heroImage: ""
	// });
	// const [overview, setOverview] = useState({});

	// useEffect(() => {
	// 	setWork({ ...work, overview: overview });
	// }, [overview]);
	
	// useEffect(() => {
	// 	setWork({
	// 		title: "",
	// 		description: "",
	// 		navColor: "",
	// 		heroImage: ""
	// 	});
	// 	setOverview({
	// 		subtile: "",
	// 		paragraph: "",
	// 		timeline: "",
	// 		role: "",
	// 		team: "",
	// 	});
	// },[category]);

	// const validateInput = (title, description, navColor,  heroImage) => {
	// 	if (title === "" || description === "" || navColor === "" || heroImage === "") {
	// 		console.log("Invalid Input");
	// 		return false;
	// 	}

	// 	return true;
	// };

	// const submitWork = async (e) => {
	// 	e.preventDefault();
	// 	const validInput = validateInput(work.title, work.description, work.navColor, work.heroImage);

	// 	if (!validInput) {
	// 		return null;
	// 	}

	// 	const response = await fetch(`/api/works/category/${category}`, {
	// 		method: "POST",
	// 		body: JSON.stringify({work}),
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		}
	// 	});
	// 	const result = await response.json();
	// 	console.log(result);
	// };
	return (
		<>
			<h1 className="text-3xl text-center font-bold underline my-6">Create New Project</h1>
			<PostFormSection filter="create" />
			{/* <form action="#" method="POST">
					<div className="shadow overflow-hidden rounded-md">
						<div className="px-4 py-5 bg-gray-50 sm:p-6">
							
							<div className="grid grid-cols-1">
								<SelectMenu prop={categories} option={category} name="Category" onChange={setCategory} />
								<div className="mt-3">
									<h3>Info</h3>
									{column.map((item, idx) => (
										<Input key={idx}
											prop={item}
											val={work}
											onChange={e => {
												setWork({ ...work, [item]: e.target.value });
											}} />
									))}
								</div>

								<div className="mt-3">
									<h3>Overview</h3>
									{overviewColumn.map((item, idx) => (
										<Input key={idx}
											prop={item}
											val={overview}
											onChange={e => {
												setOverview({ ...overview, [item]: e.target.value });
											}} />
									))}
								</div>
							</div>
						</div>
						<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
							<button type="submit"
								onClick={(e) => { submitWork(e); }}
								className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Save
							</button>
						</div>
					</div>
				</form> */}
		</>
	);
}

export default AddNew;