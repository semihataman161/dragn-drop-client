<template>
  <div>
    <b-row>
      <b-col xxs="12">
        <h1> {{ $t('menu.websites') }} </h1>
        <div class="separator mb-5"></div>
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="4" lg="4">
        <b-form-input v-model="websiteForm.name" :placeholder="$t('website.enter-website-name')"></b-form-input>
      </b-col>
      <b-col xl="4" lg="4">
        <b-form-input v-model="websiteForm.description"
          :placeholder="$t('website.enter-website-description')"></b-form-input>
      </b-col>
      <b-col xl="4" lg="4">
        <b-button @click="handleCreateButtonClick"> {{ $t('website.create') }} </b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col xl="12" lg="12">
        <icon-cards-carousel v-if="items.length > 0" :items="items" :glideIconsOption="glideIconsOption"
          :handleCardClick="handleWebsiteClick" />
        <b-card v-else no-body class="overflow-hidden">
          <b-row no-gutters>
            <b-col xl="12" lg="12" class="text-center">
              <b-card-body :title="$t('website.no-website-title')">
                <b-card-text>
                  {{ $t('website.no-website-message') }}
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
import { getWebsitesByUserId, createWebsite } from "../../../service/website.service";

export default {
  data() {
    return {
      websiteForm: {
        name: "",
        description: "",
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
      const { name, description } = this.websiteForm;

      if (name === "") {
        this.$notify("warning", this.$t('warning-messages.required-field'), this.$t('website.website-name-required'), {
          permanent: false,
          duration: 7000,
        });

        return;
      }

      try {
        const request = { ...this.websiteForm, userId: this.currentUser._id };
        const res = await createWebsite(request);
        this.items.push({ _id: res.data._id, title: name, value: description, icon: 'iconsminds-project' });
        this.websiteForm = {};
      } catch (error) {
        return;
      }
    },
    handleWebsiteClick(item) {
      this.$router.push(`editor/${item._id}`);
    }
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
      const res = await getWebsitesByUserId(this.currentUser._id);

      for (const website of res.data) {
        this.items.push({ _id: website._id, title: website.name, value: website.description, icon: 'iconsminds-project' })
      }
    } catch (error) {
      return;
    }
  }
};
</script>
