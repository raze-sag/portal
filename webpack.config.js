module.exports = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    resolve: {
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc'
        },
        fallback: { "url": require.resolve("url/") }
    },
};
