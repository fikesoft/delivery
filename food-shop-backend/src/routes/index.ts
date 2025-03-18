import registerRouter from "./register";
import loginRouter from "./login";
import usersRouter from "./getUsers";
import createPizzaRouter from "./createPizza"
import deletePizzaRouter from "./deletePizza"
import getPizzaRouter from "./getPizza"
import editPizzaRouter from "./editPizza"
// Export all routes as a single object
export default {
  registerRouter,
  loginRouter,
  usersRouter,
  createPizzaRouter,
  deletePizzaRouter,
  getPizzaRouter,
  editPizzaRouter
}
;