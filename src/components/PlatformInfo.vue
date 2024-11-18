<template>
  <div class="platform-info">
    <v-card>
      <v-row
        @click="toggleFields"
        style="cursor: pointer"
        class="d-flex justify-space-between align-center"
      >
        <v-col cols="auto">
          <v-img
            :src="platform.logo"
            :alt="platform.name"
            class="logo"
          />
        </v-col>
        <v-col>
          <h2 class="name">{{ platform.name }}</h2>
        </v-col>
      </v-row>
      <v-expand-transition>
        <div v-if="fieldsVisible">
          <form @submit.prevent>
            <div
              v-for="field in fields"
              :key="field.name"
              class="fields-form"
            >
              <v-text-field
                :label="field.title"
                :id="field.name"
                :placeholder="field.description"
                :rules="getFieldRules(field)"
                variant="outlined"
                clearable
                v-model="fieldValues[field.name]"
              />
            </div>
          </form>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Field } from "@/types/field";
import { Platform } from "@/types/platform";

export default defineComponent({
  name: "PlatformInfo",
  props: {
    platform: {
      type: Object as () => Platform,
      required: true,
    },
    fields: {
      type: Array as () => Field[],
      required: true,
    },
  },
  setup(props) {
    const fieldValues = ref<Record<string, string>>({});
    const fieldsVisible = ref(false);

    onMounted(() => {
      props.fields.forEach((field) => {
        fieldValues.value[field.name] = "";
      });
    });

    const getFieldRules = (field: Field) => {
      const rules = [];
      if (field.required) {
        rules.push((value: string) => !!value || `Please, fill out this field.`);
      }
      return rules;
    };

    const toggleFields = () => {
      fieldsVisible.value = !fieldsVisible.value;
    };

    return {
      fieldValues,
      fieldsVisible,
      getFieldRules,
      toggleFields,
    };
  },
});
</script>

<style scoped>
.platform-info {
  margin: 20px 0;
}

.platform-info .v-card {
  padding: 3px;
}

.logo {
  width: 75px;
  height: 75px;
  object-fit: contain;
}

.name {
  margin-left: 10px;
}

.fields-form {
  padding: 10px;
}
</style>
