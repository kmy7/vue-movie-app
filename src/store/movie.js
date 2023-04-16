// 영화검색
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

//  _xxx : 지역변수 => 반복적 사용하는 경우
const _defautMessage = 'Search for the movie title!'

export default {
  // module: 모듈화되어 사용됨을 명시적으로 나타냄
  namespaced: true,
  // data!
  state: () => ( {
    movies: [],
    // message: 'Search for the movie title!',
    message: _defautMessage,
    loading: false , 
    theMovie: {}   //빈객체추가 
  }),
  // computed! (계산된 상태)
  getters: {},
  // methods
  // 변이 : data수정을 여기서만 가능하도록 해줌 (데이다불일치 막음)
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key] //state.movies = payload.movies
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defautMessage
      state.loading = false
    }
  },
  // 비동기 함수로 처리 
  actions: {
    async searchMovies({ state, commit }, payload) {
      // 동시 여러번 출력을 막아줌
      if(state.loading) return
      commit('updateState', {
        message:'',
        loading: true
      })
      try {
        // const {title, type, number, year} = payload

      //components/search.vue에서 잘라내기 해옴 
      //Search movies...
      const OMDB_API_KEY = '5a7930a2' //key 발급  //f4547589abc
      // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&t=${type}&y=${year}&page=1`)
      // _fetchMovie(payload) 지역함수로 변경
      const res = await _fetchMovie({
        ...payload,
        page: 1
      })      
      // console.log(res)
      const {Search, totalResults} = res.data
        commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })
      console.log(totalResults) //totalResults : 문자 ,  268개 검색(문자) => 27page
      console.log(typeof totalResults)

      const total = parseInt(totalResults, 10)  
      const pageLength = Math.ceil(total / 10) //올림처리 => 27

      //추가요청 전송
      if(pageLength > 1){
        for(let page=2; page <= pageLength; page +=1 ){
          if(page > (payload.number / 10)) break //number : 10, 20, 30 중 선택되므로 3
          // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&t=${type}&y=${year}&page=${page}`)
          // _fetchMovie(payload) 지역함수로 변경
          const res = await _fetchMovie({
            ...payload,
            page
          })

          const{ Search } = res.data
          commit('updateState', {
            movies: [
                      ...state.movies, 
                      ..._uniqBy(Search, 'imdbID')
                    ] //... : 전개연산자
          })
        }
      }
      // } catch (message) {
      //   commit('updateState', {
      //     movies: [],
      //     message
      //   })
      // }
      // serverless API변경으로 수정     
      // } catch (error) {
      //   commit('updateState', {
      //   movies: [],
      //   message: error.message
      //   })
      // }
      // serverless API변경으로 수정      
      } catch ({ message }) {
        commit('updateState', {
        movies: [],
        message
        })
      }       
      finally{
        commit('updateState', {
          loading: false
        })
      }
    },
    // async searchMovieWithId(context, payload){
    //   // const {id} = payload
    //   if(context, state, loading) return

    //   context.commit('updateState', {
    //     loading : true
    //   })
    // =>  구조분해
    async searchMovieWithId({state, commit}, payload){
      // const {id} = payload
      if(state.loading) return
      //
      commit('updateState', {
        theMovie: {},
        loading : true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
        console.log(res)
      }catch(error){
        commit('updateState', {
          theMovie: {}
        })
        //  
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

// __fetchMovie(): searchMovies()함수내에서만 활용되로록 지역함수 선언
/*
function _fetchMovie(payload) {
  const {title, type, number, year, page, id} = payload
  const OMDB_API_KEY = '5a7930a2' //key 발급  //f4547589abc
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&t=${type}&y=${year}&page=1`
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  return new Promise((resolve, reject) => {
    axios.get(url)
    .then(res => {
      // console.log(res)
      if(res.data.Error){
        reject(res.data.Error)
      }
      resolve(res)
    })
    .catch(err => {
      reject(err.message)
    })
  })
}
*/

// __fetchMovie(): serveless API에서 가져오도록 변경
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}