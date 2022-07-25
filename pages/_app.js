import "../styles/style.css";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SessionProvider } from "next-auth/react";
import { useShareLoading } from "../components/ShareStates";
import { useBetween } from "use-between";
import { useEffect } from "react";

function MyApp({ Component, pageProps: {session, ...pageProps } }) {
	const { loaded, setLoaded } = useBetween(useShareLoading);
	
	useEffect(() => {
		if (loaded) {
			const loading = document.querySelector(".loading");
			setTimeout(() => {
				loading.classList.add("hidden");
			}, 4000);
		}
	}, [loaded]);
	

	if (Component.getLayout) {
		return Component.getLayout(<Component {...pageProps} />);
	}

	return (
		<>
			<div className={`loading fixed top-0 h-screen w-screen ${loaded ? "opacity-0" : "z-50"}`}>
				<div className="loading-text">
					<span className="loading-text-words">L</span>
					<span className="loading-text-words">O</span>
					<span className="loading-text-words">A</span>
					<span className="loading-text-words">D</span>
					<span className="loading-text-words">I</span>
					<span className="loading-text-words">N</span>
					<span className="loading-text-words">G</span>
				</div>
			</div>
			<div onLoad={() => setLoaded(true)} >
				<SessionProvider session={session}>
					<Navbar />
					<DndProvider backend={HTML5Backend}>
						<Component {...pageProps} />
					</DndProvider>
				</SessionProvider>
			</div>
			{/* <Footer /> */}
		</>
	);
}

export default MyApp;
