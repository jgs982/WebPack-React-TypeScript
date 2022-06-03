const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    
    context: path.resolve(__dirname, './src'),

    //! Para que nos reconozca las extensiones del punto de entrada
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },

    //! Definimos los puntos de entrada 
    entry: {
        app: './index.tsx'      
    },

    //! Creamos una salida 
    output: {
        filename: '[name].[chunkhash].js',          // Nombre de nuestro entry point y un hash aleatorio
        path: path.resolve(__dirname, 'dist')       // Carpeta de salida de nuestro bundle
    },

    module: {

        //! Definimos los loaders aquí, esa herramienta que procesan fichero a fichero y realizan transformaciones
        rules: [

            //! Pasarle Babel para transpilar de ES6 -> ES5
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            //! Soporte para SASS
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,

                    //! Uso de CSS Modules
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                exportLocalsConvention: 'camelCase',
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                localIdentContext: path.resolve(__dirname, 'src'),
                            }
                        }
                    },

                    'sass-loader'
                ]
            },

            //! Uso e inyección de estilos
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'                    
                ]
            },

            //! Cargar Imágenes
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            },

            //! Busca referencias dentro del HTML (ej. imagenes en HTML)
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },

    //! Uso de Plugins en Webpack
    plugins: [

        //! Generar el index.html en la carpeta dist
        new HtmlWebpackPlugin({
            filename: 'index.html',             // Nombre del fichero que se generará en ./dist
            template: './index.html',           // Nombre del fichero que se utilizará como plantilla para generarlo
            scriptLoading: 'blocking'           // Modo de carga de los scripts (compatibilidad con antiguos)           
        }),

        //! Limpieza de la carpeta ./dist
        new CleanWebpackPlugin(),

        //! Estilos separados en un fichero
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],

    //! Para depurar nuestra aplicación con los ficheros TypeScript, generamos ficheros map
    devtool: 'eval-source-map',

    //! Hacer que webpack recargue en el navegador web si hay cambios
    devServer: {
        open: true,
        hot: true,
        static: {
            directory: path.join(__dirname, 'src')
        },
        devMiddleware: {
            stats: 'errors-only'
        }
    }
}