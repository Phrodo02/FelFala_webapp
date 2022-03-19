<script setup lang="ts">
  import { computed, onMounted } from "vue";
  import { VContainer, VTable } from "vuetify/components";
  import { useStore } from "vuex";

  const store = useStore();
  const posts = computed(() => store.getters["recipes"]);

  onMounted(() => {
    store.dispatch("recipes/fetchPosts");
  });
</script>

<template>
  <v-container class="page">
    <v-table fixed-header>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">id</th>
            <th class="text-left">Author</th>
            <th class="text-left">Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in posts" :key="i">
            <td>{{ item._id }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.title }}</td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </v-container>
</template>
