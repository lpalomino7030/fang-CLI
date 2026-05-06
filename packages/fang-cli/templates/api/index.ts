import { Fang } from "@fang-js/fang";

const app = new Fang();

app.get("/", (ctx) => {
  ctx.json({ message: "API funcionando 🚀" });
});

app.listen(3000);