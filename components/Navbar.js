import Link from "next/link";

function Navbar() {
	return (
		<nav className="header">
			<h1 className="logo">
				<a href='#'>YSK</a>
			</h1>
			<ul className="main-nav">
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="#work">
						<a>Work</a>
					</Link>
				</li>
				<li>
					<Link href="#">
						<a>Resume</a>
					</Link>
				</li>
				<li>
					<Link href="/dashboard">
						<a>Dashboard</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;