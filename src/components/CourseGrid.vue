<template>
  <div>
    <div v-if="loading" class="text-center mt-4">
      <b-spinner label="Loading..." />
    </div>
    <b-card-group deck class="card-container">
      <b-card v-for="course in courses" :key="course.id" @click="handleClick(course)" class="option-card" :img-src="course.image" img-top :title="course.name"/>
    </b-card-group>
    <nav v-if="courses.length > 0" aria-label="Page navigation">
      <ul class="pagination justify-content-center mt-4">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
        </li>
        <li class="page-item">
          <span class="page-link">{{ currentPage }} / {{ totalPages }}</span>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { BCard, BSpinner } from "bootstrap-vue-next";

export default {
  components: {
    BSpinner,
    BCard,
  },
  props: {
    courses: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 6,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCount / this.pageSize);
    },
  },
  methods: {
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>

<style scoped>

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.option-card {
  max-width: 26em;
  margin-top: 1em;
}

.option-card:hover {
  transform: scale(1.1);
  z-index: 999;
}

.title {
  font-size: 1.25em;
  font-weight: bold;
}

</style>
