import { callApiHandler } from "../../../../jest/helpers";
import createUserHandler from "../../../pages/api/create_user";

describe("/api/create_user", () => {
	test("responds 200 to POST", async () => {
		const body = { firstName: "Mokhtar", lastName: "Mial" };
		const response = await callApiHandler(createUserHandler, { method: "POST", body });
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ firstName: "MOKHTAR", lastName: "MIAL" });
	});

	test("responds 400 to POST with malformed body", async () => {
		const response = await callApiHandler(createUserHandler, { method: "POST" });
		expect(response.status).toBe(400);
	});

	test("responds 405 to GET", async () => {
		const response = await callApiHandler(createUserHandler, { method: "GET" });
		expect(response.status).toBe(405);
	});
});
