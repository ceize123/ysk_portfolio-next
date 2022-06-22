import { useState, useEffect, useRef } from "react";
import { storage } from "../util/firebase";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";
import Button from "./Button";
import { useShareImageUrls } from "./ShareStates";
import { useBetween } from "use-between";

// Firebase
// https://www.youtube.com/watch?v=YOAeBSCkArA
function ImageInput({ prop, type = "", category = "", imageAry = "" }) {
	const imgRef = useRef();
	const imagesListRef = ref(storage, `${prop}/`);
	const [imageUpload, setImageUpload] = useState(null);
	const {imageUrls, setImageUrls} = useBetween(useShareImageUrls);

	const uploadImage = () => {
		if (imageUpload === null) return;
		if (type === "") deleteFromFirebase();

		if (type !== "carousel" && type !== "multiImages") {
			const imageRef = ref(storage, `${prop}/${imageUpload.name + v4()}`);
			uploadBytes(imageRef, imageUpload).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setImageUrls((prev) => [...prev, url]);
				});
			});
		} else {
			const keys = Object.keys(imageUpload);
			keys.map(key => {
				const imageRef = ref(storage, `${prop}/${imageUpload[key].name + v4()}`);
				uploadBytes(imageRef, imageUpload[key]).then((snapshot) => {
					getDownloadURL(snapshot.ref).then((url) => {
						setImageUrls((prev) => [...prev, url]);
					});
				});
			});
			
		}

		imgRef.current.value = "";
	};

	const deleteFromFirebase = () => {
		// const arr = imageAry.filter(item => item !== url);


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
								setImageUrls([]);
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
						setImageUrls([]);
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

	// const handleSingleDelete = (url) => {
	// 	// Create a reference to the file to delete
	// 	const delRef = ref(storage, url);

	// 	// Delete the file
	// 	deleteObject(delRef).then(() => {
	// 	// File deleted successfully
	// 		console.log(url, " deleted!");
	// 		setImageUrls([]);
	// 	}).catch((error) => {
	// 	// Uh-oh, an error occurred!
	// 		console.log("Something went wrong!");
	// 	});
	// 	setImageUpload(null);
	// };

	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}


	// useEffect(() => {
	// 	setImageUrls([]);
	// 	listAll(imagesListRef).then((response) => {
	// 		response.items.forEach((item) => {
	// 			getDownloadURL(item).then((url) => {
	// 				setImageUrls((prev) => [...prev, url]);
	// 			});
	// 		});
	// 	});
	// 	// imageUrl().then(() => { setImageUrls(imageUrls.filter(onlyUnique)); });
	// 	// console.log(imageUrls.filter(onlyUnique));
	// }, []);

	useEffect(() => {
		setImageUrls([]);
		if (type === "") {
			listAll(imagesListRef)
				.then((response) => {
					response.items.forEach((item) => {
						getDownloadURL(item).then((url) => {
							if (imageAry !== "") {
								const check = imageAry.includes(url);
								if (check) setImageUrls((prev) => [...prev, url]);
							} else {
								setImageUrls((prev) => [...prev, url]);
							}
						});
					});
					return response.items.length;
				});
		}
		// .then((number) => {
		// 	setImageUrls(imageUrls.splice(number)); // remove duplicated data
		// });
	}, [category, prop, type]);

	useEffect(() => {
		setImageUrls([]);
	}, [imageUpload]);

	return (
		<div className="mb-2 images">
			<label htmlFor="images" className="block text-sm font-medium text-gray-700">
				Images
			</label>
			<input
				type="file"
				name="images"
				id="images"
				required
				ref={imgRef}
				multiple={type === "carousel" || type === "multiImages" ? true : false}
				onChange={(e) => {
					setImageUpload(type === "carousel" || type === "multiImages"
						? e.target.files : e.target.files[0]);
				}}
			/>
			{imageUpload && <Button onClick={uploadImage} text="Upload" color="border-sky-600 hover:bg-sky-500 focus:ring-sky-500" />}
			<div className="flex mt-3">
				{imageUrls && imageUrls.map((url, idx) => (
					<div className="mr-3 relative" key={idx}>
						<Image
							// className="hover:opacity-50"
							// onClick={() => handleSingleDelete(url)}
							src={url} alt="preview" width={100} height={100}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ImageInput;