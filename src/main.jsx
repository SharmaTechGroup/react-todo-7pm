import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { CookiesProvider } from 'react-cookie'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <CookiesProvider>
          <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
          </Provider>
     </CookiesProvider>
  </StrictMode>,
)
