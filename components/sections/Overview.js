function Overview({prop}) {
	const data = prop.overview;
	return (
		<section className="mx-auto overview text-left grid gap-2 grid-cols-12" >
			<div className="left-overview col-start-2 col-span-6">
				<h1>Overview</h1>
				<h2>{data.subtitle}</h2>
				<p>{data.paragraph}</p>
			</div>
			<div className="right-overview col-span-4 mx-auto">
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