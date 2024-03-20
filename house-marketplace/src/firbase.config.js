/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAeHXiDv3PfRjgzDaPUZlSCZvM0nV-TGgs',
  authDomain: 'havenhomes-cd597.firebaseapp.com',
  projectId: 'havenhomes-cd597',
  storageBucket: 'havenhomes-cd597.appspot.com',
  messagingSenderId: '831155485899',
  appId: '1:831155485899:web:cf67bcce89374c90642f4e',
  measurementId: 'G-VTNFS0HTHJ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
