import { callApiHandler } from "../../../../jest/helpers";
import greetingsHandler from "../../../pages/api/greetings";

describe("/api/greetings", () => {
	test("responds 200 to GET with ?first_name=Mokhtar", async () => {
		const response = await callApiHandler(greetingsHandler, { method: "GET", query: { first_name: "Mokhtar" } });
		expect(response.status).toBe(200);
		expect(await response.text()).toBe("Hello Mokhtar");
	});

	test("responds 400 to GET with missing first_name parameter", async () => {
		const { status } = await callApiHandler(greetingsHandler, { method: "GET" });
		expect(status).toBe(400);
	});

	test("responds 405 to POST", async () => {
		const { status } = await callApiHandler(greetingsHandler, { method: "POST" });
		expect(status).toBe(405);
	});
});
