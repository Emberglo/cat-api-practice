import { FAKEDB } from "../db/FAKEDB.js"
import { BadRequest } from "../utils/Errors.js"

class CatService {
    getAll() {
        return FAKEDB.cats
    }

    create(rawCatData) {
        if (!rawCatData.hasOwnProperty("name") || !rawCatData.hasOwnProperty("color")) {
            throw new BadRequest('Cat needs a name and a color, yo. This is a raw cat.')
        }
        rawCatData.id = FAKEDB.cats.length
        FAKEDB.cats.push(rawCatData)
    }

    edit(editedCatData, id) {
        let index = FAKEDB.cats.findIndex(c => c.id == id)
        if (index < 0) {
            throw new BadRequest('No such cat, yo')
        } else {
            if (!editedCatData.hasOwnProperty('name') || !editedCatData.hasOwnProperty('color')) {
                throw new BadRequest('Gotta fill out the whole thing, yo')
            }
            FAKEDB.cats.splice(index, 1, editedCatData)
        }
    }

    delete(id) {
        let index = FAKEDB.cats.findIndex(c => c.id == id)
        if (index < 0) {
            throw new BadRequest('No cats by that id, yo')
        }
        FAKEDB.cats.splice(index, 1)
    }

}

export const catService = new CatService()