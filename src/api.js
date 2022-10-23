export const getSelecoes = async () => {
  const times = fetch(
    'https://estagio.geopostenergy.com/WorldCup/GetAllTeams',
    {
      method: 'GET',
      headers: { 'git-user': 'jaysijj' }
    }
  ).then(resp => resp.json())
  return times
}

export const postSelecoes = async data => {
  let _data = data[0]
  const times = fetch(
    'https://estagio.geopostenergy.com/WorldCup/InsertFinalResult',
    {
      method: 'POST',
      body: JSON.stringify(_data),
      headers: { 
        'Content-Type':"application/json",
        'git-user': 'jaysijj' }
    }
  )
    .then(resp => resp.json())
    .then(json => console.log(json))
  return times
}
