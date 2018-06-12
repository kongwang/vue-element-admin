<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @blur.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="cron表达式" v-model="listQuery.cronExpression">
      </el-input>
      <el-input @blur.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="执行的类名" v-model="listQuery.className">
      </el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="任务名称" v-model="listQuery.jobName">
      </el-input>
      <el-input style="width: 200px;" class="filter-item" placeholder="任务组" v-model="listQuery.jobGroup">
      </el-input>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.status">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>      
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="UUID">
        <template slot-scope="scope">
          <span>{{scope.row.uuid}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="任务名称">
        <template slot-scope="scope">
          <span>{{scope.row.jobName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="任务组">
        <template slot-scope="scope">
          <span>{{scope.row.jobGroup}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="触发器名称">
        <template slot-scope="scope">
          <span>{{scope.row.triggerName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="触发器组">
        <template slot-scope="scope">
          <span>{{scope.row.triggerGroup}}</span>
        </template>
      </el-table-column>
      <el-table-column width="250px" align="center" label="执行的类名">
        <template slot-scope="scope">
          <span>{{scope.row.className}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="cron表达式">
        <template slot-scope="scope">
          <span>{{scope.row.cronExpression}}</span>
        </template>
      </el-table-column>
       <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status!='RUNNING'" size="mini" type="success" @click="handleModifyStatus(scope.row,'run')">启动
          </el-button>
          <el-button v-if="scope.row.status!='STOPPED'" size="mini" @click="handleModifyStatus(scope.row,'stop')">停止
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑任务" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 500px; margin-left:50px;'>
        <input type="hidden" v-model="temp.uuid" />
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="temp.jobName"></el-input>
        </el-form-item>
        <el-form-item label="cron表达式" prop="cronExpression">
          <el-input v-model="temp.cronExpression"></el-input>
        </el-form-item>
        <el-form-item label="任务组" prop="jobGroup">
          <el-input v-model="temp.jobGroup"></el-input>
        </el-form-item>
        <el-form-item label="触发器名称" prop="triggerName">
          <el-input v-model="temp.triggerName"></el-input>
        </el-form-item>
        <el-form-item label="触发器组" prop="triggerGroup">
          <el-input v-model="temp.triggerGroup"></el-input>
        </el-form-item>
        <el-form-item label="执行的类名" prop="className">
          <el-input v-model="temp.className"></el-input>
        </el-form-item>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  fetchList,
  fetchTask,
  stopTask,
  startTask,
  removeTask,
  createTask,
  updateTask
} from "@/api/taskmanager";
import waves from "@/directive/waves"; // 水波纹指令

export default {
  name: "taskManager",
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        cronExpression: undefined,
        jobName: undefined,
        jobGroup: undefined,
        className: undefined,
        status: undefined
      },
      statusOptions: [
        { label: "ALL", key: undefined },
        { label: "RUNNING", key: "RUNNING" },
        { label: "STOPPED", key: "STOPPED" }
      ],
      temp: {
        uuid: undefined,
        jobName: "",
        jobGroup: "",
        triggerName: "",
        triggerGroup: "",
        className: "",
        cronExpression: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      rules: {
        jobName: [
          { required: true, message: "jobName is required", trigger: "blur" }
        ],
        jobGroup: [
          { required: true, message: "jobGroup is required", trigger: "blur" }
        ],
        triggerName: [
          {
            required: true,
            message: "triggerName is required",
            trigger: "blur"
          }
        ],
        triggerGroup: [
          {
            required: true,
            message: "triggerGroup is required",
            trigger: "blur"
          }
        ],
        className: [
          { required: true, message: "className is required", trigger: "blur" }
        ],
        cronExpression: [
          {
            required: true,
            message: "cronExpression is required",
            trigger: "blur"
          }
        ]
      }
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        STOPPED: "STOPPED",
        RUNING: "RUNING",
        UNKNOW: "UNKNOW"
      };
      return statusMap[status];
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleModifyStatus(row, status) {
      if (status === "run") {
        startTask(row.uuid).then(() => {
          row.status = "RUNNING";
          this.$message({
            message: "操作成功",
            type: "success"
          });
        });
      } else {
        stopTask(row.uuid).then(() => {
          row.status = "STOPPED";
          this.$message({
            message: "操作成功",
            type: "success"
          });
        });
      }
    },
    resetTemp() {
      this.temp = {
        uuid: undefined,
        jobName: "",
        jobGroup: "",
        triggerName: "",
        triggerGroup: "",
        className: "",
        cronExpression: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          createTask(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      fetchTask(row.uuid).then(response => {
        this.temp = response.data;
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs["dataForm"].clearValidate();
        });
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          updateTask(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(row) {
      this.$confirm("確認刪除？", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeTask(row.uuid).then(() => {
          this.getList();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
        });
      });
    }
  }
};
</script>
