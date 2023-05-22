import axios from 'axios'
//创建一个axios实体，把get和post公用的参数放在此处
// 当我们需要用到不同的后端域名，或是共同参数的情况，直接调用axios.get并不太方便。
// 我们可以用创建实例的方式去调用，不同的域名用不同的实例一一对应

const instance = axios.create({
    //有了baseURL调用的时候就不用输入很长的url，会自动进行拼接
    baseURL: 'http://129.204.116.48:3000/mock/ae8e9031947a302fed5f92425995aa19/jd',
    timeout: 10000
})
export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        //这里变为instance.post
        instance.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
};

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        instance.get(url, { params }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}