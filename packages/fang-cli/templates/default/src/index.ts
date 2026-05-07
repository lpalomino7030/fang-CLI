import { Fang } from "@fang-js/fang";
import { HelloController } from "./SayHello/HelloController.js";

const app = new Fang();

app.get("/", (ctx) => {
  ctx.json({ message: "API funcionando 🚀" });
});

app.controller("/hello", HelloController);

app.listen(3000);