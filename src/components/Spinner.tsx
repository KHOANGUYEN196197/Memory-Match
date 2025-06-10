import pokeball from '../assets/pokeball-icon.png';
function Spinner() {

  return (
    <>
     <img id="current-pokemon-loading" src={pokeball} className="loading-ball"/>
    </>
  )
}
export default Spinner;