export let colorsArr = ['#49C4E5', '#8471F2', '#67E2AE'];

function randomPastelColor () {
    // hue, saturation%,lightness%
    return "hsl(" + 360 * Math.random() + ',' +
                (25 + 70 * Math.random()) + '%,' + 
                (65 + 30 * Math.random()) + '%)';
}

export default function setDotColor (colIndex) {
   colorsArr.push(randomPastelColor());
}