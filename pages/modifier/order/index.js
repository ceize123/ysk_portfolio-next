import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { ListItem } from "../../../components/ListItem";
import Button from "../../../components/Button";
import dbConnect from "../../../util/connection";
import Category from "../../../models/Category";
import { useSession } from "next-auth/react";
import { useBetween } from "use-between";
import { useShareLoading } from "../../../components/ShareStates";
import { successAlert } from "../../../components/Alerts";

// https://medium.com/nmc-techblog/easy-drag-and-drop-in-react-22778b30ba37
function Order({works}) {
	const { data: session } = useSession();
	const { loaded } = useBetween(useShareLoading);
	const router = useRouter();
	// const router = useRouter();
	// useEffect(() => {
	// 	if (!session) {
	// 		router.push("/");
	// 	}
	// }, []);

	const [projects, setProjects] = useState(works);
	// const [workOrder, setWorkOrder] = useState(works);

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

		const response = await fetch("/api/works", {
			method: "PUT",
			body: JSON.stringify({projects}),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const result = await response.json();
		console.log(result);
		successAlert("n/a", "Updated!", refresh);
	};

	const handleRoute = (category) => {
		router.push(`/modifier/order/${category}`);
	};

	const refresh = async () => {
		window.location.reload();
	};


	return (
		<div className={`flex justify-center flex-col items-center back-end ${!loaded ? "overflow-hidden h-screen opacity-0" : "opacity-100 z-50"}`}>
			{session && 
				<>
					<table className="text-center mt-24 mb-16 border-dashed border-2 border-indigo-600 rounded w-1/2">
						<thead className="bg-indigo-500 text-white">
							<tr>
								<th className="text-3xl py-3 border">Category</th>
							</tr>
						</thead>
						
						<tbody>
							{works && projects.map((project, index) => (
								<tr key={index} className="hover:bg-indigo-500 hover:text-white">
									<td className="text-2xl py-8 border relative">
										<ListItem
											index={index}
											text={project.category}
											moveListItem={moveProjectListItem}
										/>
										<button
											onClick={() => handleRoute(project.category)}
											className={"absolute top-4 right-5 inline-flex justify-center w-32 mx-2 p-3 border shadow-sm text-sm font-medium rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 border-blue-600 hover:bg-blue-500 focus:ring-blue-500"}>
											<span>Update SubWork</span>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					
					{/* <table className="text-center my-16 border-dashed border-2 border-indigo-600 rounded w-1/2">
						<thead className="bg-indigo-500 text-white">
							<tr>
								{works && projects.map((project, index) => (
									<th key={index} className="text-3xl py-3 border">{project.category}</th>
								))}
							</tr>
						</thead>
						
						<tbody>
							{works && projects.map((project, index) => (
								<tr key={index}>
									{projects.map((project, idx) => (
										<td key={idx} className="text-2xl py-3 border hover:bg-indigo-500 hover:text-white">
											<ListItem
												index={`${index}-${idx}`}
												text={project.works[index] ? project.works[index].title : ""}
												moveListItem={moveProjectListItem}
											/>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table> */}
					<Button onClick={handleSave} text="Update" color="border-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500"/>
				</>
			}
		</div>
	);
}

export default Order;

export async function getStaticProps() {
// export async function getServerSideProps(context) {
	// const session = await getSession(context);
	
	// if (!session) {
	// 	return {
	// 		redirect: {
	// 			destination: "/",
	// 			permanent: false,
	// 		}
	// 	};
	// }

	// const response = await fetch("http://localhost:3000/api/works");
	// const response = await fetch(`${process.env.URL}/api/works`);
	// const data = await response.json();
	

	await dbConnect();
	const response = await Category.find();

	const data = await JSON.parse(JSON.stringify(response));
	const works = data;

	return {
		props: {
			works,
		},
	};
}