let page = 0;
let limit = 50;

document.addEventListener("DOMContentLoaded", () => {
    addNavListeners()
    fetchMonster()
    createForm()
    document.querySelector('#monster-form').addEventListener('submit', e => {
        e.preventDefault()
        let name = document.querySelector('#monster-name').value
        let age = document.querySelector('#monster-age').value
        let description = document.querySelector('#monster-description').value
        
        monsterObj = {
            name,
            age,
            description
        }
        
        // console.log(monsterObj)
        postNewMonster(monsterObj, e)
        
    })
    
    
    
    
})


const createForm = () => {
    
    
    let formContainer = document.querySelector('#create-monster')
    let form = document.createElement('form')
    form.id = 'monster-form'
    let nameInput = document.createElement('input')
    let ageInput = document.createElement('input')
    let descriptionInput = document.createElement('input')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    button.innerText = 'MAKE MONSTER!'
    nameInput.id = 'monster-name'
    ageInput.id = 'monster-age'
    descriptionInput.id = 'monster-description'
    
    
    h2.innerHTML = 'Create Monster';
    nameInput.placeholder = 'name...';
    ageInput.placeholder = 'age...';
    descriptionInput.placeholder = 'Bio...';
    
    form.append(nameInput, ageInput, descriptionInput, button)
    formContainer.append(h2, form)
    
    
}

const postNewMonster = ({name, age, description}, e) => {
    e.preventDefault()
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        
        body:  JSON.stringify({ name, age, description })
    })
    .then(resp => resp.json())
    .then(monster => {
        addOneMonster(monster)
        e.target.reset()
    })
}

const fetchMonster = () => {
    
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=0`)
    .then(resp => resp.json())
    .then(monsterData => {
        let newMonsterData = monsterData.slice(-50)
        
        newMonsterData.forEach((monster) => {
            addOneMonster(monster)
        })
        
    })
    
}

const addOneMonster = (monster) => {
    let monsterContainer = document.querySelector("#monster-container")
    
    let card = document.createElement('div')
    let name = document.createElement('h2')
    let age = document.createElement('h4')
    let description = document.createElement('p')
    
    name.innerText = `Name: ${monster.name}`; 
    age.innerText = `Age: ${monster.age}`; 
    description.innerText = `Bio: ${monster.description}`; 
    
    card.append(name, age, description)
    monsterContainer.append(card)
    
    
    
}

const addNavListeners = () => {
    
    document.querySelector("#forward").addEventListener("click", () => {
        let monsterContainer = document.querySelector("#monster-container")
        monsterContainer.innerHTML = '';
        limit += 5;
        fetchMonster()
    })
    
    document.querySelector("#back").addEventListener("click", () => {
        let monsterContainer = document.querySelector("#monster-container")
        monsterContainer.innerHTML = '';
        limit -= 50;
        
           console.log('limit', limit)  
       
        if (limit > 0) {
            page--;
            fetchMonster(page);
        } else {
            alert('No Monsters Here!');
            
            limit = 50;  
            
            page = 1; 
            fetchMonster(page);

        

        
        }
        
    })
   
    
}


// let newMonsterData = monsterData.slice(-5)
//         console.log(monsterData)
//         newMonsterData.forEach((monster) => {
//             addOneMonster(monster)
//         })