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
      :loading="searchingCourse"
      v-model="courseName" />
    <div v-if="fetchedCourses">
      <div
        v-for="course in fetchedCourses"
        :key="course.id">
        <CourseInfo :course="course">
          <template v-slot:course-info-slot>
            <v-btn
              :text="`Send to ${searchPlatform.name}`"
              class="btn-submit-course"
              @click="sendCourse(course)" />
          </template>
        </CourseInfo>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { usePlatformStore } from "@/store/platformStore";
import PlatformInfo from "@/components/PlatformInfo.vue";
import { Field } from "@/types/field";
import Header from "@/components/Header.vue";
import { Course } from "@/types/course";
import CourseInfo from "@/components/CourseInfo.vue";

export default defineComponent({
  components: {
    PlatformInfo,
    Header,
    CourseInfo,
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
      if (searchPlatform) {
        searchPlatformFields.value = await fetchPlatformInfo(searchPlatform.name);
      }

      if (submissionPlatform) {
        submissionPlatformFields.value = await fetchPlatformInfo(submissionPlatform.name);
      }
    };

    const searchCourse = async () => {
      if (!searchPlatform) {
        return;
      }

      if (!searchPlatformInfo.value.validate()) {
        searchPlatformInfo.value.showFields = true;
        return;
      }

      try {
        searchingCourse.value = true;

        const platformName = searchPlatform.name[0].toUpperCase() + searchPlatform.name.slice(1).toLowerCase();

        const response = await fetch(
          `http://localhost:8080/search/from${platformName}?` +
            new URLSearchParams({
              ...searchPlatformInfo.value.fieldValues,
              course: courseName.value,
              page: 1,
              max: 6,
            })
        );

        const data = await response.json();
        fetchedCourses.value = data.courses;
        console.log("fetchedCourses", fetchedCourses);
      } catch (error) {
        console.error("Error searching for courses:", error);
      } finally {
        searchingCourse.value = false;
      }
    };

    const sendCourse = async (course: Course) => {
      console.log(submissionPlatformInfo);

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

      try {
        const response = await fetch(`http://localhost:8080/submit/to${platformName}?`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro ${response.status}: ${errorText}`);
        }

        const responseData = await response.json();
        console.log("card created! Link: ", responseData);
      } catch (error) {
        console.error("Erro:", error);
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
      courseName,
      searchingCourse,
      searchCourse,
      searchPlatformInfo,
      fetchedCourses,
      sendCourse,
      submissionPlatformInfo,
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
