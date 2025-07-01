import { Resend } from "resend";

export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {
	const resend = new Resend(process.env.RESEND_API_KEY);

	const { data, error } = await resend.emails.send({
		from: "onboarding@resend.dev",
		to: "syavik2001@gmail.com",
		subject: subject,
		text: "Письмо от Next Pizza",
		react: template,
	});

	if (error) {
		console.error("Error sending email:", error);
		throw error;
	}

	return data;
};
