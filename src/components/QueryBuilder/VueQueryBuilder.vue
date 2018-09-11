<template>
  <div class="query-builder form-inline">
    <query-builder-group
      :index="0"
      :query.sync="query"
      :ruleTypes="ruleTypes"
      :rules="mergedRules"
      :maxDepth="maxDepth"
      :depth="depth"
      :labels="mergedLabels"
      type="query-builder-group"
      ></query-builder-group>
  </div>
</template>

<script>
import QueryBuilderGroup from "./QueryBuilderGroup.vue";
import deepClone from "@/utils/deepClone.js";

var defaultLabels = {
  matchTypeAll: "AND",
  matchTypeAny: "OR",
  addRule: "Add Rule",
  removeRule: "&times;",
  addGroup: "Add Group",
  removeGroup: "&times;",
  textInputPlaceholder: "value"
};

export default {
  name: "vue-query-builder",

  components: {
    QueryBuilderGroup
  },

  props: {
    rules: Array,
    labels: {
      type: Object,
      default() {
        return defaultLabels;
      }
    },
    maxDepth: {
      type: Number,
      default: 3,
      validator: function(value) {
        return value >= 1;
      }
    },
    value: Object
  },

  data() {
    return {
      depth: 1,
      query: {
        logicalOperator: "AND",
        children: []
      },
      ruleTypes: {
        text: {
          operators: [
            "equals",
            "does not equal",
            "contains",
            "does not contain",
            "is empty",
            "is not empty",
            "begins with",
            "ends with"
          ],
          inputType: "text",
          id: "text-field"
        },
        numeric: {
          operators: ["=", "<>", "<", "<=", ">", ">="],
          inputType: "number",
          id: "number-field"
        },
        time: {
          operators: ["=", "<>", "<", "<=", ">", ">="],
          inputType: "time",
          id: "time-field"
        },
        date: {
          operators: ["=", "<>", "<", "<=", ">", ">="],
          inputType: "date",
          id: "date-field"
        },
        datetime: {
          operators: ["=", "<>", "<", "<=", ">", ">="],
          inputType: "datetime",
          id: "datetime-field"
        },
        radio: {
          operators: [],
          choices: [],
          inputType: "radio",
          id: "radio-field"
        },
        checkbox: {
          operators: [],
          choices: [],
          inputType: "checkbox",
          id: "checkbox-field"
        },
        select: {
          operators: ["=", "<>"],
          choices: [],
          inputType: "select",
          id: "select-field"
        },
        "multi-select": {
          operators: ["="],
          choices: [],
          inputType: "select",
          id: "multi-select-field"
        }
      }
    };
  },

  computed: {
    mergedLabels() {
      return Object.assign({}, defaultLabels, this.labels);
    },

    mergedRules() {
      var mergedRules = [];
      var vm = this;

      vm.rules.forEach(function(rule) {
        if (typeof vm.ruleTypes[rule.type] !== "undefined") {
          mergedRules.push(Object.assign({}, vm.ruleTypes[rule.type], rule));
        } else {
          mergedRules.push(rule);
        }
      });

      return mergedRules;
    }
  },

  mounted() {
    this.$watch(
      "query",
      newQuery => {
        this.$emit("input", deepClone(newQuery));
      },
      {
        deep: true
      }
    );

    if (typeof this.$options.propsData.value !== "undefined") {
      this.query = Object.assign(this.query, this.$options.propsData.value);
    }
  }
};
</script>

<style>
#com_rules :before,
#com_rules :after {
  box-sizing: border-box;
}
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
div.c-rules-group-header .el-button--mini,
div.c-rule-header .el-button--mini {
  padding: 3px;
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