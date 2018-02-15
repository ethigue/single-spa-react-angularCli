import React from 'react';
import {Provider, connect} from 'react-redux';
import Counter from './counter';
import reactLogo from '../assets/react-logo.png'


export default class Root extends React.Component {

    state = {store: null, globalEventDistributor: null};

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    setStore(store) {
        this.setState({... this.state, store: store});
    }

    setGlobalEventDistributor(globalEventDistributor) {
        this.setState({... this.state, globalEventDistributor: globalEventDistributor});
    }

    render() {

        let ret = <app1-root><img src={reactLogo} style={{width: 100}}/> <br /> This was rendered by App1, which is written in React.</app1-root>;

        if (this.state.store && this.state.globalEventDistributor) {
            ret =
                <Provider store={this.state.store}>
                    <div style={{marginTop: 100}}>
                        <img src={reactLogo} style={{width: 100}}/> <br />
                        This was rendered by App1, which is written in React.
                        <Counter globalEventDistributor={this.state.globalEventDistributor}/>
                    </div>
                </Provider>
        }

        return ret;
    }
}
