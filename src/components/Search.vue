<template>
  <div class="container">
    <input 
      v-model="title"
      class = "form-control"
      type="text"
      placeholder="Search for Movies, Series & more" 
      @keyup.enter="apply" />
      <div class="selects">
        <select 
          v-for="filter in filters"
          v-model="$data[filter.name]"
          :key="filter.name"
          class="form-select">
          <option
            v-if="filter.name === 'year'"
            value="">
            All Years
          </option>
          <option 
            v-for="item in filter.items"
            :key="item">
            {{ item }}
          </option>
        </select>
      </div>
      <button 
        class="btn btn-primary"
        @click="apply">
        Apply
      </button>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30] //number값이 10, 20, 30의 값을 가질 수 있음
        },
        {
          name: 'year',
          items: (()=>{
            const years = []
            const thisYear = new Date().getFullYear() //2022
            for (let i= thisYear; i >=1985; i -= 1) {
              years.push(i)
            }
            return years
          })()
        }
      ]  
    }
  },
  methods: {
    async apply() {
      // movie.js로 옮김 잘라내기
      // //Search movies...
      // const OMDB_API_KEY = '5a7930a2' //key 발급
      // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&t=${this.type}&y=${this.year}&page=1`)
      // console.log(res)

      // Store의 Mutation을 실행할 때는 .commit()메서드를 사용
      //         Actions를 실행할 때는 .dispatch()메서드를 사용
      console.log("Search.veu apply()");  
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "~/scss/main";
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0; //감소방지
  }
  //반응형
  @include media-breakpoint-down(lg) { 
    display: block;
    input{
      margin-right: 0;
      margin-bottom: 10px;
    }  
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;  
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>