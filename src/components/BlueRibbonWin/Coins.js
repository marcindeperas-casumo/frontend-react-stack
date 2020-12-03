import React from 'react';
import './Coins.scss';
import CoinMega from './assets/coin-mega.js';
import CoinMajor from './assets/coin-major.js';
import CoinMini from './assets/coin-mini.js';
import {Jackpots, setJackpot} from './Jackpots.js'

const coins = []
let then = 0;
const fpsInterval = 9;
let fpsElapsed = 0;
let previousTime = 0;

const animate = time => {
    const deltaTime = time - previousTime;

    if (fpsElapsed >= fpsInterval) {
        fpsElapsed = 0;
        // Put your drawing code here
        animateCoinSelection(coins);
    }
    fpsElapsed++;
    //callback(deltaTime)

    previousTime = time;
    requestAnimationFrame(animate);
  }


const useAnimationFrame = (callback, coins, shouldAnimate) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();



    // React.useEffect(() => {
    //   requestRef.current = requestAnimationFrame(animate);
    //   return () => cancelAnimationFrame(requestRef.current);
    // }, []); // Make sure the effect runs only once
  }

let selected = 0;

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
        let animEndCb;

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

createCoins(coins);

const startCoinSelection = () => {
    let totalCoins = 29;
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

export const Coins = () => {
    const [count, setCount] = React.useState(0)
    const [jackpotType, setJackpotType] = React.useState('MINI')

    const handleSetJackpotType = (newJackpotType) => {
        setJackpotType(newJackpotType);
    }

    const onAnimEnd = (event) => {
        if(event.animationName === 'timer-anim') {
            // useAnimationFrame(deltaTime => {
            //     // Pass on a function to the setter of the state
            //     // to make sure we always have the latest state
            //     setCount(prevCount => (prevCount + deltaTime * 0.01) % 100)
            // }, coins, animate)
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