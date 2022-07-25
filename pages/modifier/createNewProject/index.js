import PostFormSection from "../../../components/PostFormSection";
import { useSession } from "next-auth/react";
import { useBetween } from "use-between";
import {useShareLoading} from "../../../components/ShareStates";

function AddNew() {
	const { data: session } = useSession();
	const {loaded} = useBetween(useShareLoading);
	// const router = useRouter();

	// useEffect(() => {
	// 	if (!session) {
	// 		router.push("/");
	// 	}
	// }, []);
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