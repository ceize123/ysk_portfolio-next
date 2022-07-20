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

function ImageInputMobile({ prop, type = "", category = "", imageAry = ""}) {
	const imgRef = useRef();
	const imagesListRef = ref(storage, `${prop}/`);
	const [imageUpload, setImageUpload] = useState(null);
	const { imageUrlsMobile, setImageUrlsMobile } = useBetween(useShareImageUrls);

	const recursionUpload = (number) => {
		const imageRef = ref(storage, `${prop}/${imageUpload[number].name + v4()}`);
		uploadBytes(imageRef, imageUpload[number]).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrlsMobile((prev) => [...prev, url]);
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
			setImageUrlsMobile([]);
		}

		if ((type !== "carousel" && type !== "multiImages" && type !== "titleImage") && imageAry.length <= 1) {
			const imageRef = ref(storage, `${prop}/${imageUpload.name + v4()}`);
			uploadBytes(imageRef, imageUpload).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setImageUrlsMobile((prev) => [...prev, url]);
				});
			});
			imgRef.current.value = "";
		} else {
			const keys = Object.keys(imageUpload);
			console.log(keys);
			recursionUpload(0);
		}

	};

	useEffect(() => {
		setImageUpload(null);
		imgRef.current.value = "";
		setImageUrlsMobile([]);
		if (type === "") {
			listAll(imagesListRef)
				.then((response) => {
					response.items.forEach((item) => {
						getDownloadURL(item).then((url) => {
							if (imageAry !== "") {
								const check = imageAry.includes(url);
								if (check) setImageUrlsMobile((prev) => [...prev, url]);
							} else {
								setImageUrlsMobile((prev) => [...prev, url]);
							}
						});
					});
					return response.items.length;
				});
		}
	}, [category, prop, type]);

	useEffect(() => {
		console.log(imageUpload);
		setImageUrlsMobile([]);
	}, [imageUpload]);

	return (
		<div className="mb-2 images-mobile upload-section">
			<label htmlFor="images-mobile" className="flex items-center text-sm font-medium text-gray-700">
				<span className="text-indigo-500">Mobile-</span>Images
				<span className="pl-2">{imageUrlsMobile.length > 0 ? <HiOutlineCheckCircle /> : <GiCrossMark />}</span>
			</label>
			<input
				type="file"
				name="images-mobile"
				id="images-mobile"
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
				{imageUrlsMobile && imageUrlsMobile.map((url, idx) => (
					<div className="mr-3 relative" key={idx}>
						<Image
							src={url} alt="preview" width={100} height={100}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ImageInputMobile;