const TARGET = 'hello, world';
const MUTATION_WEIGHT = 10;
let population = [];



function main() {
    // populate population
    population = [
        'aarst stff',
        'cvrf xc92,',
        'z3,x08zori',
        'z8xclm,5inu',
        'aaaaaaaaaaa'
    ];
    
    for (var i = 0; i < 100; i++) {
        nextGeneration();
        console.log(population);
    }
}


function nextGeneration() {
    for (let i = 0; i < population.length; i++) {
        population[i] = mutate(population[i]);
    }
}


function getFitness(string) {
    let fitness = 0;
    
    for (let i = 0; i < string.length; i++) {
        fitness += Math.abs(TARGET.charCodeAt(i) - string[i].charCodeAt(0));
    }
    
    return fitness;
}


function breed(string1, string2) {
    const slicePoint = Math.floor(string1.length / 2);
    return string1.slice(0, slicePoint) + string2.slice(slicePoint, string1.length);
}


function mutate(string) {
    const mutateLetter = Math.floor(Math.random() * string.length);
    const mutateAmt = Math.floor((Math.random() * 2 - 1) * MUTATION_WEIGHT);
    let letterCharCode = string.charCodeAt(mutateLetter) + mutateAmt;
    if (letterCharCode < 32) letterCharCode = 32;
    if (letterCharCode > 126) letterCharCode = 32;
    
    return string.replaceAt(mutateLetter, String.fromCharCode(letterCharCode));
}



String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};