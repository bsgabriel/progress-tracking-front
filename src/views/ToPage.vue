<template>
  <div class="container">
    <h1 class="text-center my-5">TO</h1>
    <PlatformGrid :platforms="platforms" @card-clicked="selectPlatform"  />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import PlatformGrid from '../components/PlatformGrid.vue';

export default {
  components: {
    PlatformGrid
  },
  data() {
    return {
      platforms: []
    };
  },
  created() {
    this.fetchPlatforms();
  },
  methods: {
    ...mapActions(['updateSubmissionPlatform']),
    async fetchPlatforms() {
      try {
        const response = await axios.get('http://localhost:8080/platform/submission');
        this.platforms = response.data;
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    },
    selectPlatform(platform) {
      this.updateSubmissionPlatform(platform);
      this.$router.push('/integration');
    }
  }
};
</script>
