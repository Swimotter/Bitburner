const repoUrl = 'https://raw.githubusercontent.com/swimotter/Bitburner/main/src'
const requiredFiles = [
    'common.js',
]

function getLocaleHHMMSS(ms = 0) {
    if (!ms) {
        ms = new Date().getTime()
    }

    return new Date(ms).toLocaleTimeString
}

/** @param {NS} ns **/
export async function main(ns) {
    ns.tprint(`[${getLocaleHHMMSS()}] Starting initializeHacking.js`)

    if (ns.getHostname() !== 'home') {
        throw new Exception('initializeHacking.js must be run from home.')
    }

    for (let i = 0; i < requiredFiles.length; i++) {
        const filename = requiredFiles[i]
        const path = repoUrl + filename
        ns.scriptKill(filename, 'home')
        ns.rm(filename)
        ns.tprint(`[${getLocaleHHMMSS()}] Downloading ${path}`)
        await ns.wget(path, filename)
    }
}