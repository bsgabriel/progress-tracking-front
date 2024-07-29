<template>
  <div>
    <div v-if="loading" class="text-center mt-4">
      <b-spinner label="Loading..." />
    </div>
    <div v-else class="row">
      <div class="col-md-4 d-flex" v-for="course in courses" :key="course.id">
        <div class="card">
          <img :src="course.image" class="card-img-top" :alt="course.name" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ course.name }}</h5>
            <p class="card-text" v-html="formattedDescription(course.desc)" />
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation">
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
import { BSpinner } from "bootstrap-vue-next";

export default {
  components: {
    BSpinner,
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
    formattedDescription(desc) {
      return desc.replace(/\n/g, "<br>");
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.card-img-top {
  width: 100%;
  object-fit: contain;
}
</style>
