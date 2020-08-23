module.exports = function({envData}) {
    return {
        reactScriptsVersion: "react-scripts",
        style: {
            modules: {
                localIndentName: ""
            },
            css: {
                loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
            },
            sass: {
                loaderOptions: (sassLoaderOptions, { env, paths }) => { return sassLoaderOptions; }
            },
            postcss: {
                mode: "extends",
                plugins: [],
                env: {
                    autoprefixer: {},
                    stage: 3,
                    features: {}
                },
            }
        },
        eslint: {
            enable: true,
            mode: "extends",
            configure: {},
            configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
            loaderOptions: {},
        },
        babel: {
            presets: [],
            plugins: [],
            loaderOptions: {},
            loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
        },
        jest: {
            babel: {
                addPresets: true, 
                addPlugins: true
            },
            configure: { /* Any Jest configuration options: https://jestjs.io/docs/en/configuration. */ },
            configure: (jestConfig, { env, paths, resolve, rootDir }) => { return jestConfig; }
        },
        devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => { return devServerConfig; },
        plugins: [{
            plugin: {
                overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => { return cracoConfig; },
                overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => { return webpackConfig; },
                overrideDevServerConfig: ({ devServerConfig, cracoConfig, pluginOptions, context: { env, paths, proxy, allowedHost } }) => { return devServerConfig; },
                overrideJestConfig: ({ jestConfig, cracoConfig, pluginOptions, context: { env, paths, resolve, rootDir } }) => { return jestConfig },
            },
            options: {}
        }
    ]
    };
}