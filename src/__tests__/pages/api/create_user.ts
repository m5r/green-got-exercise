import { callApiHandler } from "../../../../jest/helpers";
import createUserHandler from "../../../pages/api/create_user";

describe("/api/create_user", () => {
	test("responds 200 to POST", async () => {
		const response = await callApiHandler(createUserHandler, { method: "POST" });
		expect(response.status).toBe(200);
	});

	test("responds 405 to GET", async () => {
		const response = await callApiHandler(createUserHandler, { method: "GET" });
		expect(response.status).toBe(405);
	});
});
