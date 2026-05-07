
import { ISchemaHello } from "./SchemaHello.js";

export class HelloService {
  getHello(name: string): ISchemaHello {
    return { message: `Hello ${name}` };
  }
}