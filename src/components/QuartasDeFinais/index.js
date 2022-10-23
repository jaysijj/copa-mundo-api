import './QuartasDeFinais.css'

const QuartasDeFinais = ({ quartasDeFinais, selecaoSemiFinais }) => {
  return (
    <div>
      <h1>Selecionados - Quartas de Finais</h1>
      <div className="timesClassificadorFather">
        {quartasDeFinais.map((times, index) => (
          <div className="timesClassificados" key={index}>
            <div>{times.Name}</div>
          </div>
        ))}
      </div>
      <h1>Quartas de Finais</h1>
      <div className="timesClassificadorFather">
        {selecaoSemiFinais.map((times, index) => (
          <div className="timesClassificados" key={index}>
            <div>
              [{times[0].Gols}] {times[0].Name}
            </div>
            VS
            <div>
              [{times[1].Gols}] {times[1].Name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuartasDeFinais
