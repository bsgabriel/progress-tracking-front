<template>
  <v-dialog
    v-model="isVisible"
    persistent
    max-width="400px">
    <v-card>
      <v-card-title>
        <span>{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-if="!isDone"
            style="max-width: 40px">
            <v-progress-circular
              indeterminate
              color="primary"
              size="24"
              class="mr-2" />
          </v-col>
          <v-col>
            <div v-html="body" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="close"
          v-if="isDone || !autoCloseable">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoadingModal",
  setup() {
    const isVisible = ref(false);
    const title = ref("");
    const body = ref("");
    const isDone = ref(false);
    const autoCloseable = ref(false);

    const show = (_title: string, _body: string, _autoCloseable: boolean) => {
      title.value = _title;
      body.value = _body;
      isVisible.value = true;
      isDone.value = false;
      autoCloseable.value = _autoCloseable;
    };

    const done = (modalTitle?: string, modalBody?: string) => {
      if (modalTitle) {
        title.value = modalTitle;
      }
      if (modalBody) {
        body.value = modalBody;
      }
      isDone.value = true;
    };

    const close = () => {
      isDone.value = true;
      isVisible.value = false;
    };

    return {
      isVisible,
      title,
      body,
      isDone,
      autoCloseable,
      show,
      done,
      close,
    };
  },
});
</script>
