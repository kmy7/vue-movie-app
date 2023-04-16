const axios = require('axios') //'axios'함수를 node js 환경에서는 require를 통해 axios로 가져옴.(API는 js import 사용못함)
// const  OMDB_API_KEY = process.env.OMDB_API_KEY
const  {OMDB_API_KEY} = process.env

exports.handler = async function(event) {
  console.log(event)
  const payload = JSON.parse(event.body)  // JSON형태로 변환
  const {title, type, year, page, id} = payload
  
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&t=${type}&y=${year}&page=1`
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  // node js 환경으로 돌아가도록 변경 
  try {
    const { data } = await axios.get(url)
    if(data.Error) {
      return {
        statusCode : 400,
        body: data.Error
      }
    }
    return {
      statusCode : 200,
      body : JSON.stringify(data) //JSON 객체 => 문자열 변환
    }
  } catch(error) {
    return {
      statusCode: errror.response.status,
      body: error.message
    }
  }

/* serverless 환경에서는 js모들의  return new Promise객체가 동작하지 않음
   => node js 환경에서 동작하도록 exports 형태로 변환 
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
*/
}