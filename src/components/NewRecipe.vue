<script setup lang="ts">
  import { computed, ref } from "vue";
  import {
    VBtn,
    VCard,
    VCardActions,
    VCardTitle,
    VDialog,
    VRow,
    VSpacer,
    VTextarea,
    VTextField,
  } from "vuetify/components";
  import ConfirmDialog from "./ConfirmDialog.vue";

  import { useStore } from "vuex";
  const store = useStore();

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  });
  const emit = defineEmits(["update:modelValue", "close"]);

  const show = computed({
    get() {
      return props.modelValue;
    },
    set(value: boolean) {
      return emit("update:modelValue", value);
    },
  });

  const title = ref("");
  const content = ref("");
  const mealsOrigin = ref("");

  const showConfirmSave = ref(false);
  const showConfirmClose = ref(false);
  const resultConfirm = ref(false);

  function confirmSaveRecipe() {
    if (resultConfirm.value) {
      store.dispatch("recipes/createNewRecipe", {
        title: title.value,
        content: content.value,
        mealsOrigin: mealsOrigin.value,
        like: 0,
      });
      show.value = false;
      emit("close");
    } else {
      showConfirmSave.value = false;
    }
  }

  function confirmCloseDialog() {
    if (resultConfirm.value) {
      show.value = false;
      emit("close");
    } else {
      showConfirmClose.value = false;
    }
  }

  function closeDialog() {
    if (isChanged.value) {
      showConfirmClose.value = true;
    } else {
      show.value = false;
      emit("close");
    }
  }

  const isChanged = computed(() => title.value != "" && content.value != "");
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent :retain-focus="false" transition="scale-transition">
      <v-card>
        <v-card-title class="text-h5"> New recipe </v-card-title>
        <!-- <v-card-text>Post: {{ props.post }}</v-card-text> -->
        <v-text-field v-model="title" class="mb-1" label="Title"></v-text-field>
        <v-textarea v-model="content" filled label="Content" rows="6" shaped></v-textarea>
        <v-text-field v-model="mealsOrigin" class="mb-1" label="Meals Origin"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-lighten-3"
            :disabled="!isChanged"
            elevation="5"
            @click="showConfirmSave = true"
          >
            Save
          </v-btn>
          <v-btn color="blue-lighten-3" elevation="5" @click="closeDialog"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ConfirmDialog
      v-if="showConfirmSave"
      v-model="showConfirmSave"
      v-model:result="resultConfirm"
      title="Save changes"
      @close="confirmSaveRecipe"
    />
    <ConfirmDialog
      v-if="showConfirmClose"
      v-model="showConfirmClose"
      v-model:result="resultConfirm"
      :retain-focus="false"
      title="Close dialog"
      @close="confirmCloseDialog"
    />
  </v-row>
</template>
