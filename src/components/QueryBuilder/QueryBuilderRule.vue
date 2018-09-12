<template>
  <div class="rule-container"> 
    <div class="rule-header"> 
        <div class="rule-filter-container">
            <el-select v-model="selectedRule" size="small" @change="ruleChange">
                <el-option v-for="r in rules"
                :key="r.id"
                :label="r.label"
                :value="r.id"></el-option>
            </el-select>
            <el-select v-if="subRules !== null && subRules.length > 0" v-model="selectedSubRule" size="small" @change="subRuleChange">
                <el-option v-for="r in subRules"
                :key="r.id"
                :label="r.label"
                :value="r.id"></el-option>
            </el-select>
        </div>
        <div class="rule-operator-container">
            <el-select v-model="query.selectedOperator" size="small">
                <el-option v-for="operator in selectedRuleObj.operators" :value="operator" :key="operator" :label="operator">
                </el-option>
            </el-select>
        </div>
        <div class="rule-value-container">
          <el-input v-if="selectedRuleObj.inputType === 'text'" type="text" v-model="query.value"/>
          <el-input v-if="selectedRuleObj.inputType === 'number'" type="number" v-model="query.value" />
          <el-time-picker v-if="selectedRuleObj.inputType === 'time'" type="time" v-model="query.value" />
          <el-date-picker v-if="selectedRuleObj.inputType === 'date' || selectedRuleObj.inputType === 'datetime'" :type="selectedRuleObj.inputType" v-model="query.value" />
          <el-checkbox-group v-model="query.value" v-if="selectedRuleObj.inputType === 'checkbox'">
            <el-checkbox :label="choice" v-for="choice in selectedRuleObj.choices" :key="choice" :value="choice"></el-checkbox>
          </el-checkbox-group>
          <el-radio-group v-model="query.value" v-if="selectedRuleObj.inputType === 'radio'">
            <el-radio :label="choice" v-for="choice in selectedRuleObj.choices" :key="choice" :value="choice"></el-radio>
          </el-radio-group>
        </div>

        <div class="btn-group pull-right rule-actions"> 
            <el-button size="small" type="danger" icon="el-icon-close"  @click="remove">Delete</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import deepClone from "@/utils/deepClone.js";

export default {
  name: "query-builder-rule",

  props: ["query", "index", "rules"],

  data() {
    return {
      selectedRuleObj: this.rules[0],
      selectedRule: this.rules[0].id,
      selectedSubRule: null,
      subRules: []
    };
  },
  methods: {
    remove: function() {
      this.$emit("child-deletion-requested", this.index);
    },
    ruleChange: function() {
      const _this = this;
      this.query.value = null;
      this.subRules = [];
      this.selectedSubRule = null;
      this.rules.forEach(function(value) {
        if (value.id === _this.selectedRule) {
          if (
            value.subRules !== undefined &&
            value.subRules !== null &&
            value.subRules.length > 0
          ) {
            _this.subRules = value.subRules;
          } else {
            _this.selectedRuleObj = value;
            _this.query.rule = _this.selectedRule;
            if (_this.selectedRuleObj.inputType === "checkbox") {
              _this.query.value = [];
            }
            if (_this.selectedRuleObj.type === "select") {
              _this.query.value = _this.selectedRuleObj.choices[0].value;
            }
            _this.$emit("update:query", deepClone(_this.query));
          }
        }
      });
    },
    subRuleChange: function() {
      const _this = this;
      this.query.value = null;
      this.subRules.forEach(function(value) {
        if (value.id === _this.selectedSubRule) {
          _this.selectedRuleObj = value;
          _this.query.rule = _this.selectedSubRule;
          if (_this.selectedRuleObj.inputType === "checkbox") {
            _this.query.value = [];
          }
          if (_this.selectedRuleObj.type === "select") {
            _this.query.value = _this.selectedRuleObj.choices[0].value;
          }
          _this.$emit("update:query", deepClone(_this.query));
        }
      });
    }
  },

  mounted() {
    const updated_query = deepClone(this.query);

    // Set a default value for these types if one isn't provided already
    if (this.query.value === null) {
      if (this.selectedRuleObj.inputType === "checkbox") {
        updated_query.value = [];
      }
      if (this.selectedRuleObj.type === "select") {
        updated_query.value = this.selectedRuleObj.choices[0].value;
      }
      if (this.selectedRuleObj.type === "custom-component") {
        updated_query.value = this.selectedRuleObj.default || null;
      }

      this.$emit("update:query", updated_query);
    }
  }
};
</script>
