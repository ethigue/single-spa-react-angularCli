import singleSpaAngularCli from 'single-spa-angular-cli';

const prod = NODE_ENV;

let scripts = [
    'inline.bundle.js',
    'polyfills.bundle.js',
    'styles.bundle.js',
    'vendor.bundle.js',
    'route2-routing.module.chunk.js',
    'main.bundle.js'
];

if (prod) {
    scripts = "DYNAMIC_SCRIPTS_LIST".split(",");
}

const lifecycles = singleSpaAngularCli({
    selector: 'home-root',
    baseScriptUrl: '/home',
    scripts
});

export const bootstrap = [
    lifecycles.bootstrap
];

export const mount = [
    lifecycles.mount
];

export const unmount = [
    lifecycles.unmount
];