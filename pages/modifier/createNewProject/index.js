import { useState, useEffect } from "react";
import Input from "../../../components/Input";

const column = [
	"title",
	"description",
	"navColor",
	"heroImage"
];

const overviewColumn = [
	"subtile",
	"paragraph",
	"timeline",
	"role",
	"team"
];

function AddNew() {
	const [work, setWork] = useState({});

	const [overview, setOverview] = useState({});

	useEffect(() => {
		setWork({ ...work, overview: overview });
	},[overview]);

	const validateInput = (title, description, navColor,  heroImage) => {
		if (title === "" || description === "" || navColor === "" || heroImage === "") {
			console.log("Invalid Input");
			return false;
		}

		return true;
	};

	const submitWork = async (e) => {
		e.preventDefault();
		const validInput = validateInput(work.title, work.description, work.navColor, work.heroImage);

		if (!validInput) {
			return null;
		}

		const response = await fetch("/api/works", {
			method: "POST",
			body: JSON.stringify({ work }),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		console.log(data);
	};
	return (
		<>
			<h1 className="text-3xl text-center font-bold underline my-6">Create New Project</h1>
			<div>
				<form action="#" method="POST">
					<div className="shadow overflow-hidden rounded-md">
						<div className="px-4 py-5 bg-gray-50 sm:p-6">
							<div className="grid grid-cols-1">
								{/* <div>
									<label htmlFor="title" className="block text-sm font-medium text-gray-700">
										Title
									</label>
									<input
										type="text"
										name="title"
										id="title"
										required onChange={e => {setWork({ ...work, title: e.target.value });}}
										className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
									/>
								</div> */}
								{column.map((item, idx) => (
									<Input key={idx}
										prop={item}
										onChange={e => {
											setWork({ ...work, [item]: e.target.value });
										}} />
								))}
								{/* add overview */}
								{overviewColumn.map((item, idx) => (
									<Input key={idx}
										prop={item}
										onChange={e => {
											setOverview({ ...overview, [item]: e.target.value });
										}} />
								))}
								
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
				</form>
			</div>
		</>
	);
}

export default AddNew;