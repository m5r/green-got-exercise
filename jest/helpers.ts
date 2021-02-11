import type { NextApiHandler } from "next";
import type { RequestListener } from "http";
import http from "http";
import type { __ApiPreviewProps } from "next/dist/next-server/server/api-utils";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import listen from "test-listen";
import fetch from "isomorphic-fetch";
import crypto from "crypto";

type Params = {
	method: string;
	body?: any;
	headers?: Record<string, string>;
	query?: Record<string, string>;
}

const apiPreviewProps: __ApiPreviewProps = {
	previewModeEncryptionKey: crypto.randomBytes(16).toString("hex"),
	previewModeId: crypto.randomBytes(32).toString("hex"),
	previewModeSigningKey: crypto.randomBytes(32).toString("hex"),
};

export async function callApiHandler(handler: NextApiHandler, params: Params) {
	const {
		method = "GET",
		body,
		headers = {},
		query = {},
	} = params;

	const requestHandler: RequestListener = (req, res) => {
		Object.assign(req.headers, headers);
		const propagateError = false;
		return apiResolver(req, res, query, handler, apiPreviewProps, propagateError);
	};

	const server = http.createServer(requestHandler);
	const url = await listen(server);
	let fetchOptions: RequestInit = { method };
	if (body) {
		fetchOptions.body = JSON.stringify(body);
		fetchOptions.headers = { "Content-Type": "application/json" };
	}

	const response = await fetch(url, fetchOptions);
	server.close();

	return response;
}