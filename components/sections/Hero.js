function Hero(data) {
	const work = data.data;
	const image = work.description;
	return (
		<div className={`hero-image ${data ? image : ""}`}>
			{/* <Image src={work.heroImage} alt="Hero" layout="fill" objectFit="contain" /> */}
		</div>
	);
}

export default Hero;