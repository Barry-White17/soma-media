import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import mediaRoutes from './routes/media.routes.js'

// modules for server side rendering
//end

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//comment out before building for production

// parse body params and attache them to req.body

app.use((req, res, next) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    next()
})
app.use(
    cors({
        origin: 'https://soma-media-frontend.vercel.app',
        credentials: true,
    }),
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    }),
)
// enable CORS - Cross Origin Resource Sharing

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', mediaRoutes)

/*
app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets()
  const context = {}

   loadBranchData(req.url).then(data => {
       const markup = ReactDOMServer.renderToString(
        sheets.collect(
         <StaticRouter location={req.url} context={context}>
             <ThemeProvider theme={theme}>
                  <MainRouter data={data}/>
             </ThemeProvider>
          </StaticRouter>
        )
      )
       if (context.url) {
        return res.redirect(303, context.url)
       }
       const css = sheets.toString()
       res.status(200).send(Template({
          markup: markup,
          css: css
       }))
   }).catch(err => {
      res.status(500).send({"error": "Could not load React view with data"})
  })
})
*/

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.name + ': ' + err.message })
    } else if (err) {
        res.status(400).json({ error: err.name + ': ' + err.message })
        console.log(err)
    }
})

export default app
