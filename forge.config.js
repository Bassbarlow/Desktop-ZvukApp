const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
// const webpack = require("webpack");

module.exports = {
  packagerConfig: {
    asar: true,
    icon:"music-player",
  },
  publishers:[
    {
      name:"@electron-forge/publisher-github",
      config:{
        repository:{
          owner: "Bassbarlow",
          name: "Desktop-ZvukApp"
        },
        authToken: process.env.GITHUB_TOKEN,
      }
    }
  ],
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: 'music-player.ico',
        certificateFile: './zvuk_app.pfx',
        certificatePassword: process.env.CERT_PASS,
        iconUrl: "https://s34klg.storage.yandex.net/rdisk/47107171e3de3aa2251b71efdba645687aa9385639267fe14301cdfb9ebce5d8/66b9d443/Xx0T0VntNx5zIHMv4OlgnJV-cktcVSY6y3e2dlF07K0UsHn85HwUR0zV6qSPt2EPRYbifm9trffC5FOPCqcfNA==?uid=0&filename=music-player.ico&disposition=attachment&hash=lPZ4LStGFc5/%2BQzyKBXxZr4gIYxafIZTnedlNqVAL6B1jrAp74rI6dbL%2B3Im77/nq/J6bpmRyOJonT3VoXnDag%3D%3D&limit=0&content_type=image%2Fx-icon&owner_uid=1577920616&fsize=4286&hid=d8378fdd7f736b98beaa320b89de8462&media_type=image&tknv=v2&ts=61f79071b56c0&s=713f92819652cdfb147e60281f951990f130c279609d64cbc05e3b1c4be79d6c&pb=U2FsdGVkX1-9yfE6C4z3McD_ewk4MKkgHU0ZyUGmWMXXWzNIINdmAgT0EHzVQ8VB3mfvSGnPFX4jbUXTGIFzg73uz2SOAoURiPj1cQC-Jm0",
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon:'music-player.png',
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // new webpack.EnvironmentPlugin({

    // })
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
