const path = require('path');
const { platform, arch } = require('os');
const { rootPath } = require('electron-root-path');
const { isPackaged } = require('electron-is-packaged');

function getPlatform(){
    switch (platform()) {
        case 'win32':
            return 'win';
        case 'darwin':
            return 'mac';
        case 'linux':
            return 'linux';
        case 'sunos':
        case 'openbsd':
        case 'android':
        case 'aix':
        case 'freebsd':
        default:
            throw new Error(`Unsupported platform ${platform()}`)
    }
}

function getArch(){
    switch (arch()) {
        case 'ia32':
        case 'x32':
            return 'ia32';
        case 'x64':
            return 'x64';
        case 'arm64':
            return 'arm64';
        case 'arm':
            return 'armv7l'
        case 'mips':
        case 'mipsel':
        case 'ppc':
        case 'ppc64':
        case 's390':
        case 's390x':
        default:
            throw new Error(`Unsupported arch ${arch()}`)
    }
}

const IS_PROD = process.env.NODE_ENV === 'production';

const binariesPath =
    IS_PROD && isPackaged // the path to a bundled electron app.
    ? path.join(rootPath, './Contents', './Resources', './bin')
    : path.join(rootPath, './electron', './resources', getPlatform(), getArch());

const syncthingPath = path.resolve(path.join(binariesPath, './syncthing', './syncthing'));

module.exports = {binariesPath, syncthingPath}