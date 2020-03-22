const oneRad = 360 / (2 * Math.PI);

const getRads = (degrees) => degrees / oneRad;//* (2 * Math.PI) / 360;
const getDegs = (rads) => rads * oneRad;//360 / (2 * Math.PI);

export {getRads, getDegs};