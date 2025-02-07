<template>
  <v-container v-if="searchPlatform && searchPlatformFields && submissionPlatform && submissionPlatformFields">
    <Header title="Integration" />
    <PlatformInfo
      :platform="searchPlatform"
      :fields="searchPlatformFields"
      ref="searchPlatformInfo" />
    <PlatformInfo
      :platform="submissionPlatform"
      :fields="submissionPlatformFields"
      ref="submissionPlatformInfo" />
    <v-text-field
      label="Course name"
      append-inner-icon="mdi-magnify"
      @click:append-inner="searchCourse"
      :placeholder="`Course to search in ${searchPlatform.name}`"
      variant="outlined"
      clearable
      v-model="courseName" />
    <div v-if="fetchedCourses">
      <div
        v-for="course in fetchedCourses"
        :key="course.id">
        <CourseInfo :course="course">
          <template v-slot:course-info-slot>
            <v-btn
              :text="`Send to ${submissionPlatform.name}`"
              class="btn-submit-course"
              @click="sendCourse(course)" />
          </template>
        </CourseInfo>
      </div>
    </div>
    <LoadingModal ref="loadingModal" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, inject } from "vue";
import { usePlatformStore } from "@/store/platformStore";
import PlatformInfo from "@/components/PlatformInfo.vue";
import { Field } from "@/types/field";
import Header from "@/components/Header.vue";
import { Course } from "@/types/course";
import CourseInfo from "@/components/CourseInfo.vue";
import LoadingModal from "@/components/LoadingModal.vue";
import axios from "axios";
import { NavigationService } from "@/services/navigationService";

export default defineComponent({
  components: {
    PlatformInfo,
    Header,
    CourseInfo,
    LoadingModal,
  },
  setup() {
    const platformStore = usePlatformStore();

    const searchPlatform = platformStore.searchPlatform;
    const submissionPlatform = platformStore.submissionPlatform;

    const searchPlatformFields = ref<Field[]>([]);
    const submissionPlatformFields = ref<Field[]>([]);
    const courseName = ref("");

    const searchPlatformInfo = ref(PlatformInfo);
    const submissionPlatformInfo = ref(PlatformInfo);
    const fetchedCourses = ref<Course[]>([]);

    const loadingModal = ref(LoadingModal);

    const navigationService = inject<NavigationService>("navigationService");

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
      if (!searchPlatform || !submissionPlatform) {
        navigationService?.goToSearchPlatformSelection();
        return;
      }

      searchPlatformFields.value = await fetchPlatformInfo(searchPlatform.name);
      submissionPlatformFields.value = await fetchPlatformInfo(submissionPlatform.name);
    };

    const searchCourse = async () => {
      if (!searchPlatform) {
        return;
      }

      if (!searchPlatformInfo.value.validate()) {
        searchPlatformInfo.value.showFields = true;
        return;
      }

      fetchedCourses.value = [];
      const platformName = searchPlatform.name[0].toUpperCase() + searchPlatform.name.slice(1).toLowerCase();
      loadingModal.value.show(`Searching on ${platformName}`, "<p>Loading...</p>", true);

      axios
        .get(`http://localhost:8080/search/from${platformName}`, {
          params: {
            ...searchPlatformInfo.value.fieldValues,
            course: courseName.value,
            page: 1,
            max: 6,
          },
        })
        .then((response) => {
          fetchedCourses.value = response.data.courses;
          console.log("fetchedCourses", fetchedCourses);
          loadingModal.value.close();
        })
        .catch((error) => {
          loadingModal.value.done(error.response.data.title, error.response.data.detail);
        });
    };

    const sendCourse = async (course: Course) => {
      if (!submissionPlatform) {
        return;
      }

      if (!submissionPlatformInfo.value.validate()) {
        submissionPlatformInfo.value.showFields = true;
        return;
      }

      const platformName = submissionPlatform.name[0].toUpperCase() + submissionPlatform.name.slice(1).toLowerCase();
      const data = {
        ...submissionPlatformInfo.value.fieldValues,
        course: { ...course },
      };

      loadingModal.value.show(`Sending to ${platformName}`, "<p>Loading...</p>", false);

      axios
        .post(`http://localhost:8080/submit/to${platformName}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          loadingModal.value.done(`Sent to ${platformName}`, `<p>Click <a href="${response.data.cardUrl}" target="_blank" rel="noopener noreferrer">here</a> to access the card.</p>`);
        })
        .catch((error) => {
          loadingModal.value.done(error.response.data.title, error.response.data.detail);
        });
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
      searchCourse,
      searchPlatformInfo,
      fetchedCourses,
      sendCourse,
      submissionPlatformInfo,
      loadingModal,
    };
  },
});
</script>

<style scoped>
.integration-page {
  padding: 16px;
}

.btn-submit-course {
  margin-top: 10px;
}
</style>
