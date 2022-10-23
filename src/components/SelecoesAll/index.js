import './SelecoesAll.css'

const SelecoesAll = ({ selecoes }) => {
  return (
    <div>
      <h1>Todos os times</h1>
      <div className="timesClassificadorFather">
        {selecoes.map((valor, index) => (
          <div key={index} className="timesClassificados">
            <h2>{valor.Name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelecoesAll
