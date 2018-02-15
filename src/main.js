import { registerApplication, start } from 'single-spa';
import { mainRegisterApplication, singleSpaAngularCliRouter } from 'single-spa-angular-cli/lib/utils';
import 'babel-polyfill';
import 'zone.js';

export function hashPrefix(prefix) {
    return function (location) {
        return location.hash.startsWith(`#${prefix}`);
    }
}

mainRegisterApplication('menu', () => import('./menu/loader.js'), singleSpaAngularCliRouter.hashPrefix('/**')).then(() => {
    registerApplication('home', () => import('./home/loader.js'), singleSpaAngularCliRouter.hashPrefix('/home', true));
    registerApplication('app2', () => import('./app2/loader.js'), singleSpaAngularCliRouter.hashPrefix('/app2', true));
    registerApplication('app1', () => SystemJS.import('/app1/main.js'), singleSpaAngularCliRouter.hashPrefix('/app2', true));    
    registerApplication('app3', () => SystemJS.import('/app1/main.js'), singleSpaAngularCliRouter.hashPrefix('/app1', true));    
});

start();