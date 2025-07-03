"use client";

import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import React from "react";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useAutoScroll } from "@/shared/hooks/use-auto-scroll";

// Ленивая загрузка ReactStories
const ReactStories = dynamic(() => import("react-insta-stories"), {
	ssr: false,
	loading: () => (
		<div className="w-full max-w-[520px] h-[600px] md:h-[800px] bg-gray-200 animate-pulse rounded" />
	),
});

interface Props {
	className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = React.useState<IStory[]>([]);
	const [open, setOpen] = React.useState(false);
	const [selectedStory, setSelectedStory] = React.useState<IStory>();

	// Автоматическая прокрутка только если Stories не помещаются
	const autoScrollRef = useAutoScroll({
		enabled: stories.length > 0,
		speed: 25, // медленная прокрутка
		pauseOnHover: true,
	});

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
			<Container className={cn("my-6 md:my-10", className)}>
				{/* Заголовок для мобильных */}
				<h2 className="text-lg md:text-xl font-bold mb-4 md:hidden">Історії</h2>

				{/* Контейнер с горизонтальным скроллом на мобильных */}
				<div
					ref={autoScrollRef}
					className="flex gap-3 md:gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
					{stories.length === 0 &&
						[...Array(12)].map((_, index) => (
							<div
								key={index}
								className="flex-shrink-0 w-[150px] h-[180px] md:w-[180px] md:h-[220px] lg:w-[200px] lg:h-[250px] bg-gray-200 rounded-md animate-pulse"
							/>
						))}

					{/* Дублируем Stories для создания карусели */}
					{stories.slice(0, 6).map((story) => (
						<img
							key={`original-${story.id}`}
							onClick={() => onClickStory(story)}
							className="flex-shrink-0 rounded-md cursor-pointer transition-transform hover:scale-105 active:scale-95 w-[150px] h-[180px] md:w-[180px] md:h-[220px] lg:w-[200px] lg:h-[250px]"
							src={story.previewImageUrl}
							loading="lazy"
							alt="Story preview"
						/>
					))}

					{/* Дублированные Stories для бесконечной прокрутки */}
					{stories.slice(0, 6).map((story) => (
						<img
							key={`duplicate-${story.id}`}
							onClick={() => onClickStory(story)}
							className="flex-shrink-0 rounded-md cursor-pointer transition-transform hover:scale-105 active:scale-95 w-[150px] h-[180px] md:w-[180px] md:h-[220px] lg:w-[200px] lg:h-[250px]"
							src={story.previewImageUrl}
							loading="lazy"
							alt="Story preview"
						/>
					))}
				</div>

				{open && (
					<div
						className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
						onClick={(e) => {
							// Закрываем только при клике по фону, не по самой истории
							if (e.target === e.currentTarget) {
								setOpen(false);
							}
						}}>
						<div className="relative w-full max-w-[520px]">
							<button
								className="absolute -right-2 -top-2 md:-right-10 md:-top-5 z-30 bg-black/50 rounded-full p-2"
								onClick={() => setOpen(false)}>
								<X className="w-6 h-6 md:w-8 md:h-8 text-white" />
							</button>

							<div className="h-[600px] md:h-[800px]">
								<ReactStories
									onAllStoriesEnd={() => setOpen(false)}
									stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
									defaultInterval={3000}
									width="100%"
									height="100%"
								/>
							</div>
						</div>
					</div>
				)}
			</Container>
		</>
	);
};
