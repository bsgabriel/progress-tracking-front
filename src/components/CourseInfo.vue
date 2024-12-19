<template>
  <div class="course-info">
    <v-card>
      <v-row
        @click="toggleCourse"
        style="cursor: pointer"
        class="d-flex justify-space-between align-center">
        <v-col cols="auto">
          <v-img
            :src="course.image"
            :alt="course.name"
            class="logo" />
        </v-col>
        <v-col>
          <p class="name">{{ course.name }}</p>
        </v-col>
      </v-row>
      <v-expand-transition>
        <div v-if="showCourse">
          <div class="info">
            <p
              class="description"
              v-html="formatDescription(course.desc)" />
            <br />
            <p class="url">
              More information at:
              <a
                :href="course.url"
                target="_blank">
                {{ course.url }}
              </a>
            </p>
            <br />
            <v-row
              @click="toggleModules"
              class="module-row">
              <v-col>
                <h2>Modules</h2>
              </v-col>
              <v-col>
                <v-icon
                  icon="mdi-chevron-down"
                  :class="{ 'rotate-icon': showModules, 'rotate-back': !showModules }" />
              </v-col>
            </v-row>
            <v-expand-transition>
              <div v-if="showModules">
                <div
                  v-for="(chapter, index) in course.chapters"
                  :key="chapter.name">
                  <v-row
                    @click="toggleLessons(index)"
                    class="chapter-row">
                    <v-col>
                      <h4>{{ chapter.name }}</h4>
                    </v-col>
                    <v-col>
                      <v-icon
                        icon="mdi-chevron-down"
                        :class="{ 'rotate-icon': visibleLessons[index], 'rotate-back': !visibleLessons[index] }" />
                    </v-col>
                  </v-row>
                  <v-expand-transition>
                    <div v-if="visibleLessons[index]">
                      <v-row
                        v-for="(lesson, i) in chapter.lessons"
                        :key="i"
                        value
                        class="lesson-name">
                        {{ lesson }}
                      </v-row>
                    </div>
                  </v-expand-transition>
                </div>
              </div>
            </v-expand-transition>
            <slot name="course-info-slot"></slot>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Course } from "@/types/course";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CourseInfo",
  props: {
    course: {
      type: Object as () => Course,
      required: true,
    },
  },
  setup() {
    const showCourse = ref(false);
    const visibleLessons = ref<{ [key: number]: boolean }>({});
    const showModules = ref(false);

    const toggleCourse = () => {
      showCourse.value = !showCourse.value;
    };

    const toggleLessons = (chapterIndex: number) => {
      visibleLessons.value[chapterIndex] = !visibleLessons.value[chapterIndex];
    };

    const toggleModules = () => {
      showModules.value = !showModules.value;
    };

    const formatDescription = (description: string) => {
      return description.replace(/\n\n/g, "<br/>");
    };

    return {
      showCourse,
      showModules,
      visibleLessons,
      toggleCourse,
      toggleModules,
      toggleLessons,
      formatDescription,
    };
  },
});
</script>

<style scoped>
.course-info {
  margin: 20px 0;
}

.logo {
  width: 160px;
  object-fit: contain;
}

.name {
  margin-left: 5px;
  font-size: 20px;
}

.info {
  padding: 15px;
}

.description {
  font-size: 18px;
}

.url {
  font-size: 16px;
}

.module-row {
  cursor: pointer;
}

.chapter-row {
  cursor: pointer;
  margin: 0;
}

.lesson-name {
  margin: 5px 30px;
}

.rotate-icon {
  transition: transform 0.5s ease;
  transform: rotate(180deg);
}

.rotate-back {
  transition: transform 0.5s ease;
  transform: rotate(0deg);
}
</style>
