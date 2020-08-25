import 'dotenv/config'

export default {
    css: [
        '~/assets/scss/app.scss'
    ],

    components: true,
    
    plugins: [
        { ssr: false, src: '~plugins/nuxtClientInit' },
        { ssr: true, src: '~plugins/icons' },
        { ssr: false, src: '~plugins/game' },
        // { ssr: false, src: '~plugins/socket.io' },
        // { ssr: false, src: '~plugins/inputManager' },
    ],

    modules: [
        'nuxt-i18n',
        // '@nuxtjs/apollo'
    ],

    buildModules: [
        '@nuxtjs/pwa',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/moment'
    ],

    // apollo: {
    //     tokenName: 'herowartoken',

    //     clientConfigs: {
    //         default: {
    //             httpEndpoint: 'http://192.168.0.66:4000/graph',
    //             wsEndpoint: 'ws://192.168.0.66:4000/subscriptions',
    //             // we need the __typename for the caching...
    //             // inMemoryCacheOptions: {
    //             //     addTypename: false,
    //             // },
    //         }
    //     }
    // },

    moment: {
        locales: ['de', 'en-gb']
    },

    i18n: {
        locales: [
            { code: 'de', file: 'de.js' },
            { code: 'en', file: 'en.js' }
        ],
        defaultLocale: 'de',
        strategy: 'no_prefix',
        lazy: true,
        langDir: 'lang/'
    },

    pwa: {
        meta: {
            name: 'MapNavigator',
            description: 'Map navigator app in webgl',
            theme_color: '#fcba03',
            lang: 'de'
        },
        manifest: {
            name: 'MapNavigator',
            lang: 'de'
        },
        workbox: {
            runtimeCaching: [
                {
                    urlPattern: 'https://fonts.googleapis.com/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: { cacheableResponse: { statuses: [0, 200] }}
                },
                {
                    urlPattern: 'https://fonts.gstatic.com/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: { cacheableResponse: { statuses: [0, 200] }}
                },
            ]
        }
    }
}