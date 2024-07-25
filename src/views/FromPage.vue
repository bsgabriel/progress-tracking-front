<template>
  <div class="container">
    <h1 class="text-center my-5">FROM</h1>
    <PlatformGrid :platforms="platforms" @card-clicked="navigateToToPage" />
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
    ...mapActions(['updateSearchPlatform']),
    async fetchPlatforms() {
      try {
        const response = await axios.get('http://localhost:8080/platform/search');
        this.platforms = response.data;
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    },
    navigateToToPage(platform) {
      this.updateSearchPlatform(platform);
      this.$router.push('/to');
    }
  }
};
</script>
