<template>
  <div>
    <b-row>
      <b-col xxs="12">
        <h1>{{ $t("menu.editor") }}</h1>
        <div class="separator mb-5"></div>
      </b-col>
    </b-row>
    <div>
      <b-card no-body>
        <b-tabs card vertical v-model="selectedTabIndex">
          <!-- Render Tabs, supply a unique `key` to each tab -->
          <b-tab v-for="page in pages" :key="'dyn-tab-' + page._id" :title="page.name">
            <grapes-js-editor :pageId="page._id" />
            <b-button v-show="pages.length !== 0" size="sm" variant="danger" class="float-right mt-3 mb-3"
              @click="handleDeletePageClick(page._id)">
              {{ $t('editor.delete-page') }}
            </b-button>
          </b-tab>

          <!-- New Tab Button (Using tabs-end slot) -->
          <template #tabs-end>
            <b-nav-item role="presentation" href="#">
              <b-button @click.prevent="handleCreatePageClick">+</b-button>
              <b-form-input class="mt-2" v-model="pageName" :placeholder="$t('editor.enter-page-name')"></b-form-input>
            </b-nav-item>
          </template>

          <!-- Render this if no tabs -->
          <template #empty>
            <div class="text-center text-muted">
              {{ $t('editor.no-pages') }}<br />
              {{ $t('editor.open-new-page') }}
            </div>
          </template>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import GrapesJsEditor from "./GrapesJsEditor";
import { getPagesByWebsiteId, createPage, deletePage } from "../../../service/page.service";

export default {
  components: {
    "grapes-js-editor": GrapesJsEditor,
  },
  data() {
    return {
      pages: [],
      pageName: "",
      selectedTabIndex: 0,
    };
  },
  methods: {
    async handleCreatePageClick() {
      if (this.pageName === "") {
        this.$notify("warning", this.$t('warning-messages.required-field'), this.$t('editor.page-name-required'), {
          permanent: false,
          duration: 7000,
        });

        return;
      }

      try {
        const request = { name: this.pageName, websiteId: this.$route.params.websiteId };
        const res = await createPage(request);
        this.pages.push({ _id: res.data._id, ...request });
        this.pageName = "";
      } catch (error) {
        return;
      }
    },
    handleDeletePageClick(pageId) {
      this.deleteExistingPage(pageId);
    },
    async deleteExistingPage(pageId) {
      const selectedPage = this.pages[this.selectedTabIndex];
      if (selectedPage) {
        try {
          await deletePage(pageId);
          this.pages.splice(this.selectedTabIndex, 1);
        } catch (error) {
          return;
        }
      }
    },
  },
  async created() {
    try {
      const res = await getPagesByWebsiteId(this.$route.params.websiteId);
      this.pages = res.data;
    } catch (error) {
      return;
    }
  },
  mounted() { },
};
</script>