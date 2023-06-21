<template>
  <div class="icon-cards-row">
    <glide-component :settings="glideIconsOption">
      <icon-card v-for="(item, index) in items" :key="index" :_id="item._id" :title="item.title" :icon="item.icon"
        :rating="item.rating" :value="item.value" :handleCardClick="handleCardClick" />
    </glide-component>
  </div>
</template>
<script>
import GlideComponent from "../../components/Carousel/GlideComponent";
import IconCard from "../../components/Cards/IconCard";

export default {
  components: {
    "glide-component": GlideComponent,
    "icon-card": IconCard,
  },
  props: {
    items: { type: Array, default: [] },
    glideIconsOption: { type: Object, default: {} },
    handleCardClick: { type: Function, default: () => { } }
  },
  data() {
    return {
    };
  },
  methods: {
  },
  watch: {
  },
  created() {

  },
  mounted() {

  },
};
</script>
