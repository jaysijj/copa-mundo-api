import { useEffect, useState } from 'react'
import { getSelecoes, postSelecoes } from './api'
import './App.css'
import JogosIniciais from './components/JogosIniciais'
import SelecoesAll from './components/SelecoesAll'
import OitavasDeFinais from './components/OitavasDeFinais'
import QuartasDeFinais from './components/QuartasDeFinais'
import SemiFinal from './components/SemiFinal'
import Final from './components/Final'

function App() {
  const [selecoes, setSelecoes] = useState([])
  const [jogosIniciais, setJogosIniciais] = useState([])
  const [selecaoOitavasDeFinais, setSelecaoOitavasDeFinais] = useState([])
  var pontTimes = []
  const [oitavasDeFinaisPontos, setOitavasDeFinaisPontos] = useState([])
  const [selecaoQuartasDeFinais, setSelecaoQuartasDeFinais] = useState([])
  const [quartasDeFinais, setQuartasDeFinais] = useState([])
  const [selecaoSemiFinais, setSelecaoSemiFinais] = useState([])
  const [selecionadosSemiFinal, setSelecionadosSemiFinal] = useState([])
  const [semiFinal, setSemiFinal] = useState([])
  const [selecionadosFinal, setSelecionadosFinal] = useState([])
  const [final, setFinal] = useState([])
  const [finalEntrega, setFinalEntrega] = useState([])

  const fetchSelecoes = async () => {
    const data = await getSelecoes()
    setSelecoes(data.Result)
  }

  useEffect(() => {
    fetchSelecoes()
  }, [])

  useEffect(() => {
    const todosTimes = async () => {
      const times = [...selecoes]
      let jogosIniciaisTemp = []
      for (let i = 0; i <= selecoes.length - 1; i += 4) {
        jogosIniciaisTemp.push(times.slice(0, 4))
        times.splice(0, 4)
      }
      setJogosIniciais(jogosIniciaisTemp)
    }
    todosTimes()
  }, [selecoes])

  function permutacao(array, grupo) {
    let grupoOitavas = []
    let grupoTemp = []
    var pontTimesTemp = []

    function pontuacao(time, pont, gols, Token) {
      let Adiciona = true
      pontTimesTemp.forEach(PontTime => {
        if (PontTime.Name === time) {
          PontTime.Pontos += pont
          PontTime.Gols += gols
          Adiciona = false
        }
      })
      if (Adiciona === true || pontTimesTemp.length === 0) {
        pontTimesTemp.push({
          Name: time,
          Token: Token,
          Pontos: pont,
          Gols: gols,
          Grupo: grupo
        })
      }
    }

    for (let i = 0; i < array.length; i++) {
      for (let x = i + 1; x < array.length; x++) {
        let placarTime1 = Math.round(Math.random() * 5)
        let placarTime2 = Math.round(Math.random() * 5)
        if (placarTime1 > placarTime2) {
          pontuacao(array[i].Name, 3, placarTime1, array[i].Token)
          pontuacao(array[x].Name, 0, placarTime2, array[x].Token)
        } else if (placarTime2 === placarTime1) {
          pontuacao(array[i].Name, 1, placarTime1, array[i].Token)
          pontuacao(array[x].Name, 1, placarTime2, array[x].Token)
        } else {
          pontuacao(array[x].Name, 3, placarTime2, array[x].Token)
          pontuacao(array[i].Name, 0, placarTime1, array[i].Token)
        }
        grupoTemp.push({
          equipeA: `${array[i].Name}`,
          equipeB: `${array[x].Name}`,
          golsEquipeA: `${placarTime1}`,
          golsEquipeB: `${placarTime2}`,
          Grupo: grupo
        })
        grupoOitavas.push([...grupoTemp])
        grupoTemp.length = 0
      }
    }
    pontTimes.push(pontTimesTemp)


    return [...grupoOitavas]
  }
  useEffect(() => {
    const partidas = async () => {
      let OitavasTotal = []
      const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
      for (let grupo = 0; grupo < jogosIniciais.length; grupo++) {
        const promises = permutacao([...jogosIniciais[grupo]], grupos[grupo])
        OitavasTotal.push([...promises])
        setSelecaoOitavasDeFinais(OitavasTotal)
      }

      for (let i = 0; i < pontTimes.length; i++) {
        pontTimes[i].sort(function (a, b) {
          return a.Pontos - b.Pontos
        })
        pontTimes[i].sort(function (a, b) {
          if (a.Pontos - b.Pontos === 0) {
            return a.Gols - b.Gols
          }
        })
      }
      setOitavasDeFinaisPontos([...pontTimes])
    }
    partidas()
  }, [jogosIniciais])

  useEffect(() => {
    const partidas = async () => {}
    let OitavasDefinaisTemp = []
    let OitavasDefinais = []
    for (let i = 0; i < oitavasDeFinaisPontos.length - 1; i += 2) {
      let placarTime1 = Math.round(Math.random() * 5)
      let placarTime2 = Math.round(Math.random() * 5)
      if (placarTime1 !== placarTime2) {
        OitavasDefinaisTemp.push({
          Name: oitavasDeFinaisPontos[i][3].Name,
          Token: oitavasDeFinaisPontos[i][3].Token,
          Grupo: oitavasDeFinaisPontos[i][3].Grupo,
          Gols: placarTime1
        })
        OitavasDefinaisTemp.push({
          Name: oitavasDeFinaisPontos[i + 1][2].Name,
          Token: oitavasDeFinaisPontos[i + 1][2].Token,
          Grupo: oitavasDeFinaisPontos[i + 1][2].Grupo,
          Gols: placarTime2
        })
      } else {
        let placarTime1Penalty = Math.round(Math.random() * 5)
        let placarTime2Penalty = Math.round(Math.random() * 5)
        OitavasDefinaisTemp.push({
          Name: oitavasDeFinaisPontos[i][3].Name,
          Token: oitavasDeFinaisPontos[i][3].Token,
          Grupo: oitavasDeFinaisPontos[i][3].Grupo,
          Gols: placarTime1,
          GolsPenalty: placarTime1Penalty
        })
        OitavasDefinaisTemp.push({
          Name: oitavasDeFinaisPontos[i + 1][2].Name,
          Token: oitavasDeFinaisPontos[i + 1][2].Token,
          Grupo: oitavasDeFinaisPontos[i + 1][2].Grupo,
          Gols: placarTime2,
          GolsPenalty: placarTime2Penalty
        })
      }

      OitavasDefinais.push([...OitavasDefinaisTemp])
      OitavasDefinaisTemp.length = 0
    }
    for (let i = 0; i < oitavasDeFinaisPontos.length - 1; i += 2) {
      let placarTime1 = Math.round(Math.random() * 5)
      let placarTime2 = Math.round(Math.random() * 5)
      if (placarTime1 !== placarTime2) {
        OitavasDefinaisTemp.push({
          Name: oitavasDeFinaisPontos[i + 1][3].Name,
          Token: oitavasDeFinaisPontos[i + 1][3].Token,
          Grupo: oitavasDeFinaisPontos[i + 1][3].Grupo,
          Gols: placarTime1
        })
        OitavasDefinaisTemp.push({
          Name: oitavasDeFinaisPontos[i][2].Name,
          Token: oitavasDeFinaisPontos[i][2].Token,
          Grupo: oitavasDeFinaisPontos[i][2].Grupo,
          Gols: placarTime2
        })
      } else {
        let placarTime1Penalty = 0
        let placarTime2Penalty = 0
        for (let i = 0; i < 5; i++) {
          placarTime1Penalty += Math.round(Math.random())
          placarTime2Penalty += Math.round(Math.random())
        }
        if (placarTime1Penalty === placarTime2Penalty) {
          while (placarTime1Penalty === placarTime2Penalty) {
            placarTime1Penalty += Math.round(Math.random())
            placarTime2Penalty += Math.round(Math.random())
          }
        }
        OitavasDefinaisTemp.push({
          Name: oitavasDeFinaisPontos[i + 1][3].Name,
          Token: oitavasDeFinaisPontos[i + 1][3].Token,
          Grupo: oitavasDeFinaisPontos[i + 1][3].Grupo,
          Gols: placarTime1,
          GolsPenalty: placarTime1Penalty
        })
        OitavasDefinaisTemp.push({
          Name: oitavasDeFinaisPontos[i][2].Name,
          Token: oitavasDeFinaisPontos[i][2].Token,
          Grupo: oitavasDeFinaisPontos[i][2].Grupo,
          Gols: placarTime2,
          GolsPenalty: placarTime2Penalty
        })
      }

      OitavasDefinais.push([...OitavasDefinaisTemp])
      OitavasDefinaisTemp.length = 0
    }
    setSelecaoQuartasDeFinais([...OitavasDefinais])
    partidas()
  }, [oitavasDeFinaisPontos])

  const CalcGols = async (partidas, SelecionadoTemp) => {
    if (partidas[0].Gols > partidas[1].Gols) {
      SelecionadoTemp.push({
        Name: partidas[0].Name,
        Token: partidas[0].Token
      })
    } else if (partidas[0].Gols < partidas[1].Gols) {
      SelecionadoTemp.push({
        Name: partidas[1].Name,
        Token: partidas[1].Token
      })
    } else {
      if (partidas[0].GolsPenalty >= partidas[1].GolsPenalty) {
        SelecionadoTemp.push({
          Name: partidas[0].Name,
          Token: partidas[0].Token
        })
      } else {
        SelecionadoTemp.push({
          Name: partidas[1].Name,
          Token: partidas[1].Token
        })
      }
    }
  }
  const CalcGolsPenalty = async (partidas, Selecionado) => {
    let SelecionadoTemp = []
    for (let i = 0; i < partidas.length; i += 2) {
      let placarTime1 = Math.round(Math.random() * 5)
      let placarTime2 = Math.round(Math.random() * 5)
      if (placarTime1 !== placarTime2) {
        SelecionadoTemp.push({
          Name: partidas[i].Name,
          Token: partidas[i].Token,
          Gols: placarTime1
        })
        SelecionadoTemp.push({
          Name: partidas[i + 1].Name,
          Token: partidas[i + 1].Token,
          Gols: placarTime2
        })
      } else {
        let placarTime1Penalty = 0
        let placarTime2Penalty = 0
        for (let i = 0; i < 5; i++) {
          placarTime1Penalty += Math.round(Math.random())
          placarTime2Penalty += Math.round(Math.random())
        }
        if (placarTime1Penalty === placarTime2Penalty) {
          while (placarTime1Penalty === placarTime2Penalty) {
            placarTime1Penalty += Math.round(Math.random())
            placarTime2Penalty += Math.round(Math.random())
          }
        }
        SelecionadoTemp.push({
          Name: partidas[i].Name,
          Token: partidas[i].Token,
          Gols: placarTime1,
          GolsPenalty: placarTime1Penalty
        })
        SelecionadoTemp.push({
          Name: partidas[i + 1].Name,
          Token: partidas[i + 1].Token,
          Gols: placarTime2,
          GolsPenalty: placarTime2Penalty
        })
      }
      Selecionado.push([...SelecionadoTemp])
      SelecionadoTemp.length = 0
    }
  }

  useEffect(() => {
    const partidas = async () => {
      let QuartasDeFinaisTemp = []
      for (let i = 0; i < selecaoQuartasDeFinais.length; i++) {
        CalcGols(selecaoQuartasDeFinais[i], QuartasDeFinaisTemp)
      }
      setQuartasDeFinais(QuartasDeFinaisTemp)
    }
    partidas()
  }, [selecaoQuartasDeFinais])

  useEffect(() => {
    const partidas = async () => {
      let selecaoSemiFinal = []
      CalcGolsPenalty(quartasDeFinais, selecaoSemiFinal)
      setSelecaoSemiFinais(selecaoSemiFinal)
    }
    partidas()
  }, [quartasDeFinais])

  useEffect(() => {
    const partidas = async () => {
      let SelecionadosSemiFinal = []
      let SemiFinal = []
      for (let i = 0; i < selecaoSemiFinais.length; i++) {
        CalcGols(selecaoSemiFinais[i], SelecionadosSemiFinal)
      }
      setSelecionadosSemiFinal(SelecionadosSemiFinal)
      CalcGolsPenalty(SelecionadosSemiFinal, SemiFinal)
      setSemiFinal(SemiFinal)
    }
    partidas()
  }, [selecaoSemiFinais])

  useEffect(() => {
    const partidas = async () => {
      let SelecionadosFinal = []
      let FinalTemp = []
      let Final = []
      for (let i = 0; i < semiFinal.length; i++) {
        CalcGols(semiFinal[i], SelecionadosFinal)
      }
      setSelecionadosFinal([...SelecionadosFinal])
      CalcGolsPenalty(SelecionadosFinal, FinalTemp)
      if (FinalTemp[0][0].Gols !== FinalTemp[0][1].Gols) {
        Final.push({
          NameA: FinalTemp[0][0].Name,
          NameB: FinalTemp[0][1].Name,
          EquipeA: FinalTemp[0][0].Token,
          EquipeB: FinalTemp[0][1].Token,
          GolsEquipeA: FinalTemp[0][0].Gols,
          GolsEquipeB: FinalTemp[0][1].Gols,
          GolsPenaltyEquipeA: 0,
          GolsPenaltyEquipeB: 0
        })
      } else {
        Final.push({
          NameA: FinalTemp[0][0].Name,
          NameB: FinalTemp[0][1].Name,
          EquipeA: FinalTemp[0][0].Token,
          EquipeB: FinalTemp[0][1].Token,
          GolsEquipeA: FinalTemp[0][0].Gols,
          GolsEquipeB: FinalTemp[0][1].Gols,
          GolsPenaltyEquipeA: FinalTemp[0][0].GolsPenalty,
          GolsPenaltyEquipeB: FinalTemp[0][1].GolsPenalty
        })
      }
      setFinal([...Final])
      let FinalPost = []
      FinalPost.push({
        "equipeA": final[0].EquipeA,
        "equipeB": final[0].EquipeB,
        "golsEquipeA": final[0].GolsEquipeA,
        "golsEquipeB": final[0].GolsEquipeB,
        "golsPenaltyTimeA": final[0].GolsPenaltyEquipeA,
        "golsPenaltyTimeB": final[0].GolsPenaltyEquipeB
      })
      const ResultadoFinal = await postSelecoes(FinalPost)
      setFinalEntrega(ResultadoFinal)

    }
    partidas()
  }, [semiFinal])

  return (
    <div className="App">
      <h1>Created by: Jaime Jaysi</h1>
      <SelecoesAll selecoes={selecoes} />
      <JogosIniciais
        jogosIniciais={jogosIniciais}
        oitavasDeFinais={selecaoOitavasDeFinais}
      />
      <OitavasDeFinais
        oitavasDeFinaisPontos={oitavasDeFinaisPontos}
        selecaoQuartasDeFinais={selecaoQuartasDeFinais}
      />
      <QuartasDeFinais
        quartasDeFinais={quartasDeFinais}
        selecaoSemiFinais={selecaoSemiFinais}
      />
      <SemiFinal
        selecionadosSemiFinal={selecionadosSemiFinal}
        semiFinal={semiFinal}
      />
      <Final selecionadosFinal={selecionadosFinal} final={final} />
    </div>
  )
}

export default App
