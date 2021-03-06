<template>
  <header>
    <div class="before-part">
      <el-tooltip :content="foldText" placement="bottom">
        <el-button :icon="btnIcon" @click="clickFun" circle></el-button>
      </el-tooltip>
      <vertical-divider :isTransparent="true"></vertical-divider>
      <span class="title">ROOT · 管理后台</span>
    </div>
    <div class="after-part">
      <el-tooltip content="全屏模式" placement="bottom">
        <el-button
          @click="toggleFullScreen"
          icon="el-icon-full-screen"
          type="text"
          circle
          plain
        ></el-button>
      </el-tooltip>
      <vertical-divider :isTransparent="true"></vertical-divider>
      <el-tooltip content="进入用户与学院管理界面" placement="bottom">
        <el-button
          @click="turn2OtherPage(roles.user)"
          icon="el-icon-s-flag"
          type="text"
          circle
          plain
        ></el-button>
      </el-tooltip>
      <el-tooltip content="进入科室管理界面" placement="bottom">
        <el-button
          @click="turn2OtherPage(roles.office_admin)"
          icon="el-icon-s-platform"
          type="text"
          circle
          plain
        ></el-button>
      </el-tooltip>
      <vertical-divider :isTransparent="true"></vertical-divider>
      <el-dropdown trigger="click" @command="menuCommand">
        <el-button icon="el-icon-s-custom" circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout" icon="el-icon-switch-button"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

import VerticalDivider from "@/components/Etc/VerticalDivider.vue";
import { Roles, rolesObject } from "@/static-data/roles";
import { rolesInOrder } from "@/utils/validate";

export default Vue.extend({
  props: { isCollapse: Boolean },
  components: {
    VerticalDivider
  },
  data() {
    return {
      roles: Roles
    };
  },
  methods: {
    clickFun() {
      this.$emit("click");
    },
    toggleFullScreen() {
      if (document.fullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },
    turn2OtherPage(role: number) {
      this.$confirm(
        `切换到${
          rolesObject[Roles[role] as keyof typeof rolesObject]
        }页面后，回到 ROOT 管理页面将要求再次登录, 是否继续?`,
        "注意",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        // 修改权限
        const permission: string[] = rolesInOrder(
          JSON.parse(sessionStorage.getItem("wo_permission") as string)
        );

        // 删除其余权限
        permission.splice(permission.indexOf(Roles[role]));

        sessionStorage.setItem("wo_permission", JSON.stringify(permission));
        // 切换路由
        this.$router.replace({ name: "index" });
        this.$message({
          type: "success",
          message: "切换成功!"
        });
      });
    },
    menuCommand(command: string) {
      switch (command) {
        case "logout": {
          this.$store.commit("clearUserInfo");
          sessionStorage.clear();
          this.$message({
            type: "success",
            message: "退出登录成功!"
          });
          this.$router.replace({ name: "login" });
          break;
        }
        default: {
          this.$message({
            type: "info",
            message: "未知操作"
          });
          break;
        }
      }
    }
  },
  computed: {
    btnIcon() {
      return this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
    foldText() {
      return this.isCollapse ? "展开菜单" : "折叠菜单";
    }
  }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;

  & > .before-part {
    padding-block-start: 1vh;
    padding-inline-start: 1vw;

    & > .title {
      font-weight: 800;
    }
  }

  & > .after-part {
    padding-block-start: 1vh;
    padding-block-end: 1vh;
    padding-inline-end: 1vw;
  }
}
</style>
