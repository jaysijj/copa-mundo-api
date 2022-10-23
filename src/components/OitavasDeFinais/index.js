import './OitavasDeFinais.css'

const OitavasDeFinais = ({ oitavasDeFinaisPontos, selecaoQuartasDeFinais }) => {
  return (
    <div>
      <h1>Times selecionados para oitavas de final de cada grupo</h1>

      <div className="timesClassificadorFather">
        {oitavasDeFinaisPontos.map((timesPontuacao, index) => (
          <div className="timesClassificados" key={index}>
            <h2>{timesPontuacao[0].Grupo}</h2>
            <div>
              {timesPontuacao[2].Name} - {timesPontuacao[2].Pontos}
            </div>
            <div>
              {timesPontuacao[3].Name} - {timesPontuacao[3].Pontos}
            </div>
          </div>
        ))}
      </div>
      <h1>Oitavas de Final</h1>
      <div className="timesClassificadorFather">
        {selecaoQuartasDeFinais.map((times,index) => (
          <div className="timesClassificados" key={index}>
            <div>
              [{times[0].Gols}] {times[0].Name} - {times[0].Grupo}
            </div>
            VS
            <div>
              [{times[1].Gols}] {times[1].Name} - {times[1].Grupo}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OitavasDeFinais
