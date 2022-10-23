import './SemiFinal.css'

const SemiFinal = ({ selecionadosSemiFinal, semiFinal }) => {
  return (
    <div>
      <h1>Classificado para a final</h1>
      <div className="timesClassificadorFather">
        {selecionadosSemiFinal.map((partidas, index) => (
          <div key={index}>
            <div className="timesClassificados">
              <div>{partidas.Name}</div>
            </div>
          </div>
        ))}
      </div>
      <h1>SemiFinal</h1>
      <div className="timesClassificadorFather">
        {semiFinal.map((partidas, index) => (
          <div key={index}>
            <div className="timesClassificados">
              <div>
                {partidas[0].Name} [{partidas[0].Gols}]
              </div>
            </div>
            <h4>VS</h4>
            <div className="timesClassificados">
              <div>
                {partidas[1].Name} [{partidas[1].Gols}]
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SemiFinal
