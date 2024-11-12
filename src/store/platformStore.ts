import { Platform } from "@/types/platform";
import { defineStore } from "pinia";

interface PlatformState {
  searchPlatform: Platform | null;
  submissionPlatform: Platform | null;
}

export const platformStore = defineStore("platform", {
  state: (): PlatformState => ({
    searchPlatform: null,
    submissionPlatform: null,
  }),
  actions: {
    setSearchPlatform(platform: Platform) {
      this.searchPlatform = platform;
    },
    setSubmissionPlatform(platform: Platform) {
      this.submissionPlatform = platform;
    },
  },
  getters: {
    getSearchPlatform: (state) => state.searchPlatform,
    getSubmissionPlatform: (state) => state.submissionPlatform,
  },
});

export default {
  platformStore,
};
