<template>
  <div :id="`gjs-${this.$props.pageId}`"></div>
</template>

<script>
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs/dist/grapes.min.js";
import grapesjspresetwebpage from "grapesjs-preset-webpage";
import grapesjsblocks from "grapesjs-blocks-basic";
import { apiUrl } from "@/constants/config";

export default {
  props: {
    pageId: { type: String },
  },
  data() {
    return {
      content: null,
      urlStore: `${apiUrl}/api/page/saveGrapesjsChanges/${this.$props.pageId}`,
      urlLoad: `${apiUrl}/api/page/loadGrapesjsContent/${this.$props.pageId}`,
    };
  },
  methods: {
    onStore(content) {
      return { content };
    },
    onLoad(result) {
      const defaultContent = {
        "assets": [],
        "styles": [],
        "pages": [
          {
            "frames": [
              {
                "component": {
                  "type": "wrapper",
                  "stylable": [
                    "background",
                    "background-color",
                    "background-image",
                    "background-repeat",
                    "background-attachment",
                    "background-position",
                    "background-size"
                  ]
                }
              }
            ],
            "id": this.$props.pageId
          }
        ]
      }

      return result.data.content || defaultContent;
    }
  },
  mounted() {
    const editor = grapesjs.init({
      container: `#gjs-${this.$props.pageId}`,
      height: "900px",
      width: "100%",
      plugins: [grapesjspresetwebpage, grapesjsblocks],
      storageManager: {
        type: "remote",
        stepsBeforeSave: 1,
        options: {
          remote: {
            urlLoad: this.urlLoad,
            urlStore: this.urlStore,
            // The `remote` storage uses the POST method when stores data but
            // the json-server API requires PATCH.
            fetchOptions: (opts) =>
              opts.method === "POST" ? { method: "PATCH" } : {},
            // As the API stores projects in this format `{id: 1, data: projectData }`,
            // we have to properly update the body before the store and extract the
            // project data from the response result.
            onStore: (content) => this.onStore(content),
            onLoad: (result) => this.onLoad(result),
          },
        },
      },
      deviceManager: {
        devices: [
          {
            id: "desktop",
            name: "Desktop",
            width: "",
          },
          {
            id: "tablet",
            name: "Tablet",
            width: "768px",
            widthMedia: "992px",
          },
          {
            id: "mobilePortrait",
            name: "Mobile portrait",
            width: "320px",
            widthMedia: "575px",
          },
        ],
      },
      pluginsOpts: {
        grapesjsblocks: {},
      },
    });
  },
};
</script>
