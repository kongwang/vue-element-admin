<template>
  <div class="c-rule-container">
    <div class="c-rule-header">
        <div class="c-pull-right c-btn-group">
            <el-button size="small" type="danger" icon="el-icon-close"  @click="remove" v-html="labels.removeRule">Delete</el-button>
        </div>
        <div class="c-rule-filter-container">
            <el-select v-model="rule" size="small">
                <el-option v-for="r in selectOptions"
                :key="r.id"
                :label="r.label"
                :value="r.id"></el-option>
            </el-select>
        </div>
        <div class="c-rule-operator-container">
            <el-select v-model="query.selectedOperator" size="small">
                <option v-for="operator in rule.operators" v-bind:value="operator" :key="operator">
                  {{ operator }}
                </option>
            </el-select>
        </div>
        <div class="c-rule-value-container">
          <el-input v-if="rule.inputType === 'text'" type="text" v-model="query.value" :placeholder="labels.textInputPlaceholder"/>
          <el-input v-if="rule.inputType === 'number'" type="number" v-model="query.value" />
          <el-time-picker v-if="rule.inputType === 'time'" type="time" v-model="query.value" :placeholder="labels.textInputPlaceholder" />
          <el-date-picker v-if="rule.inputType === 'date' || rule.inputType === 'datetime'" :type="rule.inputType" v-model="query.value" :placeholder="labels.textInputPlaceholder" />
        </div>
    </div>
  </div>
</template>

<script>
import deepClone from "@/utils/deepClone.js";

export default {
  name: "query-builder-rule",

  props: ["query", "index", "labels", "rules"],

  data() {
    return {
      rule: this.rules[0]
      // selectedRule: this.rules[0]
    };
  },
  methods: {
    remove: function() {
      this.$emit("child-deletion-requested", this.index);
    },
    updateQuery(value) {
      const updated_query = deepClone(this.query);
      updated_query.value = value;
      this.$emit("update:query", updated_query);
    }
  },

  computed: {
    selectOptions() {
      // if (typeof this.rule.choices === "undefined") {
      //   return {};
      // }

      // return this.rule.choices.reduce(function(groups, item, index) {
      //   const key = item["group"];
      //   if (typeof key !== "undefined") {
      //     groups[key] = groups[key] || [];
      //     groups[key].push(item);
      //   } else {
      //     groups[index] = item;
      //   }

      //   return groups;
      // }, {});
    }
  },

  mounted() {
    const updated_query = deepClone(this.query);

    // Set a default value for these types if one isn't provided already
    if (this.query.value === null) {
      if (this.rule.inputType === "checkbox") {
        updated_query.value = [];
      }
      if (this.rule.type === "select") {
        updated_query.value = this.rule.choices[0].value;
      }

      this.$emit("update:query", updated_query);
    }
  }
};
</script>
