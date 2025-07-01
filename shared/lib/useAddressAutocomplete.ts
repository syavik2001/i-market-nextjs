import { useEffect, useRef, useState } from "react";

export const useAddressAutocomplete = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [value, setValue] = useState("");
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (!window.google?.maps?.places || !inputRef.current) return;

		const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
			types: ["address"],
			componentRestrictions: { country: "ua" },
		});

		autocomplete.addListener("place_changed", () => {
			const place = autocomplete.getPlace();
			if (place.formatted_address) {
				setValue(place.formatted_address);
			}
		});

		setReady(true);

		return () => {
			window.google.maps.event.clearInstanceListeners(autocomplete);
		};
	}, [inputRef.current, window.google?.maps?.places]);

	return { inputRef, value, setValue, ready };
};
