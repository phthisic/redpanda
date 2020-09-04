import React, { Component } from 'react'
import { render } from '@testing-library/react'

import './index.css'

import App from './App'

render(
    <App />,
    document.getElementById('root')
)