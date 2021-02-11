import type { NextApiRequest, NextApiResponse } from "next";

import type { ApiError } from "./_types";

type ResponseBody = {

}

type Response = ResponseBody | ApiError;

export default async function greetings(req: NextApiRequest, res: NextApiResponse<Response>) {
	res.status(200).end();
}
