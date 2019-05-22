let config = {
    // domain: 'http://localhost:8081',
    domain: 'https://account.yunser.com',
    clientId: '1',
    redirectUri: location.origin + '/oauth/callback'
}

let oauth = {
    getOauthUrl() {
        let redirectUri
        if (location.host.includes('yunser.com')) {
            redirectUri = decodeURIComponent(location.href)
            return `${config.domain}/login?client_id=${config.clientId}&redirect_uri=${redirectUri}`
        } else {
            redirectUri = decodeURIComponent(config.redirectUri + '?redirect_uri=' + decodeURIComponent(location.href))
            return `${config.domain}/login?client_id=${config.clientId}&redirect_uri=${redirectUri}&type=oss`
        }
    }
}

export default oauth
