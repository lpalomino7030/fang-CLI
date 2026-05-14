import { Fang } from "@fang-js/fang";

const app = new Fang();

app.get("/", (ctx) => {
  ctx.json({ message: "Fang JS ahora ruge con TypeScript! 🐺" });
});

app.listen(3000);
