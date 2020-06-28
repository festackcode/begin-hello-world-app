import { serve } from "https://deno.land/std@0.54.0/http/server.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { Users } from "./users.model.ts";
import router from "./routes.ts";

// const s = serve({ port: 8000 });
const port = 5000;
// console.log("http://localhost:8000/");
// for await (const req of s) {
//   req.respond({ body: "Hello World\n" });
// }

// init app
const app = new Application();

// api routes/methods
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen ({port})
