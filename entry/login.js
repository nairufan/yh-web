import '../node_modules/babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import Login from '../components/login/Index'

render(
  <Login/>,
  document.getElementById('content')
)
