import express  from "express";
import ProducRouter from "./Routes/productsRouter.js"
import CartRouter from "./Routes/cartRouter.js"


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/api', (req,res)=>{
    res.send("Se ingresó")
})

app.use("/api/products", ProducRouter)
app.use("/api/carts", CartRouter)

const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`Servidor activo en http://localhost:${PORT}`)
})