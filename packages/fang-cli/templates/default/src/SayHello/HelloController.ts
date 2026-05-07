import { Controller, Context } from "@fang-js/fang";
import { HelloService } from "./HelloService.js";


@Controller
export class HelloController {
  helloService = new HelloService();
  getHello(ctx: Context) {
    const name = ctx.params.name || "World";
    const result = this.helloService.getHello(name);
    ctx.json(result);
  }
}   