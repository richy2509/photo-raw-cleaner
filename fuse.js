const {FuseBox} = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "src",
  output: "dist/$name.js",
  debug: true,
  log: {
    showBundledFiles: false, // Don't list all the bundled files every time we bundle
    clearTerminalOnBundle: true, // Clear the terminal window every time we bundle
    enabled: false
  },
  allowSyntheticDefaultImports: true,
  sourceMaps: true
});

const fuseTest = FuseBox.init({
  homeDir: "__tests__",
  output: "dist/test/$name.js",
  debug: true,
  log: {
    showBundledFiles: false, // Don't list all the bundled files every time we bundle
    clearTerminalOnBundle: true, // Clear the terminal window every time we bundle
    enabled: false
  },
  allowSyntheticDefaultImports: true,
  sourceMaps: true
});

fuse.bundle("init").instructions(`> init.ts`).watch();
fuse.bundle("index").instructions(`> index.ts`).watch();
fuse.run();

fuseTest.bundle("test").instructions(`> index.ts`).watch();
fuseTest.run();