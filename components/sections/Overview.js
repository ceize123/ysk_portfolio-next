function Overview({prop}) {
	const data = prop.overview;
	return (
		<section className="md:mx-auto mx-5 overview text-left grid md:gap-8 gap-y-12 md:gap-y-0 grid-cols-12">
			<div className="left-overview md:col-start-2 md:col-span-6 col-span-12">
				<h1>Overview</h1>
				<h2>{data.subtitle}</h2>
				<p>{data.paragraph}</p>
			</div>
			<div className="col-span-1 border-l-2 border-black ml-4 md:ml-0"></div>
			<div className="right-overview md:col-span-3 col-span-9 mx-auto">
				<h3>timeline</h3>
				<p>{data.timeline}</p>
				<h3>role</h3>
				<p>{data.role}</p>
				<h3>team</h3>
				<p>{data.team}</p>
			</div>
		</section>
	);
}

export default Overview;