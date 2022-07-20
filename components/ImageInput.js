import { useState, useEffect, useRef } from "react";
import { storage } from "../util/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";
import Button from "./Button";
import { deleteFromFirebase } from "./ImageDelete";
import { useShareImageUrls } from "./ShareStates";
import { useBetween } from "use-between";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { GiCrossMark } from "react-icons/gi";

// Firebase
// https://www.youtube.com/watch?v=YOAeBSCkArA
function ImageInput({ prop, type = "", category = "", imageAry = ""}) {
	const imgRef = useRef();
	const imagesListRef = ref(storage, `${prop}/`);
	const [imageUpload, setImageUpload] = useState(null);
	const { imageUrls, setImageUrls } = useBetween(useShareImageUrls);

	const recursionUpload = (number) => {
		const imageRef = ref(storage, `${prop}/${imageUpload[number].name + v4()}`);
		uploadBytes(imageRef, imageUpload[number]).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			}).then(() => {
				let nextNumber = number + 1;
				if (nextNumber < imageUpload.length) {
					recursionUpload(nextNumber);
				} else {
					imgRef.current.value = "";
				}
			});
		});
		
	};

	const uploadImage = () => {
		if (imageUpload === null) return;
		if (type === "") {
			deleteFromFirebase(prop, imageAry);
			setImageUrls([]);
		}

		if ((type !== "carousel" && type !== "multiImages" && type !== "titleImage") && imageAry.length <= 1) {
			const imageRef = ref(storage, `${prop}/${imageUpload.name + v4()}`);
			uploadBytes(imageRef, imageUpload).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setImageUrls((prev) => [...prev, url]);
				});
			});
			imgRef.current.value = "";
		} else {
			const keys = Object.keys(imageUpload);
			console.log(keys);
			recursionUpload(0);
			// keys.map(key => {
			// 	const imageRef = ref(storage, `${prop}/${imageUpload[key].name + v4()}`);
			// 	uploadBytes(imageRef, imageUpload[key]).then((snapshot) => {
			// 		getDownloadURL(snapshot.ref).then((url) => {
			// 			setImageUrls((prev) => [...prev, url]);
			// 		});
			// 	});
			// });
			
		}

		// imgRef.current.value = "";
	};

	// const deleteFromFirebase = () => {
	// 	// const arr = imageAry.filter(item => item !== url);


	// 	listAll(imagesListRef).then((response) => {
	// 		response.items.forEach((item) => {
	// 			if (imageAry !== "") { 
	// 				getDownloadURL(item).then((url) => {
	// 					// https://stackoverflow.com/questions/71880899/firebase-storage-delete-image-by-downloadurl-v9
	// 					const link = imageAry.find(ele => ele === url);
	// 					console.log("link", link);
	// 					if (link !== undefined) {
	// 						const fileRef = ref(storage, link);
	// 						deleteObject(fileRef).then(() => {
	// 							// File deleted successfully
	// 							console.log("Deleted!");
	// 							setImageUrls([]);
	// 						}).catch((error) => {
	// 							// Uh-oh, an error occurred!
	// 							console.log("Something went wrong!");
	// 						});
	// 					}
	// 				});

	// 			} else {
	// 				const fileRef = ref(storage, `${prop}/${item.name}`);
	// 				// Delete the file
	// 				deleteObject(fileRef).then(() => {
	// 					// File deleted successfully
	// 					console.log("Deleted!");
	// 					setImageUrls([]);
	// 				}).catch((error) => {
	// 					// Uh-oh, an error occurred!
	// 					console.log("Something went wrong!");
	// 				});
	// 			}
	// 		});
	// 	});
	// };

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
		setImageUpload(null);
		imgRef.current.value = "";
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
		<div className="mb-2 images upload-section">
			<label htmlFor="images" className="flex items-center text-sm font-medium text-gray-700">
				Images
				<span className="pl-2">{imageUrls.length > 0 ? <HiOutlineCheckCircle /> : <GiCrossMark />}</span>
			</label>
			<input
				type="file"
				name="images"
				id="images"
				required
				ref={imgRef}
				multiple={(type === "carousel" || type === "multiImages" || type === "titleImage" || imageAry.length > 1) ? true : false}
				onChange={(e) => {
					setImageUpload((type === "carousel" || type === "multiImages" || type === "titleImage" || imageAry.length > 1)
						? e.target.files : e.target.files[0]);
				}}
			/>
			{imageUpload && <Button onClick={uploadImage} text="Upload" color="border-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500" />}
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