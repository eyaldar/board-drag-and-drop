const HtmlWebPackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const dist = path.resolve(process.cwd(), 'dist');

module.exports = (env)  => {
    return {
        mode: env.NODE_ENV,
        entry: {
            index: ['./src/entry.ts'],
        },
        context: process.cwd(),
        output: {
            path: dist,
            libraryTarget: "umd"
        },
        devServer: {
            port: 3000
        },
        devtool: "inline-source-map",
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        },
        cache: {
            type: 'memory'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                },
                {
                    test: /\.(tsx|ts)$/,
                    use: [
                        {
                            loader: 'thread-loader',
                            options: {
                                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                workers: require('os').cpus().length - 1
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true
                    }
                }
            }),
            new HtmlWebPackPlugin({
                template: "./public/index.html",
                filename: "./index.html"
            }),
            new WebpackBar({
                name: 'My App',
                color: '#63e9ff'
            }
            )
        ]
    }
};