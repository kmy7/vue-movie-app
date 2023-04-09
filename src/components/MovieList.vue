<template>
  <div class="container">
    <div 
      :class="{'no-result': !movies.length}"
      class="inner">
      <!-- <div 
        v-if="loading"
        class="spinner-border text-primary"></div> -->
      <Loader v-if="loading"></Loader>        
      <div  
        v-if="message"
        class="message">
        {{ message}}    
      </div>        
      <div 
        v-else
        class="movies">
        <MovieItem v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'


export default {
  components: {
    MovieItem,
    Loader
  }, 
  computed: {
    // ...: 전개연산자 : mapState() 결과가 반환되고 반환된 결과가 객체데이터내에서 등록되도록
    ...mapState('movie', [
        'movies',
        'message',
        'loading'
    ])
    // movies() {
    //   return this.$store.state.movie.movies
    // },
    // message(){
    //   return this.$store.state.movie.message
    // },
    // loading() {
    //   return this.$store.state.movie.message
    // }
  }
}
</script>

<style lang="scss" scoped>
// @import "~/scss/main";

.container {
  margin-top: 30px;
 .inner {
  background-color: $gray-100; 
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  &.no-result {
    padding: 70px 0;
  }
 }
 .message {
  color: $gray-400;
  font-size: 20px;
 } 
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}  
</style>

