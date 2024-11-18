<template>
  <v-container v-if="searchPlatform && searchPlatformFields && submissionPlatform && submissionPlatformFields">
    <Header title="Integration" />
    <PlatformInfo
      :platform="searchPlatform"
      :fields="searchPlatformFields" />
    <PlatformInfo
      :platform="submissionPlatform"
      :fields="submissionPlatformFields" />
    <v-text-field
      label="Course name"
      append-inner-icon="mdi-magnify"
      @click:append-inner="searchCourse"
      :placeholder="`Course to search in ${searchPlatform.name}`"
      variant="outlined"
      clearable
      :loading="searchingCourse"
      v-model="courseName" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { usePlatformStore } from "@/store/platformStore";
import PlatformInfo from "@/components/PlatformInfo.vue";
import { Field } from "@/types/field";
import Header from "@/components/Header.vue";

export default defineComponent({
  components: {
    PlatformInfo,
    Header,
  },
  setup() {
    const platformStore = usePlatformStore();

    const searchPlatform = platformStore.searchPlatform;
    const submissionPlatform = platformStore.submissionPlatform;

    const searchPlatformFields = ref<Field[]>([]);
    const submissionPlatformFields = ref<Field[]>([]);
    const courseName = ref("");
    let searchingCourse = ref(false);

    const fetchPlatformInfo = async (platformName: string) => {
      try {
        const response = await fetch(`http://localhost:8080/platform/info/${platformName}`);
        if (!response.ok) {
          throw new Error(`Error fetching information: ${response.statusText}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching platform information for ${platformName}:`, error);
      }
    };

    const loadPlatforms = async () => {
      if (platformStore.searchPlatform) {
        searchPlatformFields.value = await fetchPlatformInfo(platformStore.searchPlatform.name);
      }

      if (platformStore.submissionPlatform) {
        submissionPlatformFields.value = await fetchPlatformInfo(platformStore.submissionPlatform.name);
      }
    };

    const searchCourse = async () => {
      searchingCourse.value = !searchingCourse.value;
      // TODO: implement course search
    };

    onMounted(() => {
      loadPlatforms();
    });

    return {
      searchPlatform,
      submissionPlatform,
      searchPlatformFields,
      submissionPlatformFields,
      courseName,
      searchingCourse,
      searchCourse,
    };
  },
});
</script>

<style scoped>
.integration-page {
  padding: 16px;
}
</style>
