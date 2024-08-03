<template>
  <b-card class="platform-info-card">
    <b-card-header>
      <h2 class="text-center">{{ title }}</h2>
    </b-card-header>
    <div class="platform-logo-container">
      <b-card-img :src="platform.logo" alt="Platform Logo" class="platform-logo" />
    </div>
    <b-card-body>
      <div v-for="(field, index) in fields" :key="index" class="platform-field">
        <b-form-group :label="field.title" :label-for="generateInputId(field, platform)">
          <b-form-input
            :id="generateInputId(field, platform)"
            v-model="fieldValues[field.name]"
            :placeholder="field.description"
            @input="saveToLocalStorage"
          />
        </b-form-group>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BCardImg, BFormGroup, BFormInput } from "bootstrap-vue-next";

export default {
  components: {
    BCard,
    BCardImg,
    BCardBody,
    BFormInput,
    BFormGroup,
  },
  props: {
    platform: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        logo: "",
      }),
    },
    type: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      fieldValues: {},
    };
  },
  computed: {
    title() {
      return `${this.type.toUpperCase()}`;
    },
  },
  methods: {
    generateInputId(field, platform) {
      return `${platform.name}-${field.name}`;
    },
    getFieldValues() {
      return this.fieldValues;
    },
    saveToLocalStorage() {
      for (const [key, value] of Object.entries(this.fieldValues)) {
        localStorage.setItem(this.generateMemoryKeyName(key), value);
      }
    },
    loadFromLocalStorage(fieldName) {
      return localStorage.getItem(this.generateMemoryKeyName(fieldName));
    },
    generateMemoryKeyName(key) {
      return `${this.type}-${key}`;
    },
    initializeFieldValues() {
      this.fields.forEach(field => {
        const storedValue = this.loadFromLocalStorage(field.name);
        this.fieldValues[field.name] = storedValue || "";
      });
    }
  },
  watch: {
    fields: {
      immediate: true,
      handler() {
        this.initializeFieldValues();
      },
    },
    fieldValues: {
      deep: true,
      handler() {
        this.saveToLocalStorage();
      }
    }
  },
};
</script>


<style scoped>
.platform-info-card {
  max-width: 30em;
  margin: 20px auto;
}

.platform-logo-container {
  width: 100%;
  height: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.platform-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.platform-field {
  margin: 25px 0;
}
</style>
