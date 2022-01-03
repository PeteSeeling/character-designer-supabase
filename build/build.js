import { 
    checkAuth, 
    getCharacter,
    logout, 
    createCharacter,
    updateBottom,
    updateHead,
    updateMiddle,
    updateCatchphrases
} from '../fetch-utils.js';

checkAuth();

const headDropdown = document.getElementById('head-dropdown');
const middleDropdown = document.getElementById('middle-dropdown');
const bottomDropdown = document.getElementById('bottom-dropdown');
const headEl = document.getElementById('head');
const middleEl = document.getElementById('middle');
const bottomEl = document.getElementById('bottom');
const reportEl = document.getElementById('report');
const catchphrasesEl = document.getElementById('catchphrases');
const catchphraseInput = document.getElementById('catchphrase-input');
const catchphraseButton = document.getElementById('catchphrase-button');
const logoutButton = document.getElementById('logout');

// we're still keeping track of 'this session' clicks, so we keep these lets
let headCount = 0;
let middleCount = 0;
let bottomCount = 0;

// however, we are _not_ keeping track of catchphrases locally. nonetheless, we need this array here. Why is that, do you think?
let catchphrases = [];

headDropdown.addEventListener('change', async() => {
    headCount++;

    await updateHead(headDropdown.value);
    refreshData();
   
});


middleDropdown.addEventListener('change', async() => {
    middleCount++;
    
    updateMiddle(middleDropdown.value);
    refreshData();
    
});


bottomDropdown.addEventListener('change', async() => {
    bottomCount++;
    
    await updateBottom(bottomDropdown.value);
    refreshData();
    
});

catchphraseButton.addEventListener('click', async() => {
    catchphrases.push(catchphraseInput.value);

    catchphraseInput.value = '';
    updateCatchphrases(catchphrases);
    refreshData();

});

window.addEventListener('load', async() => {
    let character = getCharacter();

    if (!character) {
        character = createCharacter({
            head: '',
            middle: '',
            bottom: '',
            catchphrases: [],
        });    
    }

    catchphrases = character.catchphrases;

    refreshData();
});

logoutButton.addEventListener('click', () => {
    logout();
});

function displayStats(headCount, middleCount, bottomCount) {
    reportEl.textContent === `In this session, you have changed the head ${headCount} times, the body ${middleCount} times, and the pants ${bottomCount} times. And nobody can forget your character's classic catchphrases:`;
}

async function displayCatchphrases(catchphrases) {
    
    for (let catchphrase of catchphrases) {
        
        const p = document.createElement('p');

        p.classList.add('catchphrase');
        p.textContent = catchphrase;

        catchphrasesEl.append(p);
        
       
    }}



async function fetchAndDisplayCharacter() {
    const response = await getCharacter();
    

    if (head) headEl.style.backgroundImage = `url("../assets/${head}-head.png")`;
    if (middle) middleEl.style.backgroundImage = `url("../assets/${middle}-middle.png")`;
    if (bottom) bottomEl.style.backgroundImage = `url("../assets/${bottom}-pants.png")`;
    return response;
}

function refreshData() {
    displayStats();
    displayCatchphrases();
    fetchAndDisplayCharacter();
}
 
