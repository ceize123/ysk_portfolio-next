import "../styles/globals.css";
import Navbar from "../components/Navbar";
import "../styles/Navbar.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Navbar />
			<DndProvider backend={HTML5Backend}>
				<Component {...pageProps} />
			</DndProvider>
		</>
	);
}

export default MyApp;
