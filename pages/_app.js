import "../styles/style.css";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: {session, ...pageProps } }) {

	if (Component.getLayout) {
		return Component.getLayout(<Component {...pageProps} />);
	}

	return (
		<>
			<SessionProvider session={session}>
				<Navbar />
				<DndProvider backend={HTML5Backend}>
					<Component {...pageProps} />
				</DndProvider>
			</SessionProvider>
			{/* <Footer /> */}
		</>
	);
}

export default MyApp;
