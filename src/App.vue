<script setup lang="ts">
  import { computed, ref } from "vue";

  import {
    VApp,
    VAppBar,
    VAppBarNavIcon,
    VBadge,
    VBtn,
    VContainer,
    VList,
    VListItem,
    VMain,
    VNavigationDrawer,
    VSpacer,
  } from "vuetify/components";
  import { useDisplay } from "vuetify";
  import { useI18n } from "vue-i18n";
  import { useStore } from "vuex";

  const isMobileDevice = useDisplay().mobile.value;
  const drawer = ref(!isMobileDevice);
  const store = useStore();
  const theme = ref("light");

  const loggedUser = computed(() => store.getters["users/getLoggedUser"]);
  const notLoggedIn = computed(() => !store.getters["users/getLoggedIn"]);

  let { locale, t } = useI18n({
    inheritLocale: true,
    useScope: "global", // Change to "local" if you want to add <i18n></i18n> locally
  });

  // Search icons: https://materialdesignicons.com/
  const menuItems = ref([
    {
      icon: "mdi-home",
      text: t("startPage"),
      name: "startPage",
      route: "/",
      disabled: false,
    },
    {
      icon: "mdi-soccer",
      text: t("examples"),
      name: "examples",
      route: "/examples",
      disabled: false,
    },
    {
      icon: "mdi-table",
      text: "v-table",
      name: "",
      route: "/vtable",
      disabled: notLoggedIn,
    },
    {
      icon: "mdi-table-refresh",
      text: "vue3-table-light",
      name: "",
      route: "/v3table",
      disabled: notLoggedIn,
    },
    {
      icon: "mdi-cart-outline",
      text: "Vue Mastery Socks",
      name: "",
      route: "/socks",
      disabled: false,
    },
    {
      icon: "mdi-earth",
      text: "Vue Mastery Real World 3",
      name: "",
      route: "/realworldvue3",
      disabled: false,
    },
    {
      icon: "mdi-grid",
      text: t("gridDemo"),
      name: "gridDemo",
      route: "/grid",
      disabled: false,
    },
    {
      icon: "mdi-account",
      text: t("account"),
      name: "account",
      route: "/account",
      disabled: false,
    },
    {
      icon: "mdi-information",
      text: t("about"),
      name: "about",
      route: "/about",
      disabled: false,
    },
  ]);
  const links = ref([
    {
      icon: "mdi-github",
      text: "GitHub",
      name: "",
      link: "https://github.com/nitslaszlo/jedlik-vite-ts-template",
      disabled: false,
    },
    {
      icon: "mdi-vuetify",
      text: "Vuetify 3",
      name: "",
      link: "https://next.vuetifyjs.com/en/getting-started/installation",
      disabled: false,
    },
  ]);

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
  }
  function toggleLanguage() {
    locale.value = locale.value == "hu" ? "en" : "hu";
    menuItems.value.forEach((e) => {
      if (e.name != "") e.text = t(e.name);
    });
  }
</script>

<template>
  <v-app :theme="theme">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :disabled="item.disabled"
          link
          :prepend-icon="item.icon"
          :title="item.text"
          :to="item.route"
          @click="drawer = !isMobileDevice"
        ></v-list-item>
      </v-list>
      <p class="text-center my-3">{{ $t("links") }}</p>
      <v-list dense nav>
        <v-list-item
          v-for="(item, i) in links"
          :key="i"
          :disabled="item.disabled"
          :href="item.link"
          link
          :prepend-icon="item.icon"
          target="_blank"
          :title="item.text"
          @click="drawer = !isMobileDevice"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app :color="notLoggedIn ? 'surface' : 'success'" dark>
      <v-app-bar-nav-icon
        :color="notLoggedIn ? 'surface' : 'success'"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      Jedlik Vite TS {{ $t("template") }} - {{ notLoggedIn ? $t("noUser") : loggedUser }}
      <v-spacer></v-spacer>
      <v-badge :content="locale" offset-x="6" offset-y="6">
        <v-btn :color="notLoggedIn ? 'surface' : 'success'" icon @click="toggleLanguage">
          <v-icon>mdi-comment-text-multiple</v-icon>
        </v-btn>
      </v-badge>
      <v-btn class="ml-5" :color="notLoggedIn ? 'surface' : 'success'" icon @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-app-bar-nav-icon
        :color="notLoggedIn ? 'surface' : 'success'"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
