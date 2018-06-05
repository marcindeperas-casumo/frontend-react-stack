import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import legacyBridge from './legacyBridge';
// import registerServiceWorker from './registerServiceWorker';

window.bridge = legacyBridge;
const root = document.getElementById('root');

legacyBridge.on('router:navigation:complete', (data) => {
    legacyBridge.emit('$RESET');
    legacyBridge.emit(data.config.id);
});

ReactDOM.render(<App />, root);

// registerServiceWorker();
