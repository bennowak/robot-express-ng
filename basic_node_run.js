
const TASKS = [
    {
        description: 'do the dishes',
        eta: 1000,
    },{
        description: 'sweep the house',
        eta: 3000,
    },{
        description: 'do the laundry',
        eta: 10000,
    },{
        description: 'take out the recycling',
        eta: 4000,
    },{
        description: 'make a sammich',
        eta: 7000,
    },{
        description: 'mow the lawn',
        eta: 20000,
    },{
        description: 'rake the leaves',
        eta: 18000,
    },{
        description: 'give the dog a bath',
        eta: 14500,
    },{
        description: 'bake some cookies',
        eta: 8000,
    },{
        description: 'wash the car',
        eta: 20000,
    },
]

const TYPES = {
    UNIPEDAL: 'Unipedal',
    BIPEDAL: 'Bipedal',
    QUADRUPEDAL: 'Quadrupedal',
    ARACHNID: 'Arachnid',
    RADIAL: 'Radial',
    AERONAUTICAL: 'Aeronautical'
}

class Robot {
    constructor(rType, rName){
        this.rType = rType;
        this.rName = rName;
    }

    sayHello() {
        console.log(`Hello.  My name is ${this.rName}.  I am a robot of type ${this.rType}`)
    }

    // doTask(task) {
    //     console.log(`${this.rName} will ${task['description']}.`)
    //     console.log(`Please wait while the task is completed`);
    //     setTimeout( () => {
    //         console.log(`${this.rName} has finished task : ${task['description']}`);
    //     }, Number(`${task['eta']}`));
    // }

    // Set multiple tasks
    doTask() {
        let n = arguments.length;
        for (let i=0; i < n; i ++){
            console.log(`Please wait while ${this.rName} completes the task : ${arguments[i]['description']}.`)
            setTimeout( () => {
                console.log(`${this.rName} has finished task : ${arguments[i]['description']}`);
            }, Number(`${arguments[i]['eta']}`));
        }
    }
}

let r1 = new Robot('bipedal', 'Robbi');
// r1.sayHello();
r1.doTask(TASKS[0], TASKS[1]);
let r2 = new Robot('orbital', 'BB8');
// r2.sayHello();
r2.doTask({'description': 'make a sammich', 'eta': 500}, {'description': 'dig a hole', 'eta': 10000})
