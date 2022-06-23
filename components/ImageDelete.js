import { storage } from "../util/firebase";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";

export const deleteFromFirebase = (prop, imageAry) => {
	const imagesListRef = ref(storage, `${prop}/`);

	listAll(imagesListRef).then((response) => {
		response.items.forEach((item) => {
			if (imageAry !== "") {
				getDownloadURL(item).then((url) => {
					// https://stackoverflow.com/questions/71880899/firebase-storage-delete-image-by-downloadurl-v9
					const link = imageAry.find(ele => ele === url);
					console.log("link", link);
					if (link !== undefined) {
						const fileRef = ref(storage, link);
						deleteObject(fileRef).then(() => {
							// File deleted successfully
							console.log("Deleted!");
						}).catch((error) => {
							// Uh-oh, an error occurred!
							console.log("Something went wrong!");
						});
					}
				});

			} else {
				const fileRef = ref(storage, `${prop}/${item.name}`);
				// Delete the file
				deleteObject(fileRef).then(() => {
					// File deleted successfully
					console.log("Deleted!");
					
				}).catch((error) => {
					// Uh-oh, an error occurred!
					console.log("Something went wrong!");
				});
			}
		});
	});
	// listAll(imagesListRef).then((response) => {
	// 	response.items.forEach((item) => {
	// 		const fileRef = ref(storage, `${prop}/${item.name}`);
	// 		// Delete the file
	// 		deleteObject(fileRef).then(() => {
	// 			// File deleted successfully
	// 			console.log("Deleted!");
	// 			setImageUrls([]);
	// 		}).catch((error) => {
	// 			// Uh-oh, an error occurred!
	// 			console.log("Something went wrong!");
	// 		});
	// 	});
	// });
};