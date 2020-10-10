import axios from 'axios'
import React from 'react'

export const axiosWithAuth = () => {

  const token = localStorage.getItem("token")

  return axios.create({
    headers: {
      authorization: token
    },
    baseURL: `http://localhost:5000`
  })

}