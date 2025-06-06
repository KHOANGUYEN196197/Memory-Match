import { Route, Routes } from 'react-router-dom';
import Game from './pages/game/Game';

export default function App() {
  return(
    <Routes>
      <Route path="/" element={<Game />} />
    </Routes>
  )
}
