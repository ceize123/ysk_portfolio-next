import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import { useRouter } from "next/router";
import SelectMenu from "../components/SelectMenu";
import {useShareCategories} from "../components/ShareStates";

const choices = [
	"Update Section",
	"Update Order",
];

function Dashboard() {
	const [isLoading, setIsLoading] = useState(true);
	const [dashboardData, setDashboardData] = useState(null);
	const [isUpdate, setIsUpdate] = useState(true);
	const {categories, setCategories, category, setCategory} = useBetween(useShareCategories);
	// const [category, setCategory] = useState();
	const [idx, setIdx] = useState(0);
	const [work, setWork] = useState();
	const [choice, setChoice] = useState();
	const router = useRouter();

	// need to be modified to staticProps
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/works");
			const data = await response.json();
			setDashboardData(data);
			setCategories(data.map(value => value.category));
			setCategory(data[0].category);
			setIsLoading(false);
			setWork(data[0].works[0]);
			setChoice(choices[0]);
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (categories !== undefined && category !== undefined) {
			setIdx(categories.indexOf(category));
		}
	}, [category]);

	useEffect(() => {
		if (dashboardData !== null) {
			setWork(dashboardData[idx].works[0]);
		}
	}, [idx]);

	function handleClick() {
		setIsUpdate(!isUpdate);
		setIdx(0);
		setCategory(dashboardData[0].category);
	}

	function handleSubmit() {
		if (isUpdate) {
			if (choice === choices[0]) {
				router.push(`/modifier/updateCurProject/category/${category}/${work._id}`);
				// router.push(`/modifier/updateCurProject/${work.id}`);
			} else {
				router.push("/modifier/order");
			}
		} else {
			router.push("/modifier/createNewProject");
		}
	}

	if (isLoading) return <div className="back-end"><h1 className="text-3xl text-center font-bold mt-6">Loading...</h1></div>;

	return (
		<div className="back-end">
			<h1 className="text-3xl text-center font-bold underline my-6">Dashboard</h1>
			<div className="mx-10">
				<div className="flex content-center">
					<p className="mt-1 mr-3 text-sm font-medium text-gray-700">Update Current Work</p>
					<label forhtml="toggle" className="inline-flex relative items-center cursor-pointer">
						<input type="checkbox" value="" id="toggle" className="sr-only peer" onClick={e => { handleClick(e); }}/>
						<div className="w-12 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
					</label>
					<p className="mt-1 ml-3 text-sm font-medium text-gray-700">Create New Work</p>
				</div>
				{(isUpdate && dashboardData[idx].works.length !== 0) &&
					<>
						{/* Pass data from child to parent */}
						{/* https://stackoverflow.com/questions/55726886/react-hook-send-data-from-child-to-parent-component */}
						<SelectMenu prop={choices} option={choice} name="Choice" onChange={setChoice} />
						{choice === choices[0] &&
						<>
							<SelectMenu prop={categories} option={category} name="Category" onChange={setCategory}/>
							<SelectMenu prop={dashboardData[idx].works} option={work} name="Work" onChange={setWork} />
						</>
						}
					</>
				}
				{(isUpdate && dashboardData[idx].works.length === 0)
					? <h2 className="mt-3">No works in this category, Please create one.</h2>
					: <button className="mt-5 border-4 border-indigo-500/100 rounded-lg p-1" onClick={handleSubmit}>Send</button>
				}
				{/* {(!isUpdate || dashboardData[idx].works.length !== 0) && <button className="mt-5 border-4 border-indigo-500/100 rounded-lg p-1" onClick={handleSubmit}>Send</button>} */}
			</div>
		</div>
	);
}

export default Dashboard;