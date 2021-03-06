<template>
  <div id="app" :class="{ offline: offline }">
    <div class="offline-msg">
      <v-icon name="plane" scale="2"></v-icon>
      <span>当前未连接到网络</span>
    </div>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import "vue-awesome/icons/plane";

import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      offline: !navigator.onLine
    };
  },
  created() {
    if (sessionStorage.getItem("wo_user")) {
      this.$store.commit(
        "updateUserInfo",
        JSON.parse(sessionStorage.getItem("wo_user") as string)
      );
    }
  },
  mounted() {
    const loadingPage: HTMLElement = document.querySelector(
      ".loading-page"
    ) as HTMLElement;
    if (loadingPage.classList.contains("show")) {
      loadingPage.classList.remove("show");
    }
    // 离线
    window.addEventListener("offline", () => {
      this.offline = true;
    });

    // 在线
    window.addEventListener("online", () => {
      // 重新加载一次
      location.reload();
      this.offline = false;
    });
  }
});
</script>

<style lang="scss">
:root {
  // User Card Width
  --card-width: 20vw;
  --card-height: calc(var(--card-width) * 1.414);

  @include screen($larger) {
    --card-width: 301px;
  }
}

.offline {
  pointer-events: none;

  &::before {
    cursor: not-allowed !important;
    pointer-events: auto !important;
  }

  & > .main {
    filter: blur(10px);
  }

  & > .offline-msg {
    transform: translateY(0vh) !important;
    opacity: 1 !important;
  }
}

#app {
  font-family: "Noto Sans SC", "PingFang SC", miui, -apple-system, system-ui,
    "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #f8f9fa;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;

  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;

  &::before {
    content: "";
    position: fixed;
    top: 0%;
    left: 0%;
    opacity: 0;
    width: 100vw;
    height: 100vh;
    transition: all 0.4s;
    z-index: 999;
    pointer-events: none;
  }

  & > .offline-msg {
    position: fixed;
    top: 2vh;

    font-size: 1.4vw;
    border-radius: 2vh;
    text-align: center;
    background-color: #ffffff;
    color: #999;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 1vw 4vw;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;

    transform: translateY(-10vh);
    opacity: 0;
    transition: opacity, transform 0.6s, 0.6s;

    & > span {
      margin-inline-start: 4px;
    }
  }

  .main {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  // vue-awesome
  .fa-icon {
    width: auto;
    height: 2vw; /* or any other relative font sizes */

    /* You would have to include the following two lines to make this work in Safari */
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
