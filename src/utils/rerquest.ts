import { config } from "./config"
import { getToken } from "./common"

export default function request({ method, url, options = {} }: RequestOptions) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.apiUrl}${url}`,
      method: method,
      data: method === "GET" ? options : JSON.stringify(options),
      header: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": getToken()
      },
      success(response: SuccessOptions) {
        if (response.statusCode === 200) {
          if (response.data.code === 0) {
            resolve(response.data)
          } else {
            wx.showToast({
              title: response.data.msg,
              icon: "none",
              duration: 2000
            })
            reject(response.data)
          }
        } else {
          wx.showToast({
            title: "网络问题,请稍后再试~",
            icon: "none",
            duration: 2000
          })
          reject(response.data)
        }
      },
      fail(err) {
        wx.showToast({
          title: "网络问题,请稍后再试~",
          icon: "none",
          duration: 2000
        })
        reject(err)
      }
    })
  })
}