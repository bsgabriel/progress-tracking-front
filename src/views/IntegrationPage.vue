<template>
  <div>
    <Header title="Integration" />
    <PlatformInfo
      v-if="searchPlatform && searchPlatformFields"
      :platform="searchPlatform"
      :fields="searchPlatformFields"
    />
    <PlatformInfo
      v-if="submissionPlatform && submissionPlatformFields"
      :platform="submissionPlatform"
      :fields="submissionPlatformFields"
    />
  </div>
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
      if (platformStore.searchPlatform) searchPlatformFields.value = await fetchPlatformInfo(platformStore.searchPlatform.name);

      if (platformStore.submissionPlatform) {
        submissionPlatformFields.value = await fetchPlatformInfo(platformStore.submissionPlatform.name);
      }
    };

    onMounted(() => {
      loadPlatforms();
    });

    return {
      searchPlatform,
      submissionPlatform,
      searchPlatformFields,
      submissionPlatformFields,
    };
  },
});
</script>

<style scoped>
.integration-page {
  padding: 16px;
}
</style>
