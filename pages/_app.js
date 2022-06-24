import "../styles/style.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MyApp({ Component, pageProps }) {

	return (
		<>
			<Navbar />
			<DndProvider backend={HTML5Backend}>
				<Component {...pageProps} />
			</DndProvider>
			<Footer />
		</>
	);
}

export default MyApp;
