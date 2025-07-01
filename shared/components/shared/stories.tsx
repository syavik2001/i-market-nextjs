"use client";

import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import React from "react";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

// Ленивая загрузка ReactStories
const ReactStories = dynamic(() => import("react-insta-stories"), {
	ssr: false,
	loading: () => <div className="w-[520px] h-[800px] bg-gray-200 animate-pulse rounded" />,
});

interface Props {
	className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = React.useState<IStory[]>([]);
	const [open, setOpen] = React.useState(false);
	const [selectedStory, setSelectedStory] = React.useState<IStory>();

	React.useEffect(() => {
		async function fetchStories() {
			try {
				const data = await Api.stories.getAll();
				setStories(data);
			} catch (error) {
				console.error("Failed to fetch stories:", error);
			}
		}

		fetchStories();
	}, []);

	const onClickStory = (story: IStory) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	return (
		<>
			<Container className={cn("flex items-center justify-between gap-2 my-10", className)}>
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
					))}

				{stories.slice(0, 6).map((story) => (
					<img
						key={story.id}
						onClick={() => onClickStory(story)}
						className="rounded-md cursor-pointer"
						height={250}
						width={200}
						src={story.previewImageUrl}
						loading="lazy"
						alt="Story preview"
					/>
				))}

				{open && (
					<div
						className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30"
						onClick={(e) => {
							// Закрываем только при клике по фону, не по самой истории
							if (e.target === e.currentTarget) {
								setOpen(false);
							}
						}}>
						<div className="relative" style={{ width: 520 }}>
							<button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
								<X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
							</button>

							<ReactStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
								defaultInterval={3000}
								width={520}
								height={800}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	);
};
