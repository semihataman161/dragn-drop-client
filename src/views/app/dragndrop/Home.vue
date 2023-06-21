<template>
  <div>
    <b-row>
      <b-col xxs="12">
        <h1> {{ $t('menu.home') }} </h1>
        <div class="separator mb-5"></div>
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="3" lg="3"> </b-col>
      <b-col xl="6" lg="6" class="text-center">
        <b-embed type="video" aspect="4by3" controls poster="poster.png">
          <source src="dev-stories.mp4" type="video/mp4">
        </b-embed>
      </b-col>
      <b-col xl="3" lg="3"> </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col xl="3" lg="3">
        <b-form-input v-model="reviewForm.title" :placeholder="$t('home.enter-review-title')"></b-form-input>
      </b-col>
      <b-col xl="3" lg="3">
        <b-form-input v-model="reviewForm.content" :placeholder="$t('home.enter-review-content')"></b-form-input>
      </b-col>
      <b-col xl="3" lg="3">
        <b-form-rating v-model="reviewForm.rating" variant="warning" class="mb-2"></b-form-rating>
      </b-col>
      <b-col xl="3" lg="3">
        <b-button @click="handleCreateButtonClick"> {{ $t('home.create') }} </b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col xl="12" lg="12">
        <icon-cards-carousel v-if="items.length > 0" :items="items" :glideIconsOption="glideIconsOption" />
        <b-card v-else no-body class="overflow-hidden">
          <b-row no-gutters>
            <b-col xl="12" lg="12" class="text-center">
              <b-card-body :title="$t('home.no-review-title')">
                <b-card-text>
                  {{ $t('home.no-review-message') }}
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
import { mapGetters } from "vuex";
import { getAllReviews, createReview } from "../../../service/review.service";

export default {
  data() {
    return {
      reviewForm: {
        title: "",
        content: "",
        rating: 0
      },
      items: [],
      glideIconsOption: {
        gap: 5,
        type: "carousel",
        hideNav: true,
      },
    }
  },
  components: {
    "icon-cards-carousel": IconCardsCarousel,
  },
  methods: {
    async handleCreateButtonClick() {
      const { title, content, rating } = this.reviewForm;

      if (title === "") {
        this.$notify("warning", this.$t('warning-messages.required-field'), this.$t('home.review-title-required'), {
          permanent: false,
          duration: 7000,
        });

        return;
      }

      try {
        const request = { ...this.reviewForm, userId: this.currentUser._id };
        const res = await createReview(request);
        const { _id, userName } = res.data;
        this.items.push({ _id, title: userName + ': ' + title, value: content, rating });
        this.reviewForm = {};
      } catch (error) {
        return;
      }
    },
  },
  watch: {
    items: {
      handler: function (newVal, oldVal) {
        this.glideIconsOption.perView = newVal.length;
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  async created() {
    try {
      const res = await getAllReviews();

      for (const review of res.data) {
        const { _id, userName, title, content, rating } = review;
        this.items.push({ _id, title: userName + ': ' + title, value: content, rating })
      }
    } catch (error) {
      return;
    }
  }
};
</script>
