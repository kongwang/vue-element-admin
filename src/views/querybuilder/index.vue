<template>
  <div id="app">
    <vue-query-builder
      :rules="rules"
      v-model="query">
    </vue-query-builder>

    <p>Generated output:</p>

    <pre>{{ JSON.stringify(this.query, null, 2) }}</pre>
  </div>
</template>

<script>
import VueQueryBuilder from "@/components/QueryBuilder/VueQueryBuilder.vue";

export default {
  name: "App",
  components: {
    VueQueryBuilder
  },

  data() {
    return {
      rules: [
        {
          type: "text",
          id: "text",
          label: "text"
        },
        {
          type: "date",
          id: "date",
          label: "date",
          operators: [
            { label: "等於", value: "EQUALS" },
            { label: "早於", value: "GREATTHAN" },
            { label: "晚於", value: "LESSTHAN" },
            { label: "早於等於", value: "GREATTHANEQUALS" },
            { label: "晚於等於", value: "LESSTHANEQUALS" },
            { label: "不等於", value: "NOTEQUALS" }
          ]
        },
        {
          type: "datetime",
          id: "vegetable",
          label: "Vegetable",
          operators: [
            { label: "等於", value: "EQUALS" },
            { label: "早於", value: "GREATTHAN" },
            { label: "晚於", value: "LESSTHAN" },
            { label: "早於等於", value: "GREATTHANEQUALS" },
            { label: "晚於等於", value: "LESSTHANEQUALS" },
            { label: "不等於", value: "NOTEQUALS" }
          ]
        },
        {
          type: "checkbox",
          id: "checkbox",
          label: "checkbox",
          choices: ["Apple", "Banana"]
        },
        {
          type: "numeric",
          id: "numeric",
          label: "numeric"
        },
        {
          type: "radio",
          id: "radio",
          label: "radio",
          choices: ["Apple", "Banana"]
        },
        {
          id: "subSelect",
          label: "cascade-select",
          subRules: [
            {
              type: "text",
              id: "text",
              label: "text"
            },
            {
              type: "date",
              id: "date",
              label: "date",
              operators: [
                { label: "等於", value: "EQUALS" },
                { label: "早於", value: "GREATTHAN" },
                { label: "晚於", value: "LESSTHAN" },
                { label: "早於等於", value: "GREATTHANEQUALS" },
                { label: "晚於等於", value: "LESSTHANEQUALS" },
                { label: "不等於", value: "NOTEQUALS" }
              ]
            },
            {
              type: "datetime",
              id: "vegetable",
              label: "Vegetable",
              operators: [
                { label: "等於", value: "EQUALS" },
                { label: "早於", value: "GREATTHAN" },
                { label: "晚於", value: "LESSTHAN" },
                { label: "早於等於", value: "GREATTHANEQUALS" },
                { label: "晚於等於", value: "LESSTHANEQUALS" },
                { label: "不等於", value: "NOTEQUALS" }
              ]
            },
            {
              type: "checkbox",
              id: "checkbox",
              label: "checkbox",
              choices: ["Apple", "Banana"]
            },
            {
              type: "numeric",
              id: "numeric",
              label: "numeric"
            },
            {
              type: "radio",
              id: "radio",
              label: "radio",
              choices: ["Apple", "Banana"]
            }
          ]
        }
      ],

      query: {}
    };
  }
};
</script>
