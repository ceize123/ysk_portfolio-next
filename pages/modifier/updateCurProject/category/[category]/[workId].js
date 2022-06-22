import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import findCat from "../../../../../components/FindCat";
import findId from "../../../../../components/FindId";
import TypeSection from "../../../../../components/TypeSection";
import Hero from "../../../../../components/sections/Hero";
import Overview from "../../../../../components/sections/Overview";
import PostFormSection from "../../../../../components/PostFormSection";
import UpdateFormSection from "../../../../../components/UpdateFormSection";
import { useShareUpdateNo, useShareProject, useShareImageUrls } from "../../../../../components/ShareStates";
import SelectMenu from "../../../../../components/SelectMenu";
import Button from "../../../../../components/Button";
import UpdateBtn from "../../../../../components/UpdateButtons";
import Input from "../../../../../components/Input";
import UploadImage from "../../../../../components/UploadImage";
import { overallCol, pageCol, listCol } from "../../../../../data/column";
import { types } from "../../../../../data/type";

function WorkDetail({ category, work }) {
	const { updateNo, setUpdateNo } = useBetween(useShareUpdateNo);
	const [ project, setProject ] = useState(work);

	const handleUpdate = (idx) => {
		setUpdateNo(idx);
	};
	const handleCancel = () => {
		setUpdateNo(null);
	};

	useEffect(() => {
		setProject(work);
	}, [work]);


	// Scroll to end of page
	// https://stackoverflow.com/questions/23843619/js-for-smooth-scroll-to-the-bottom-of-the-page
	const { pathname } = useRouter();
	useEffect(() => {
		window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
	}, [pathname]);

	return (
		<div className="mt-3">
			<h1 className="text-3xl mb-3 text-center">
				Add New Section to {project._id} | {project.title} | {project.description}
			</h1>
			<section className="mx-auto container">
				<div className="flex justify-between items-center mt-12 mb-7">
					<h2 className="text-2xl mb-3">1. Hero</h2>
					<UpdateBtn number={updateNo} index={1} handleUpdate={handleUpdate} handleCancel={handleCancel} />
				</div>
			</section>
			{(updateNo !== 1)
				? <Hero data={project} />
				: <section className="mx-auto container">
					<UpdateFormSection
						prop={project}
						isOverview={false}
						param={category}
						workId={project._id}
						filter="hero"
						title={project.title}
					/>
				</section>
			}

			<section className="mt-5 mx-auto container">
				<div className="flex justify-between items-center mt-12 mb-7">
					<h2 className="text-2xl mb-3">2. Overview</h2>
					<UpdateBtn number={updateNo} index={2} handleUpdate={handleUpdate} handleCancel={handleCancel} />
				</div>
				{(updateNo !== 2)
					? <Overview prop={project} />
					: <UpdateFormSection
						prop={project}
						isOverview={true}
						param={category}
						workId={project._id}
						filter="overview"
						title={project.title}
					/>
				}
			</section>

			<div className="mx-auto container">
				{project.sections.map((section, idx) => (
					<section className="mt-5" key={idx}>
						<div className="flex justify-between items-center mt-12 mb-7">
							<h2 className="text-2xl mb-3 text-left">{idx + 3}. {section.type}</h2>
							<UpdateBtn number={updateNo} index={idx + 3} handleUpdate={handleUpdate} handleCancel={handleCancel} />
						</div>
						{(updateNo !== idx + 3)
							? <TypeSection prop={section} />
							: <UpdateFormSection
								prop={section}
								param={category}
								workId={project._id}
								filter="sections"
								sectionNo={idx}
								title={project.title}
							/>
						}
					</section>
				))}

				{!updateNo &&
					<section className="mx-10 mt-12">
						<div className="mt-5 addNewSection">
							<h2 className="text-center">Add Sections:</h2>
							<PostFormSection param={category} workId={project._id} filter="sections" title={project.title} />
						</div>
					</section>
				}
			</div>
		</div>
	);
}

export default WorkDetail;

export async function getStaticPaths() {
	const response = await fetch("http://localhost:3000/api/works");
	const data = await response.json();
	let dataArray = [];

	data.map(category => {	
		category.works.map(work => {
			const param = { category: category.category, id: work._id };
			dataArray.push(param);
		});
	});

	const paths = dataArray.map(item => {
		return {
			params: {
				category: `${item.category}`,
				workId: `${item.id}`
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
	const { category, workId } = params;
	const response = await fetch(`http://localhost:3000/api/works/category/${category}/${workId}`);
	const data = await response.json();
	const work = data;

	return {
		props: {
			category: category,
			work,
		},
		revalidate: 10
	};
}