import './JogosIniciais.css'

const JogosIniciais = ({ jogosIniciais, oitavasDeFinais }) => {
  return (
    <div className="oitavaDeFinais">
      <h1>Fase de grupos</h1>
      <div className="blocoOitavas_father">
        {jogosIniciais.map((valor, index) => (
          <div className="blocoOitavas" key={index}>
            {valor.map((times, index) => (
              <div key={index} className="cadaTime">
                <h2>{times.Name}</h2>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="partidasGrupos">
        {oitavasDeFinais.map((valor, index) => (
          <div className="grupos" key={index}>
            <h2>{valor[0][0].Grupo}</h2>
            {valor.map((partidas, index) => (
              <div className="grupos2" key={index}>
                {partidas.map((partidas2, index) => (
                  <div key={index}>
                    <div key={index}>
                      {partidas2.equipeA} [{partidas2.golsEquipeA}] vs [
                      {partidas2.golsEquipeB}] {partidas2.equipeB}
                      <br></br>
                      Equipe vencedora
                      {partidas2.golsEquipeA >= partidas2.golsEquipeB
                        ? partidas2.equipeA
                        : partidas2.equipeB}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default JogosIniciais
