import { registerApplication, start } from 'single-spa';
import { mainRegisterApplication, singleSpaAngularCliRouter } from 'single-spa-angular-cli/lib/utils';
import { GlobalEventDistributor } from './globalEventDistributor'
import 'babel-polyfill';
import 'zone.js';

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();
    let store = {};
    
    await mainRegisterApplication('menu', () => import('./menu/loader.js'), singleSpaAngularCliRouter.hashPrefix('/**'));
    start();

    registerApplication('home', () => import('./home/loader.js'), singleSpaAngularCliRouter.hashPrefix('/home', true));
    registerApplication('app2', () => import('./app2/loader.js'), singleSpaAngularCliRouter.hashPrefix('/app2', true));
    registerApplication('app1', () => SystemJS.import('/app1/main.js'), singleSpaAngularCliRouter.hashPrefix('/app1', true), await loadStore( '/app1/store.js', globalEventDistributor));
    registerApplication('app3', () => SystemJS.import('/app3/main.js'), singleSpaAngularCliRouter.hashPrefix('/app2', true), await loadStore( '/app3/store.js', globalEventDistributor));
}

async function loadStore (storeURL, globalEventDistributor) {
    // import the store module
    const storeModule = storeURL ? await SystemJS.import(storeURL) : {storeInstance: null};

    // register the store with the globalEventDistributor
    if (storeModule.storeInstance && globalEventDistributor)
        globalEventDistributor.registerStore(storeModule.storeInstance);
    // register the app with singleSPA and pass a reference to the store of the app as well as a reference to the globalEventDistributor
    return { store: storeModule.storeInstance, globalEventDistributor: globalEventDistributor };
}

init();