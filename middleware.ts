import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Для API-роутов добавляем заголовки, предотвращающие кэширование
	if (request.nextUrl.pathname.startsWith("/api/")) {
		const response = NextResponse.next();
		response.headers.set("Cache-Control", "no-store, must-revalidate");
		response.headers.set("Pragma", "no-cache");
		response.headers.set("Expires", "0");
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/:path*"],
};
