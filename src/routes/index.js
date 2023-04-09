import { createRouter, createWebHashHistory } from "vue-router";
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter ({ 
  //Hash, History mode 중 선택
  //1. Hash mode : /#/ 사용
  //https://google.com/#/search/
  //2. History mode : server에서 setting해주어야 함
  history: createWebHashHistory(), //Hash mode
  // scroll위치 복구
  scrollBehavior() {
    return { top:0 }
  },
  //pages구분
  //https://google.com/ => main page  
  routes: [
    {
      path: '/', //main page : https://google.com/ 
      component: Home
    },
    {
      // path: '/movie/tt123762',
      path: '/movie/:id',
      component: Movie //main page : https://google.com/Movie 
    },
    {
      path: '/about',  ///https://google.com/about
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})