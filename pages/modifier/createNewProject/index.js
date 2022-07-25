import PostFormSection from "../../../components/PostFormSection";
import { useSession } from "next-auth/react";

function AddNew() {
	const { data: session } = useSession();
	return (
		<>
			{session &&
			<div className="back-end md:mt-14 mt-12">
				<h1 className="text-3xl text-center font-bold underline my-6">Create New Project</h1>
				<PostFormSection filter="create" />
			</div>
			}
		</>
	);
}

export default AddNew;