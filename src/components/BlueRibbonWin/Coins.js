import React from 'react';
import './Coins.scss';
import CoinMega from './assets/coin-mega.js';
import CoinMajor from './assets/coin-major.js';
import CoinMini from './assets/coin-mini.js';
import {Jackpots} from './Jackpots.js'

const coins = []
const fpsInterval = 9;
let fpsElapsed = 0;
let previousTime = 0;
let selected = 0;

const animate = time => {
    if (fpsElapsed >= fpsInterval) {
        fpsElapsed = 0;
        // Put your drawing code here
        animateCoinSelection(coins);
    }
    fpsElapsed++;

    previousTime = time;
    requestAnimationFrame(animate);
  }

const animateCoinSelection = (coins) => {

    for (let index = 0; index < coins.length; index++) {
        let coin = coins[index].ref.current
        coin.classList.remove('lighten')

        if (index === selected) {
            coin.classList.add('lighten');
        }
    }
    selected++;
    if(selected >= coins.length) {
        selected = 0;
    }

}

const createCoins = (coins) => {
    let totalCoins = 29;

    for (let index = 1; index <= totalCoins; index++) {
        let coinType;
        let className;
        let coinRef = React.createRef();

        if(index === 1) {
            className = 'mega-scale-in-center';
            coinType = <CoinMega></CoinMega>;
        }
        if(index > 1 && index < 10) {
            className = 'major-scale-in-center';
            coinType = <CoinMajor></CoinMajor>;
        }
        if(index >= 10) {
            className = 'mini-scale-in-center';
            coinType = <CoinMini></CoinMini>;
        }

        let coin = <div className={className} key={index} ref={coinRef} id={`Frame${index}`}>{coinType}</div>
        coins.push(coin)
      }
}

const startCoinSelection = () => {
    for (let index = 0; index < coins.length; index++) {
        let coin = coins[index].ref.current
        if(index === 0) {
            coin.classList.add('darken');
            coin.classList.add('lighten');
        } else {
            coin.classList.add('animateDarken');
        }
    }
}

createCoins(coins);

export const Coins = () => {
    const [count, setCount] = React.useState(0)
    const [jackpotType, setJackpotType] = React.useState('MINI')

    const handleSetJackpotType = (newJackpotType) => {
        setJackpotType(newJackpotType);
    }

    const onAnimEnd = (event) => {
        if(event.animationName === 'timer-anim') {
            startCoinSelection();
            setTimeout(() => {requestAnimationFrame(animate);}, 1000);

            const jackpotEnums = ['MINI', 'MAJOR', 'MEGA']
            let jackpotEnumsCounter = 0;
            setInterval(() => {
                handleSetJackpotType(jackpotEnums[jackpotEnumsCounter%3])
                jackpotEnumsCounter++;
            }, 500)
        }
    }

    return <div className='timer-anim' onAnimationEnd={onAnimEnd}>
        <div id='overlay' class='background-scale-in-center'></div>
        <div id='coinsContainer'>
            {coins}
        </div>
        <div></div>
        <Jackpots jackpotType={jackpotType}></Jackpots>

    </div>
}