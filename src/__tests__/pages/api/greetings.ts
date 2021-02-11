import { callApiHandler } from "../../../../jest/helpers";
import greetingsHandler from "../../../pages/api/greetings";

describe("/api/greetings", () => {
	test("responds 200 to GET", async () => {
		const { status } = await callApiHandler(greetingsHandler, { method: "GET" });
		expect(status).toBe(200);
	});
});
