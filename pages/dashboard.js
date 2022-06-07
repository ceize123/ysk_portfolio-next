import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SelectInput from "../components/SelectInput";

const typeData = [
	{
		id: 1,
		title: "Add New Section",
	},
	{
		id: 2,
		title: "Update Section",
	}
];

function Dashboard() {
	const [isLoading, setIsLoading] = useState(true);
	const [DashboardData, setDashboardData] = useState(null); 
	const [isUpdate, setIsUpdate] = useState(true); 
	const [work, setWork] = useState();
	const [type, setType] = useState();
	const router = useRouter();

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/works");
			const data = await response.json();
			setDashboardData(data);
			setIsLoading(false);
			setWork(data[0]);
			setType(typeData[0]);
		}
		fetchData();
	}, []);

	function handleClick() {
		setIsUpdate(!isUpdate);
	}
	function handleClick2() {
		console.log(work);
		console.log(type);
		router.push(`/modifier/updateCurProject/addSection/${work.id}`);
	}

	if (isLoading) return <h1 className="text-3xl text-center font-bold mt-6">Loading...</h1>;

	return (
		<>
			<h1 className="text-3xl text-center font-bold underline my-6">Dashboard</h1>
			<div className="mx-10">
				<div className="flex content-center">
					<p className="mt-1 mr-3 text-sm font-medium text-gray-700">Update Current Work</p>
					<label forhtml="toggle" className="inline-flex relative items-center cursor-pointer">
						<input type="checkbox" value="" id="toggle" className="sr-only peer" onClick={e => { handleClick(e); }}/>
						<div className="w-12 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
					</label>
					<p className="mt-1 ml-3 text-sm font-medium text-gray-700">Add New Work</p>
				</div>
				{isUpdate &&
					<>
						{/* Pass data from child to parent */}
						{/* https://stackoverflow.com/questions/55726886/react-hook-send-data-from-child-to-parent-component */}
						<SelectInput data={DashboardData} option={work} name="Work" onChange={setWork}/>
						<SelectInput data={typeData} option={type} name="Type" onChange={setType}/>
					</>
				}
				<button className="mt-5 border-4 border-indigo-500/100 rounded-lg p-1" onClick={handleClick2}>Send</button>
			</div>
		</>
	);
}

export default Dashboard;