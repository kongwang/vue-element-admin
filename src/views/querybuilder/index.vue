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
          type: "radio",
          id: "fruit",
          label: "Fruit",
          choices: [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" }
          ]
        }
      ],

      query: {

      }
    };
  }
};
</script>
<style>
div.c-rules-group-container {
  padding: 10px;
  padding-bottom: 6px;
  border: 1px solid #dcc896;
  background: rgba(250, 240, 210, 0.5);
}
div.c-rules-group-container,
div.c-rule-container {
  position: relative;
  margin: 4px 0;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid #eee;
}
div.c-rule-container {
  background: rgba(255, 255, 255, 0.9);
}
div.c-rules-group-header {
  margin-bottom: 10px;
}
div.c-pull-right {
  float: right !important;
}
div.c-rules-list {
  list-style: none;
  padding: 0 0 0 15px;
  margin: 0;
}
div.c-btn-group,
div.c-btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.c-rules-group-body .c-rules-list > ::after,
.c-rules-group-body .c-rules-list > ::before {
  content: "";
  position: absolute;
  left: -10px;
  width: 10px;
  height: calc(50% + 4px);
  border-color: #ccc;
  border-style: solid;
}
.c-rules-group-body .c-rules-list > :first-child::before {
  top: -12px;
  height: calc(50% + 14px);
}
.c-rules-group-body .c-rules-list > ::before {
  top: -4px;
  border-width: 0 0 2px 2px;
}
.c-rules-group-body .c-rules-list > :last-child::before {
  border-radius: 0 0 0 4px;
}
.c-rules-group-body .c-rules-list > ::after {
  top: 50%;
  border-width: 0 0 0 2px;
}
.c-rules-group-body .c-rules-list > :last-child::after {
  display: none;
}
.c-rules-group-body .drag-handle,
.c-rules-group-body .error-container,
.c-rules-group-body .c-rule-container .c-rule-filter-container,
.c-rules-group-body .c-rule-container .c-rule-operator-container,
.c-rules-group-body .c-rule-container .c-rule-value-container {
  display: inline-block;
  margin: 0 5px 0 0;
  vertical-align: middle;
}
.c-rules-group-body .c-rule-container .c-rule-value-container {
  border-left: 1px solid #ddd;
  padding-left: 5px;
}
</style>

