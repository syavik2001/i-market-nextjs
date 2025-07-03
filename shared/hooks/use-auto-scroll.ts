import { useEffect, useRef } from "react";

interface UseAutoScrollProps {
	enabled: boolean;
	speed?: number; // пикселей в секунду
	pauseOnHover?: boolean;
}

export const useAutoScroll = ({ enabled, speed = 30, pauseOnHover = true }: UseAutoScrollProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number>();
	const isHovered = useRef(false);

	useEffect(() => {
		if (!enabled || !containerRef.current) return;

		const container = containerRef.current;
		const scrollWidth = container.scrollWidth;
		const clientWidth = container.clientWidth;

		// Если контент помещается в контейнер, не нужна прокрутка
		if (scrollWidth <= clientWidth) return;

		let currentScroll = 0;
		const step = speed / 60; // делим на 60 FPS
		const singleSetWidth = scrollWidth / 2; // ширина одного набора элементов

		const animate = () => {
			if (isHovered.current) {
				animationRef.current = requestAnimationFrame(animate);
				return;
			}

			currentScroll += step;

			// Карусельная прокрутка: когда достигаем конца первого набора, переходим к началу
			if (currentScroll >= singleSetWidth) {
				currentScroll = 0;
				container.scrollLeft = 0;
			} else {
				container.scrollLeft = currentScroll;
			}

			animationRef.current = requestAnimationFrame(animate);
		};

		// Обработчики для паузы при наведении
		const handleMouseEnter = () => {
			isHovered.current = true;
		};

		const handleMouseLeave = () => {
			isHovered.current = false;
		};

		if (pauseOnHover) {
			container.addEventListener("mouseenter", handleMouseEnter);
			container.addEventListener("mouseleave", handleMouseLeave);
		}

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			if (pauseOnHover) {
				container.removeEventListener("mouseenter", handleMouseEnter);
				container.removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, [enabled, speed, pauseOnHover]);

	return containerRef;
};
