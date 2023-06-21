<template>
  <div class="icon-row-item">
    <b-card class="mb-4 text-center" @click="handleCardClick({ _id, title, value })">
      <p class="lead card-text font-weight-semibold mb-0">{{ title }}</p>
      <i v-if="icon" :class="icon" />
      <b-form-rating v-if="rating" v-model="rating" variant="warning" class="mb-2" readonly></b-form-rating>
      <p class="text-center">{{ value }}</p>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    _id: { type: String, default: '' },
    title: { type: String, default: '' },
    icon: { type: String },
    rating: { type: Number },
    value: { type: String, default: '' },
    handleCardClick: { type: Function, default: () => { } }
  },
  methods: {
  },
  mounted() {
  }
}
</script>
