const fs = require("fs");
const yargs = require("yargs");


function loadDatas(path) {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}

yargs
    .command({
        command: 'list',
        describe: 'List all titles',
        handler: () => {
            console.log('liste des titres de toutes les notes');
            let notes = loadDatas('./datas/notes.json');
            notes.map(note => console.log(note.title));
        }
    })
    .command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: "Title",
                demandOption: true,
                type: "string"
            },
            body: {
                describe: "Body",
                demandOption: true,
                type: "string"
            }
        },
        handler: (argv) => {
            console.log("Add note in file");
            let notes = loadDatas('./datas/notes.json');
            notes.push({title:argv.title, body:argv.body});
            fs.writeFile('./datas/notes.json',JSON.stringify(notes), (err) => {
                if(err) throw err;
                console.log("Note ajoutée");
            })
        }
    })
    .argv
