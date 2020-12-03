import './Jackpots.scss';
import React from 'react';

export const Jackpots = ({jackpotType}) => {

    var highlightClass = () => {
        switch (jackpotType) {
            case 'MINI':
                return 'Rectangle2377-position-mini';
            case 'MAJOR':
                return 'Rectangle2377-position-major';
            case 'MEGA':
                return 'Rectangle2377-position-mega';
        }
    };

    return <div id='BG'>
        <div id='Rectangle2376'></div>
        <div id='Rectangle2377-highlighted' className ={highlightClass()}></div>
        <div id='MINI' className={ jackpotType === 'MINI' ? "highlighted" : "non-highlighted" }>MINI</div>
        <div id='MAJOR' className={ jackpotType === 'MAJOR' ? "highlighted" : "non-highlighted" }>MAJOR</div>
        <div id='MEGA' className={ jackpotType === 'MEGA' ? "highlighted" : "non-highlighted" }>MEGA</div>
        <div id="JACKPOT">
            <div id="Overline">
                JACKPOT
            </div>
        </div>
    </div>
}