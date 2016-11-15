const TARGET = 'hello, world';
const MUTATION_WEIGHT = 10;
const HALF_GENERATION_SIZE = 8;
let best = 0;
let dataPoints = [];

let population = [
    'a rstast f67',
    'cvrfaxc92,v7',
    'z3,x08zorinl',
    'z8xclm,5inus',
    'nxcuyn3epnos',
    'aarst stffxf',
    'cvrf xc92,!s',
    'z3,x08zori%a',
    'cu3 s9x f3 9',
    ',,3,45m3,el9',
    'cvrf xc92,!s',
    'z3,x08zori%a',
    'cu3 s9x f3 9',
    ',,3,45m3,el9'
];



function main() {
    Array(750).fill(0).every(() => {
        nextGeneration();
        
        $('#generation').html(parseInt($('#generation').html()) + 1);
        
        $('#population').html('');
        console.log(population);
        population.forEach(string => {
            $('#population').append(`
                <div style="display: inline">
                    ${string}
                </div>
            `);
        });
        
        console.log(best);
        $('#best').html(best);
        
        if (best === 0) return false;
        else return true;
    });
}


function nextGeneration() {
    // copy population into array with items [string, fitness]
    let curPopulation = population.map(item => [item, 0]);
    
    curPopulation.forEach(string => {
        // calculate fitness of each string
        string[1] = getFitness(string[0]);
    });
    
    // sort strings based on fitness
    curPopulation.sort((a, b) => a[1] > b[1] ? 1 : (a[1] < b[1] ? -1 : 0));
    best = curPopulation[0][1];
    
    // "kill" half of the strings
    curPopulation.splice(HALF_GENERATION_SIZE);
    
    // duplicate and mutate strings
    for (let i = 0; i < HALF_GENERATION_SIZE; i++) {
        curPopulation[i + HALF_GENERATION_SIZE] = mutate(curPopulation[i][0]);
        curPopulation[i] = mutate(curPopulation[i][0]);
    }
    
    population = Array.from(curPopulation);
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
    let letterCharCode = string.charCodeAt(mutateLetter) +
        Math.floor(Math.random() * 3) - 1; //gives random number between -1 and 1
    
    return string.replaceAt(mutateLetter, String.fromCharCode(letterCharCode));
}



String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};



function setupChart() {
	let chart = new CanvasJS.Chart("chartContainer",{
		title :{
			text: "Live Random Data"
		},
		data: [{
			type: "line",
			dataPoints: dataPoints
		}]
	});
}