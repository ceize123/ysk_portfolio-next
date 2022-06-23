import React, { useState, useCallback } from "react";
import { ListItem } from "../../../components/ListItem";
import Button from "../../../components/Button";

// https://medium.com/nmc-techblog/easy-drag-and-drop-in-react-22778b30ba37
function Order({ works }) {
	const [projects, setProjects] = useState(works);

	const moveProjectListItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = projects[dragIndex];
			const hoverItem = projects[hoverIndex];
			// Swap places of dragItem and hoverItem in the projects array
			setProjects(projects => {
				const updatedProjects = [...projects];
				updatedProjects[dragIndex] = hoverItem;
				updatedProjects[hoverIndex] = dragItem;
				return updatedProjects;
			});
		},
		[projects],
	);

	const handleSave = async () => {
		console.log(projects);
		const response = await fetch("/api/works", {
			method: "PUT",
			body: JSON.stringify({projects}),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const result = await response.json();
		console.log(result);
	};

	return (
		<div className="flex justify-center flex-col items-center">
			<table className="text-center my-12 border-dashed border-2 border-indigo-600 rounded w-1/2">
				<thead className="bg-indigo-500 text-white">
					<tr>
						{/* <th className="text-3xl px-8 py-3 border">No.</th> */}
						<th className="text-3xl py-3 border">Category</th>
					</tr>
				</thead>
				
				<tbody>
					{/* {works.map((item, idx) => (
						<tr key={idx} className="hover:bg-indigo-500 hover:text-white">
							<td className="text-2xl py-3 border">{idx+1}</td>
							<td className="text-2xl py-3 border">{item.category}</td>
						</tr>
					))} */}
					{projects.map((project, index) => (
						<tr key={index} className="hover:bg-indigo-500 hover:text-white">
							<td className="text-2xl py-3 border">
								<ListItem
									index={index}
									text={project.category}
									moveListItem={moveProjectListItem}
								/>
							</td>
						</tr>
						
					))}
				</tbody>
			</table>
			<Button onClick={handleSave} text="Update" color="border-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500"/>
		</div>
	);
}

export default Order;

export async function getStaticProps() {
	const response = await fetch("http://localhost:3000/api/works");
	const data = await response.json();
	const works = data;

	return {
		props: {
			works,
		},
	};
}