import  express from "express"
import { AppDataSource } from "./data-source"
import cors from "cors"
import routes from "./routes"

const PORT  = 3000
AppDataSource.initialize().then(async () => {
    // create express app
    const app = express()
    app.use(cors())
    app.use(express.json())
    //routes
    app.use('/',routes)
    // start express server
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
    })

}).catch(error => console.log(error))
