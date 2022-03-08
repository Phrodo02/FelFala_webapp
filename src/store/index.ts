import { createStore } from "vuex";
import RecipesModule from "./recipes.module";
import UsersModule from "./users.module";

export default createStore({
  modules: {
    users: UsersModule,
    recipes: RecipesModule,
  },
});
