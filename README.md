## 🐺 Fang-js: Micro-Framework for Node.Js

Fang-js is a minimalist, ultralight, and strongly typed framework designed for Node.js. Its philosophy is based on eliminating external dependencies, focused in development minimal API REST.

Fang-js was born from a radical idea: What if a framework didn't try to do everything, but did one thing perfectly? In an ecosystem saturated with heavy abstractions, Fang-js stands as a thin, transparent, and extremely fast layer on top of Node.js.

Unlike other frameworks that force you to learn proprietary validation rules or install hundreds of unnecessary dependencies, Fang-js embraces industry standards. By integrating Zod as its only core dependency, we ensure that every piece of data entering your application is exactly what you expect, with automatically generated TypeScript types. It is the ideal tool for developers who value maintainability, cookie security, and clean architecture without "black magic."

### ✨ Key Feactures

- **Single-Dependency Core:** Only Zod lives in your node_modules. Maximum security, minimum footprint.

- **Hierarchical Route Grouping:** Keep your API organized. Group routes by versioning (/api/v1) or resources (/users) with specific middlewares for each group.

- **Native Zod Integration:** Industrial-grade validation for Queries, Headers, and Cookies via ctx.getQuery, ctx.getHeader, and more.

- **Smart Cookies:** Secure-by-default cookie management (HttpOnly, Secure, and smart SameSite logic included).

- **Onion Middleware:** Full support for the asynchronous middleware pattern (await next()), allowing you to execute logic both before and after your routes.

- **Type-Safe Context:** A unified Context object that eliminates the need to handle req and res separately, keeping TypeScript's IntelliSense sharp.

### 🚀 Quick Start

##### ✅ How create a server?

```
import { Fang } from 'fang-js';

const app = new Fang();

app.get("/", (ctx) => {
  ctx.json({message: "Hello World Fang!"});
});

//Default port 3000
app.listen();
```

```
import { Fang } from 'fang-js';
import { z } from 'fang-js/zod';

const app = new Fang();

// Global Middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  console.log(`${ctx.req.method} ${ctx.req.url} - ${Date.now() - start}ms`);
});

// Route with Zod Validation
app.get('/search', (ctx) => {
  const query = ctx.getQuery(z.object({
    q: z.string().min(3),
    page: z.coerce.number().default(1)
  }));

  ctx.ok({ results: [], query });
});

app.listen(3000, () => console.log('Fang is hunting on port 3000 🚀'));
```

##### 📁 Routing Group

```
const app = new Fang();

// Create a group for API v1
const apiV1 = app.group("/api/v1");

// Attach middlewares to specific groups!
apiV1.use(authMiddleware);

apiV1.get("/profile", (ctx) => {
  ctx.ok({ user: ctx.state.user });
});

// Separate group for public routes
const auth = app.group("/auth");

auth.post("/login", (ctx) => {
  ctx.ok("Access granted.");
});
```

##### 👨🏻‍💻 Example

```
import { Fang } from "fang-js";
import { z } from "fang-js/zod";

const app = new Fang();

// DB memory
let users = [{ id: 1, name: "Gemini", email: "gemini@example.com" }];

// Shcema
const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

// --- ENDPOINTS ---

// get all
app.get("/users", (ctx) => {
  return ctx.ok(users);
});

// Gte by id
app.get("/users/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return ctx.notFound({ error: "User not found" });
  }
  return ctx.ok(user);
});

// create user using ctx.body(Schema)
app.post("/users", async (ctx) => {
  try {
    const data = await ctx.body(UserSchema);

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      ...data,
    };

    users.push(newUser);

    ctx.created({
      message: "Success!",
      user: newUser,
    });
  } catch (error) {
    ctx.badRequest({
      error: "This is a bad request",
      details: error.message,
    });
  }
});

// delete user
app.delete("/users/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  users = users.filter((u) => u.id !== id);
  return ctx.json({ message: "deleted successfully" });
});

app.listen();
```

## 🗃️ Philosophy

Fang-js follows the Minimalist Power philosophy:

- **Validation is Core:** We believe a framework is only as good as its data integrity.

- **No Hidden Logic:** If you want a feature (Sessions, JWT), you plug it in. We provide the tools (ctx.state, Cookies, Middleware), you provide the logic.

- **Modern Defaults:** Security headers and cookie attributes are treated as first-class citizens, not afterthoughts.

## ⚡ Performance

Fang-js is built for low-latency environments. By avoiding deep dependency trees and leveraging native Node.js HTTP modules, Fang-js ensures that your business logic runs without the framework overhead.

- **Near-zero overhead** on request routing.
- **Optimized Zod parsing** for incoming data.
- **Clean Context object** to reduce garbage collection pressure.

## 🥊 Fang-js vs The Industry 🥊

| Feature          | Express.js               | Koa.js              | **Fang-js** 🧛‍♂️              |
| :--------------- | :----------------------- | :------------------ | :-------------------------- |
| **Philosophy**   | "Batteries included"     | Barebones / Minimal | **Strictly Typed / Secure** |
| **Validation**   | Manual / Third-party     | Third-party         | **Native Zod Integration**  |
| **Middleware**   | Callback-based           | Async (Onion)       | **Async (Onion)**           |
| **TypeScript**   | Via `@types/express`     | Via `@types/koa`    | **Native (First-class)**    |
| **Cookies**      | Requires `cookie-parser` | Built-in (no Zod)   | **Native + Zod Schema**     |
| **Dependencies** | ~30+ transitive          | ~20+ transitive     | **1 (Zod)**                 |
| **Bundle Size**  | Heavy                    | Moderate            | **Ultra-Lightweight**       |

### 👤 Author

Created by Luis Angel Fernández.
