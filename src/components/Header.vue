<template>
  <v-app-bar app>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
