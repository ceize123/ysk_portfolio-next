import React, { useState, useCallback } from "react";
import { ListItem } from "../../../components/ListItem";
import Button from "../../../components/Button";
import dbConnect from "../../../util/connection";
import Category from "../../../models/Category";
import { useSession } from "next-auth/react";
import { useBetween } from "use-between";
import { useShareLoading } from "../../../components/ShareStates";
import { successAlert } from "../../../components/Alerts";

function OrderSub({work}) {
	const { data: session } = useSession();
	const { loaded } = useBetween(useShareLoading);
	const [workSub, setWorkSub] = useState(work.works);

	const moveWorkSubListItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = workSub[dragIndex];
			const hoverItem = workSub[hoverIndex];
			// Swap places of dragItem and hoverItem in the workSub array
			setWorkSub(workSub => {
				const updatedWorkSub = [...workSub];
				updatedWorkSub[dragIndex] = hoverItem;
				updatedWorkSub[hoverIndex] = dragItem;
				return updatedWorkSub;
			});
		},
		[workSub],
	);
 
	const handleSave = async () => {

		const response = await fetch(`/api/works/category/${work.category}`, {
			method: "PUT",
			body: JSON.stringify({workSub}),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const result = await response.json();
		console.log(result);
		successAlert("n/a", "Updated!", refresh);
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
								{work && <th className="text-3xl py-3 border">{work.category}</th>}
							</tr>
						</thead>
						
						<tbody>
							{work && workSub.map((w, index) => (
								<tr key={index} className="hover:bg-indigo-500 hover:text-white">
									<td className="text-2xl py-8 border relative">
										<ListItem
											index={index}
											text={w.title}
											moveListItem={moveWorkSubListItem}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Button onClick={handleSave} text="Update" color="border-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500"/>
				</>
			}
		</div>
	);
}

export default OrderSub;

export async function getStaticPaths() {

	await dbConnect();
	const response = await Category.find();

	const data = await JSON.parse(JSON.stringify(response));

	const paths = data.map(category => {
		return {
			params: {
				category: `${category.category}`,
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
	const { category } = params;

	await dbConnect();
	const response = await Category.find();

	const data = await JSON.parse(JSON.stringify(response));
	const works = data.filter(cat => cat.category === category);
	const work = works[0];
	
	return {
		props: {
			work,
		},
	};
}