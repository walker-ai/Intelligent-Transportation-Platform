<template>
  <div id="Home">
    <app-header></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "../../../components/Header.vue";
import Footer from "../../../components/Footer.vue";
import Content from "../../../components/Content.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    "app-header": Header,
    "app-footer": Footer,
    "app-content": Content,
  },
  methods: {},
};
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
</style>