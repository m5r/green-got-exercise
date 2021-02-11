import type { NextApiRequest, NextApiResponse } from "next";

import type { ApiError } from "./_types";

type ResponseBody = string;
type Response = ResponseBody | ApiError;

export default async function greetings(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method !== "GET") {
		const statusCode = 405;
		const apiError: ApiError = {
			statusCode,
			errorMessage: `Method ${req.method} Not Allowed`,
		};
		console.error(apiError);

		res.setHeader("Allow", ["GET"]);
		res.status(statusCode).send(apiError);
		return;
	}

	const firstName = req.query.first_name;
	if (!firstName) {
		const statusCode = 400;
		const apiError: ApiError = {
			statusCode,
			errorMessage: `Missing query parameter "first_name"`,
		};
		console.error(apiError);

		res.status(statusCode).send(apiError);
		return;
	}

	res.status(200).send(`Hello ${firstName}`);
}
