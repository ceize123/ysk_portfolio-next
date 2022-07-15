import { useBetween } from "use-between";
import findCat from "../../../../../components/FindCat";
import findId from "../../../../../components/FindId";
import TypeSection from "../../../../../components/TypeSection";
import Hero from "../../../../../components/sections/Hero";
import Overview from "../../../../../components/sections/Overview";
import PostFormSection from "../../../../../components/PostFormSection";
import UpdateFormSection from "../../../../../components/UpdateFormSection";
import { useShareUpdateNo } from "../../../../../components/ShareStates";
import UpdateBtn from "../../../../../components/UpdateButtons";

import dbConnect from "../../../../../util/connection";
import Category from "../../../../../models/Category";
import Work from "../../../../../models/Work";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function WorkDetail({category, work}) {
	const { updateNo, setUpdateNo } = useBetween(useShareUpdateNo);

	const { data: session } = useSession();
	// const router = useRouter();

	// useEffect(() => {
	// 	if (!session) {
	// 		router.push("/");
	// 	}
	// }, [session]);

	
	// Scroll to end of page
	// https://stackoverflow.com/questions/23843619/js-for-smooth-scroll-to-the-bottom-of-the-page
	// const {pathname} = useRouter();
	// useEffect(() => {
	// 	window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
	// }, [pathname]);


	const handleUpdate = (idx) => {
		setUpdateNo(idx);
	};
	const handleCancel = () => {
		setUpdateNo(null);
	};

	return (
		<div className="mt-3 back-end">
			{session && work &&
				<>
					<h1 className="text-3xl mb-3 text-center">
						Add New Section to | {work.title} | {work.description}
					</h1>
					<section className="mx-auto container">
						<div className="flex justify-between items-center mt-12 mb-7">
							<h2 className="text-2xl mb-3">1. Hero</h2>
							<UpdateBtn number={updateNo} index={1} handleUpdate={handleUpdate} handleCancel={handleCancel} />
						</div>
					</section>
					{(updateNo !== 1)
						? <Hero data={work} />
						: <section className="mx-auto container">
							<UpdateFormSection
								prop={work}
								isOverview={false}
								param={category}
								workId={work._id}
								filter="hero"
								title={work.title}
							/>
						</section>
					}

					<section className="mt-5 mx-auto container templates">
						<div className="flex justify-between items-center mt-12 mb-7">
							<h2 className="text-2xl mb-3">2. Overview</h2>
							<UpdateBtn number={updateNo} index={2} handleUpdate={handleUpdate} handleCancel={handleCancel} />
						</div>
						{(updateNo !== 2)
							? <Overview prop={work} />
							: <UpdateFormSection
								prop={work}
								isOverview={true}
								param={category}
								workId={work._id}
								filter="overview"
								title={work.title}
							/>
						}
					</section>

					<div className="mx-auto container">
						{work.sections.map((section, idx) => (
							<section className="mt-5 border-t-4" key={idx}>
								<div className="flex justify-between items-center mt-12 mb-7">
									<h2 className="text-2xl mb-3 text-left">{idx + 3}. {section.type}</h2>
									<UpdateBtn number={updateNo} index={idx + 3} handleUpdate={handleUpdate} handleCancel={handleCancel} />
								</div>
								{(updateNo !== idx + 3)
									? <TypeSection prop={section} />
									: <UpdateFormSection
										prop={section}
										param={category}
										workId={work._id}
										filter="sections"
										sectionNo={idx}
										title={work.title}
									/>
								}
							</section>
						))}

						{!updateNo &&
							<section className="mx-10 my-12">
								<div className="mt-5 addNewSection">
									<h2 className="text-center">Add Sections:</h2>
									<PostFormSection param={category} workId={work._id} filter="sections" title={work.title} />
								</div>
							</section>
						}
					</div>
				</>
			}
		</div>
	);
}

export default WorkDetail;

export async function getStaticPaths() {
	// const response = await fetch("http://localhost:3000/api/works");
	// const response = await fetch(`${process.env.URL}/api/works`);
	// const data = await response.json();

	await dbConnect();
	const response = await Category.find();

	const data = await JSON.parse(JSON.stringify(response));
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
	// const response = await fetch(`http://localhost:3000/api/works/category/${category}/${workId}`);
	// const response = await fetch(`${process.env.URL}/api/works/category/${category}/${workId}`);
	// const data = await response.json();

	await dbConnect();
	const response = await Work.findOne({ "_id": workId });
	const data = await JSON.parse(JSON.stringify(response));
	const work = data;

	return {
		props: {
			category: category,
			work,
		},
		revalidate: 10
	};
}