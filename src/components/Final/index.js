import './Final.css'

const Final = ({ selecionadosFinal, final }) => {
  return (
    <div>
      <h1>Final</h1>
      <div className="timesClassificadorFather">
        {final.map((valor, index) => (
          <div className="TMM" key={index}>
            <div className="timesClassificados">
              {valor.NameA} [{valor.GolsEquipeA}]
            </div>
            <h3>VS</h3>
            <div className="timesClassificados">
              [{valor.GolsEquipeB}] {valor.NameB}
            </div>
          </div>
        ))}
      </div>
      <h1>Campeão</h1>
      <div className="timesClassificadorFather">
        <div className="timesClassificados campeao">
          {final.map((partida, index) =>
            partida.GolsEquipeA > final.GolsEquipeB
              ? partida.NameA
              : partida.NameB
          )}
        </div>
      </div>
    </div>
  )
}

export default Final
