import ig from "../public/image/ig.png";
import imageOnly from "../public/image/imageOnly.png";
import textImage from "../public/image/textImage.png";
import card1 from "../public/image/card1.png";
import card2 from "../public/image/card2.png";
import card3 from "../public/image/card3.png";
import card4 from "../public/image/card4.png";
import card5 from "../public/image/card5.png";
import card6 from "../public/image/card6.png";
import carousel1 from "../public/image/carousel-page1-1.png";
import carousel2 from "../public/image/carousel-page1-2.png";
import carousel3 from "../public/image/carousel-page2-1.png";
import carousel4 from "../public/image/carousel-page2-2.png";
import carousel5 from "../public/image/carousel-page3-1.png";
import carousel6 from "../public/image/carousel-page3-2.png";
import carousel7 from "../public/image/carousel-page3-3.png";
import carousel8 from "../public/image/carousel-page3-4.png";
import horizon from "../public/image/horizon.png";
import list from "../public/image/list.png";

export const workData = [
	{
		category: "uiux",
		works: [
			{
				id: 1,
				title: "IG",
				description: "instagram",
				navColor: "#150F43",
				heroImage: ig,
				overview: {
					subtitle: "I redesigned Andrea Ko Jewelry Design Courses Website (RWD) to make it more organized and clean.",
					paragraph: "The original online presence and the information were lacking. ",
					timeline: "2 Weeks",
					role: "UI/UX Designer",
					team: "Personal Project"
				},
				sections: [
					// {
					// 	type: "overview",
					// 	subtitle: "I redesigned Andrea Ko Jewelry Design Courses Website (RWD) to make it more organized and clean.",
					// 	paragraph: "The original online presence and the information were lacking. ",
					// 	timeline: "2 Weeks",
					// 	role: "UI/UX Designer",
					// 	team: "Personal Project"
					// },
					{
						type: "imageOnly",
						images: [imageOnly]
					},
					{
						type: "textImage",
						title: "Here is how I do...",
						paragraph: "Adapting the double diamond is to build a framework that will handle the usability issues and find ways to solve them.",
						images: [textImage]
					},
					{
						type: "multiImages",
						title: "Here's what I found after the test!",
						paragraph: "The success rate seems not bad. To know more insights from the users, let's dive into it deeper!",
						images: [card1, card2, card3, card4, card5, card6]
					},
					{
						type: "carousel",
						images: [carousel1, carousel2, carousel3, carousel4, carousel5, carousel6, carousel7, carousel8],
						pages: [
							{
								issue: "It's hard to find the hiding friends function.",
								description: "From my observation, though there is a setting icon in the top right corner on the creating story page, no one found it. It takes them many steps to hide their friends, and even the users who frequently use the function choose to hide the friend after they publish it, which they don't like the way.",
								solution: "It is intuitive to hide the friend before they publish it. Thus, I put the story setting function on the editing story page.",
								imagesNeed: 2
							},
							{
								issue: "User can't cut picture and adjust video length in story editing.",
								description: "Users have to leave Instagram and edit the picture size and video length, making them feel annoyed.",
								solution: "I added these two essential functions to help them finish the editing without leaving Instagram.",
								imagesNeed: 2
							},
							{
								issue: "Forget friends' accounts when the user wants to tag them.",
								description: "Most users don't know they can tag friends by typing friends' \"Name.\" Mostly, they struggle to recall friends' accounts. However, tagging by typing \"Name\" doesn't work every time (Technical issue). Further, when a friend doesn't have a \"Name\" on the profile, users can't find it by typing \"Name.\"",
								solution: "I added these two essential functions to help them finish the editing without leaving Instagram.",
								imagesNeed: 4
							},
						]
					},
					{
						type: "textOnly",
						title: "Think Design, Design Thinking",
						paragraph: "Ideate"
					},
					{
						type: "horizon",
						title: "Information Architecture",
						paragraph: "Finding information quickly with a good IA!",
						images: [horizon]
					},
					{
						type: "list",
						images: [list],
						color: "#F5C261",
						lists: [
							{
								listTitle: "AI pose detection",
								listParagraph: "To detect if the pose is correct or not, and with visual and voice alert simultaneously."
							},
							{
								listTitle: "Challenge by days",
								listParagraph: "Setting a short-term goal helps users feel less stressed about exercising. It allows users to choose a workout cycle which can be 7days, 14 days, 21 days or 30 days."
							}
						]
					}
				]
			},
			{
				id: 2,
				title: "AK Jewelry",
				description: "jewelry-design",
				navColor: "#9D968F",
				heroImage: "",
				overview: {
					subtitle: "I redesigned Andrea Ko Jewelry Design Courses Website (RWD) to make it more organized and clean.",
					paragraph: "The original online presence and the information were lacking. ",
					timeline: "2 Weeks",
					role: "UI/UX Designer",
					team: "Personal Project"
				},
			},
			{
				id: 3,
				title: "Personal Training APP",
				description: "training",
				navColor: "#262626",
				heroImage: "",
				overview: {
					subtitle: "I redesigned Andrea Ko Jewelry Design Courses Website (RWD) to make it more organized and clean.",
					paragraph: "The original online presence and the information were lacking. ",
					timeline: "2 Weeks",
					role: "UI/UX Designer",
					team: "Personal Project"
				},
			}
		]
	},
	{
		category: "motion",
		works: [
			{
				id: 4,
				title: "Hey",
				description: "instagram",
				navColor: "#150F43",
				heroImage: ig,
				overview: {
					subtitle: "I redesigned Andrea Ko Jewelry Design Courses Website (RWD).",
					paragraph: "The original online presence and the information were lacking. ",
					timeline: "2",
					role: "UI/UX Designer",
					team: "Personal Project"
				},
				sections: [
					{
						type: "textImage",
						title: "Here is how I do...",
						paragraph: "Adapting the double diamond is to build a framework.",
						images: [textImage]
					},
					{
						type: "imageOnly",
						images: [imageOnly]
					},
					{
						type: "multiImages",
						title: "Here's what I found after the test!",
						paragraph: "The success rate seems not bad. To know more insights from the users, let's dive into it deeper!",
						images: [card1, card2, card3, card4, card5, card6]
					},
					{
						type: "carousel",
						images: [carousel1, carousel2, carousel3, carousel4, carousel5, carousel6, carousel7, carousel8],
						pages: [
							{
								issue: "It's hard to find the hiding friends function.",
								description: "From my observation, though there is a setting icon in the top right corner on the creating story page, no one found it. It takes them many steps to hide their friends, and even the users who frequently use the function choose to hide the friend after they publish it, which they don't like the way.",
								solution: "It is intuitive to hide the friend before they publish it. Thus, I put the story setting function on the editing story page.",
								imagesNeed: 2
							},
							{
								issue: "User can't cut picture and adjust video length in story editing.",
								description: "Users have to leave Instagram and edit the picture size and video length, making them feel annoyed.",
								solution: "I added these two essential functions to help them finish the editing without leaving Instagram.",
								imagesNeed: 2
							},
							{
								issue: "Forget friends' accounts when the user wants to tag them.",
								description: "Most users don't know they can tag friends by typing friends' \"Name.\" Mostly, they struggle to recall friends' accounts. However, tagging by typing \"Name\" doesn't work every time (Technical issue). Further, when a friend doesn't have a \"Name\" on the profile, users can't find it by typing \"Name.\"",
								solution: "I added these two essential functions to help them finish the editing without leaving Instagram.",
								imagesNeed: 4
							},
						]
					},
					{
						type: "textOnly",
						title: "Think Design, Design Thinking",
						paragraph: "Ideate"
					},
					{
						type: "list",
						images: [list],
						color: "#ccc",
						lists: [
							{
								listTitle: "AI pose detection",
								listParagraph: "To detect if the pose is correct or not, and with visual and voice alert simultaneously."
							},
							{
								listTitle: "Challenge by days",
								listParagraph: "Setting a short-term goal helps users feel less stressed about exercising. It allows users to choose a workout cycle which can be 7days, 14 days, 21 days or 30 days."
							}
						]
					},
					{
						type: "horizon",
						title: "Information Architecture",
						paragraph: "Finding information quickly with a good IA!",
						images: [horizon]
					},
				]
			},
			{
				id: 5,
				title: "Test",
			}
		]
	},
	{
		category: "graphic",
		works: [
			{
				id: 6,
				title: "Test",
			},
			{
				id: 7,
				title: "Test",
			}
		]
	}
];