import React from 'react';

function Grid({ xStart, xEnd, yStart, yEnd, step }) {
    let grid = []
    for (let x = xStart; x < xEnd; x += step) {
        grid.push(
            <line x1={x} x2={x} y1={yStart} y2={yEnd} stroke="gray" strokeWidth={.25} key={`y${x}`} />
        )
    }
    for (let y = yStart; y < yEnd; y += step) {
        grid.push(
            <line x1={xStart} x2={xEnd} y1={y} y2={y} stroke="gray" strokeWidth={.25} key={`x${y}`} />
        )
    }
    return (
        <g>
            {grid}
        </g>
    )
}

export default Grid
