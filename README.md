# 📦 workbox-add-integrity
A workbox plugin that add integrity to workbox precache manifest.

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/rwv/workbox-add-integrity/build.yml)](https://github.com/rwv/workbox-add-integrity/actions/workflows/build.yml)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/rwv/workbox-add-integrity)](https://app.codecov.io/github/rwv/workbox-add-integrity)
[![npm](https://img.shields.io/npm/v/workbox-add-integrity)](https://www.npmjs.com/package/workbox-add-integrity)
![NPM](https://img.shields.io/npm/l/workbox-add-integrity)

## Usage

``` bash
npm install workbox-add-integrity
```

``` ts
import addIntegrity from "workbox-add-integrity";
import { injectManifest } from "workbox-build";

const addIntegrityOptions = {
  folder: "dist",
}

injectManifest({
  manifestTransforms: [addIntegrity(addIntegrityOptions)],
});
```

## License

MIT
