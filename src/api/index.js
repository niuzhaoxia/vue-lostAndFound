import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
// 在这里统一拦截结果 把结果处理成res.data
axios.interceptors.response.use((res) => {
  return res.data
})
// 格式化请求主体
// axios.defaults.transformRequest = data => {
//   let str = ``
//   if (data && typeof data === 'object') {
//     for (let key in data) {
//       if (data.hasOwnProperty(key)) {
//         str += `${key}=${data[key]}$`
//       }
//     }
//     data = str.substring(0, str.length - 1)
//   }
//   return data
// }

export let getLoginInterface = (data1, data2) => {
  return axios.post('/login', {
    studentId: data1, password: data2
  })
}
export let resgistInterface = (sid, cid, pwd) => {
  return axios.post('/register', {
    studentId: sid, classId: cid, password: pwd
  })
}
export let updateUserInfoInterface = (id, data) => {
  return axios.put(`/updateUserInfo?id=${id}`, data)
}
export let isUserLoginOnAPI = () => {
  return axios.get('/isUserLoginOn')
}
export let getDynamicsInterface = () => {
  return axios.get('/publish')
}
export let getCurUserInfoAPI = () => {
  return axios.get('/curUserInfo')
}
export let getUpLoadAPI = (data) => {
  return axios.post('/upload/post', data)
}
export let staLetterInterface = () => {
  return axios.get('/statisticsLetter')
}
export let getLettersInterface = () => {
  return axios.get('/getLetters')
}
export let getGoodsDetailAPI = (gid) => {
  return axios.get(`/goodsDetail?gid=${gid}`)
}
export let getReportedUserAPI = () => {
  return axios.get('/reportedUser')
}
export let getImageCode = (cd) => {
  return axios.get(`http://www.7xiwang.com/WebService/ImageValidateCode?code=${cd}`)
}
export let getHotSearchAPI = () => {
  return axios.get('/hotSearch')
}
export let getMyDmynamicsAPI = (uid) => {
  return axios.get(`/mypublish?uid=${uid}`)
}
