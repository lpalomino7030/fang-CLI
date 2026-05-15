import { Fang } from '@fang-js/fang';

const app = new Fang();

app.get("/", (ctx) => {
  ctx.json({ message: "Fang JS funcionando en JS puro! 🚀" });
});

app.listen(3000);