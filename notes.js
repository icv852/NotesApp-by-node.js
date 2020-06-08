const fs = require('fs')
const chalk = require('chalk')

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => note.title !== title)
    if (remainingNotes.length === notes.length) {
        console.log(chalk.red.inverse('No note found!'))
    }else{
        saveNotes(remainingNotes)
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.inverse('Your Notes: '))
    notes.forEach((note) => {console.log(note.title)})
}

const readNote = (title) => {
    const notes = loadNotes()
    const targetNote = notes.find((note) => note.title === title)
    if(!targetNote){
        console.log(chalk.red.inverse('Note doesn\'t exists!'))
    }else{
        console.log(chalk.green.bold('Title: ' + targetNote.title))
        console.log('Body: ' + targetNote.body)
    }
}



const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}