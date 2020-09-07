const files = require.context('./modules', false, /\.js$/)
let configApi = {}
files.keys().forEach(key => Object.assign(configApi, files(key).default))
export default {...configApi}
