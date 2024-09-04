import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewGame from './pages/NewGame/NewGame.jsx'
import GameCreator from './pages/GameCreator/GameCreator.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <NewGame />,
  },
  {
    path: '/game-creator',
    element: <GameCreator />,
  },
  {
    path: '/game',
    element: <App />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
