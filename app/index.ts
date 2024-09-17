import { serve } from "@hono/node-server";
import { Hono } from "hono";
import axios from "axios";
import { recipesRoute } from "./modules/recipes/recipes.route";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  })
);
app.route("/recipes", recipesRoute);

const port = 3100;
console.log(`Server is running on port ${port}`);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
