import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import en_US from 'antd/locale/en_US'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider locale={en_US}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
