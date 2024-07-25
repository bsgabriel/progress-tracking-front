import { createStore } from 'vuex';

export default createStore({
  state: {
    searchPlatform: '',
    submissionPlatform: ''
  },
  mutations: {
    setSearchPlatform(state, platform) {
      state.searchPlatform = platform;
    },
    setSubmissionPlatform(state, platform) {
      state.submissionPlatform = platform;
    }
  },
  actions: {
    updateSearchPlatform({ commit }, platform) {
      commit('setSearchPlatform', platform);
    },
    updateSubmissionPlatform({ commit }, platform) {
      commit('setSubmissionPlatform', platform);
    }
  },
  getters: {
    getSearchPlatform: (state) => state.searchPlatform,
    getSubmissionPlatform: (state) => state.submissionPlatform
  }
});