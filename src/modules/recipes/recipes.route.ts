import axios from "axios";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const recipesRoute = new Hono()
  .get("/random", async (c) => {
    try {
      const { data } = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      console.log("data", data);
      return c.json({
        success: true,
        data: data.meals[0],
      });
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, {
          message: error.message,
        });
      } else {
        throw new Error("Error in getting random recipe");
      }
    }
  })
  .get("/search", async (c) => {
    try {
      const { query } = c.req.query();
      const { data } = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php",
        { params: { i: query } }
      );
      return c.json({
        success: true,
        data: data.meals.splice(0, 6) ?? [],
      });
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, {
          message: error.message,
        });
      } else {
        throw new Error("Error in getting random recipe");
      }
    }
  })
  .get("/:id", async (c) => {
    try {
      const { id } = c.req.param();
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php`,
        { params: { i: id } }
      );
      return c.json({
        success: true,
        data: data.meals[0],
      });
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPException) {
        throw new HTTPException(error.status, {
          message: error.message,
        });
      } else {
        throw new Error("Error in getting random recipe");
      }
    }
  });
