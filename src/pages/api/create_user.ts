import type { NextApiRequest, NextApiResponse } from "next";

import type { ApiError } from "./_types";

type RequestBody = {
	firstName: string;
	lastName: string;
}
type ResponseBody = RequestBody;
type Response = ResponseBody | ApiError;

export default async function createUser(req: NextApiRequest, res: NextApiResponse<Response>) {
	if (req.method !== "POST") {
		const statusCode = 405;
		const apiError: ApiError = {
			statusCode,
			errorMessage: `Method ${req.method} Not Allowed`,
		};
		console.error(apiError);

		res.setHeader("Allow", ["POST"]);
		res.status(statusCode).send(apiError);
		return;
	}

	const body = req.body;
	if (!isValidBody(body)) {
		const statusCode = 400;
		const apiError: ApiError = {
			statusCode,
			errorMessage: `Malformed body. It should be a JSON object with "firstName" and "lastName" keys associated to string values`,
		};
		console.error(apiError);

		res.status(statusCode).send(apiError);
		return;
	}

	res.status(200).end();
}

function isValidBody(body: any): body is RequestBody {
	const isValidFirstName = body.hasOwnProperty("firstName") && typeof body.firstName === "string";
	const isValidLastName = body.hasOwnProperty("lastName") && typeof body.lastName === "string";

	return isValidFirstName && isValidLastName;
}
