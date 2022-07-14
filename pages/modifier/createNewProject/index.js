import PostFormSection from "../../../components/PostFormSection";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function AddNew() {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			router.push("/");
		}
	}, []);
	return (
		<>
			{session &&
			<div className="back-end">
				<h1 className="text-3xl text-center font-bold underline my-6">Create New Project</h1>
				<PostFormSection filter="create" />
			</div>
			}
		</>
	);
}

export default AddNew;