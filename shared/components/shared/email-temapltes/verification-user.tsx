import React from "react";

interface Props {
	code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
	<div
		style={{
			fontFamily: "Arial, sans-serif",
			maxWidth: "600px",
			margin: "0 auto",
			padding: "20px",
		}}>
		<h1 style={{ color: "#333", textAlign: "center" }}>Next Pizza</h1>

		<div
			style={{
				backgroundColor: "#f9f9f9",
				padding: "30px",
				borderRadius: "10px",
				margin: "20px 0",
			}}>
			<h2 style={{ color: "#333", marginBottom: "20px" }}>Підтвердження реєстрації</h2>

			<p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
				Дякуємо за реєстрацію! Для завершення процесу підтвердьте свою електронну пошту.
			</p>

			<div style={{ textAlign: "center", margin: "30px 0" }}>
				<p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
					Ваш код підтвердження:
				</p>
				<div
					style={{
						fontSize: "32px",
						fontWeight: "bold",
						color: "#fff",
						backgroundColor: "#007bff",
						padding: "15px 30px",
						borderRadius: "8px",
						display: "inline-block",
						letterSpacing: "5px",
					}}>
					{code}
				</div>
			</div>

			<div style={{ textAlign: "center", margin: "30px 0" }}>
				<a
					href={`http://localhost:3000/api/auth/verify?code=${code}`}
					style={{
						backgroundColor: "#28a745",
						color: "#fff",
						padding: "12px 30px",
						textDecoration: "none",
						borderRadius: "5px",
						fontSize: "16px",
						fontWeight: "bold",
					}}>
					Підтвердити реєстрацію
				</a>
			</div>

			<p style={{ fontSize: "14px", color: "#999", textAlign: "center" }}>
				Якщо кнопка не працює, скопіюйте це посилання в браузер:
				<br />
				<a href={`http://localhost:3000/api/auth/verify?code=${code}`} style={{ color: "#007bff" }}>
					http://localhost:3000/api/auth/verify?code={code}
				</a>
			</p>
		</div>

		<p style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
			Цей лист надіслано автоматично, не відповідайте на нього.
		</p>
	</div>
);
