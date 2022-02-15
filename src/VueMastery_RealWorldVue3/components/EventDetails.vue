<script setup lang="ts">
  import IEvent from "../types/IEvent";
  import { ref } from "vue";
  import EventService from "../services/EventService";
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });

  const event = ref<IEvent>();

  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
