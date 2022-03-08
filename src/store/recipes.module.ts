import $axios from "./axios.instance";

export default {
  namespaced: true,
  state: {
    loading: false,
    numberOfRecipes: 0,
    recipes: [],
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getRecipes(state) {
      return state.recipes;
    },
    getNumberOfRecipes(state) {
      return state.numberOfRecipes;
    },
  },
  mutations: {
    setLoading(state, status) {
      state.loading = status;
    },
    setNumberOfRecipes(state, numberOfRecipes) {
      state.numberOfRecipes = numberOfRecipes;
    },
    loadRecipes(state, recipes) {
      state.recipes = [...recipes];
    },
    clearRecipes(state) {
      state.recipes = [];
    },
  },
  actions: {
    async createNewRecipe(context, params) {
      context.commit("setLoading", true);
      $axios
        .post("recipes", {
          title: params.title,
          content: params.content,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.recipe);
            context.commit("setNumberOfRecipes", res.data.count);
          }
          context.commit("setLoading", false);
        })
        .catch((error) => {
          console.error("hiba: " + error);
          context.commit("setLoading", false);
        });
    },
    async editRecipeById(context, params) {
      context.commit("setLoading", true);
      $axios
        .patch(`recipes/${params.id}`, {
          title: params.title,
          content: params.content,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
          }
          context.commit("setLoading", false);
        })
        .catch((error) => {
          console.error("hiba: " + error);
          context.commit("setLoading", false);
        });
    },
    async deleteRecipeById(context, params) {
      context.commit("setLoading", true);
      $axios
        .delete(`recipes/${params.id}`)
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.status);
            context.commit("setNumberOfRecipes", res.data.count);
          }
          context.commit("setLoading", false);
        })
        .catch((error) => {
          console.error("hiba: " + error);
          context.commit("setLoading", false);
        });
    },
    async fetchRecipes(context) {
      context.commit("setLoading", true);
      // await context.dispatch('fetchNumberOfPosts');
      $axios
        .get("recipes")
        .then((res) => {
          if (res && res.data) {
            context.commit("loadRecipes", res.data.recipes);
            context.commit("setNumberOfRecipes", res.data.count);
          }
          context.commit("setLoading", false);
        })
        .catch((error) => {
          console.error("hiba: " + error);
          context.commit("setLoading", false);
        });
    },
    async fetchPaginatedRecipes(context, params) {
      context.commit("setLoading", true);
      // await context.dispatch('fetchNumberOfPosts');
      $axios
        .get(
          `recipes/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          console.log(res);
          if (res && res.data) {
            context.commit("loadRecipes", res.data.recipes);
            context.commit("setNumberOfRecipes", res.data.count);
          }
          context.commit("setLoading", false);
        })
        .catch((error) => {
          console.error("hiba: " + error);
          context.commit("setLoading", false);
        });
    },
  },
};
