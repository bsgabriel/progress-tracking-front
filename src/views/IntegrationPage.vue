<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <PlatformInfo ref="searchPlatformInfo" :platform="getSearchPlatform" type="from" :fields="fromFields" />
      </div>
      <div class="col-md-6">
        <PlatformInfo ref="submissionPlatformInfo" :platform="getSubmissionPlatform" type="to" :fields="toFields" />
      </div>
    </div>
    <div class="row align-items-end">
      <div class="col-10">
        <b-form-group label="Course name">
          <b-form-input v-model="courseName" placeholder="Enter Course Name" />
        </b-form-group>
      </div>
      <div class="col-2">
        <b-button variant="primary" @click="searchCourses">SEARCH</b-button>
      </div>
    </div>
    <CourseGrid v-if="!loading" :courses="courses" :currentPage="currentPage" :totalCount="totalCount" :pageSize="pageSize" @page-changed="handlePageChange" :loading="loading" />
    <div v-else class="text-center mt-4">
      <b-spinner label="Loading..." />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import CourseGrid from "../components/CourseGrid.vue";
import PlatformInfo from "../components/PlatformInfo.vue";
import { BFormGroup, BFormInput, BButton, BSpinner } from "bootstrap-vue-next";

export default {
  components: {
    CourseGrid,
    PlatformInfo,
    BFormGroup,
    BFormInput,
    BButton,
    BSpinner,
  },
  data() {
    return {
      fromFields: [],
      toFields: [],
      courses: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 6,
      loading: false,
      searchCourseName: "",
    };
  },
  computed: {
    ...mapGetters(["getSearchPlatform", "getSubmissionPlatform"]),
  },
  methods: {
    async fetchFields(platform, target) {
      try {
        const response = await axios.get(`http://localhost:8080/platform/info/${platform.name}`);
        if (target === "from") {
          this.fromFields = response.data;
        } else if (target === "to") {
          this.toFields = response.data;
        }
      } catch (error) {
        console.error(`Failed to fetch fields for ${platform.name}:`, error);
      }
    },
    async searchCourses() {
      this.loading = true;
      try {
        const platformName = this.getSearchPlatform.name[0].toUpperCase() + this.getSearchPlatform.name.slice(1).toLowerCase();
        const searchPlatformValues = this.$refs.searchPlatformInfo.getFieldValues();
        const response = await axios.post(`http://localhost:8080/search/from${platformName}`, {
          ...searchPlatformValues,
          course: this.courseName,
          max: this.pageSize,
          page: this.currentPage,
        });
        this.courses = response.data.courses || [];
        this.totalCount = response.data.count || 0;
      } catch (error) {
        console.error("Error searching for courses:", error);
      } finally {
        this.loading = false;
      }
    },
    handlePageChange(page) {
      console.log(page)
      this.currentPage = page;
      this.searchCourses(page);
    },
  },
  mounted() {
    this.fetchFields(this.getSearchPlatform, "from");
    this.fetchFields(this.getSubmissionPlatform, "to");
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
