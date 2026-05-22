import app from './app.js'

const PORT = Number(process.env.PORT) || 3001

app.listen(PORT, () => {
  console.log(`API Fabeon HubAcademy — SQLite sur http://localhost:${PORT}`)
})
