"use client";

import Script from "next/script";
import React, { useState, useEffect } from "react";

interface Props {
	children: React.ReactNode;
}

export const GooglePlacesProvider: React.FC<Props> = ({ children }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (window.google?.maps?.places) {
			setLoaded(true);
		}
	}, []);

	return (
		<>
			<Script
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBf86oPMHtC6dpBe1fEZC-USLHExnZZdws&libraries=places&language=uk"
				strategy="afterInteractive"
				onLoad={() => setLoaded(true)}
			/>
			{loaded ? children : null}
		</>
	);
};
