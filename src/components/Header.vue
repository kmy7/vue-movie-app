<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="nav in navigations" 
        :key="nav.name"
        class="nav-item">
        <RouterLink 
          v-bind:to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>    
      </div>
    </div>
    <div class="user"
      @click="toAbout">
      <img 
        :src="image" 
        :alt="name">
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
import Logo from '~/components/Logo'
export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          // href:'/movie/'
          href: '/movie/tt4520988',
          path: /^\/movie/  //'/movie'로 시작하는 표현식을 일치시키기 위해
        },
        {
          name: 'About',
          href: '/about'
        },                
      ]
    }
  },
  computed: {
    // ...: 전개연산자 : mapState() 결과가 반환되고 반환된 결과가 객체데이터내에서 등록되도록
    ...mapState('about', [
      'image',
      'name'
    ]),
    //mapState 정의(...:전개연산자)
    // ...mapState('movie', [
    //   'movies',
    //   'loading',
    //   'message',
    //   'theMovie'
    // ])
    // vuex helper사용으로 단순화 
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // }
  },
  methods: {
    isMatch(path) {

      // // mapState 사용
      // this.image
      // this.name
      // this.movies
      // this.loading

      if(!path) return false
      console.log("1",this.route)
      console.log("2", this.route)
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      console.log('!!!')
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "~/scss/main";
header {
  height: 70px;
  padding: 0 40px;
  display:  flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width:  40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top:0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }    
  }
  // 반응형
  @include media-breakpoint-down(sm) { 
    .nav {
      display: none;
    }
  }
}
</style>