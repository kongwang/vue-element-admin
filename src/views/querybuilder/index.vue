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
          type: "datetime",
          id: "vegetable",
          label: "Vegetable"
        },
        {
          type: "checkbox",
          id: "fruit",
          label: "Fruit",
          choices: ["Apple", "Banana"]
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
              type: "checkbox",
              id: "fruit",
              label: "Fruit",
              choices: ["Apple", "Banana"]
            },
            {
              type: "datetime",
              id: "vegetable",
              label: "Vegetable"
            }
          ]
        }
      ],

      query: {}
    };
  }
};
</script>
