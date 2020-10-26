import BaseController from "../utils/BaseController"
import { catService } from "../services/CatService"

export class CatController extends BaseController {

    constructor() {
        super('api/cats')
        this.router
            .get('', this.getAll)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }

    getAll(req, res, next) {
        try {
            let cats = catService.getAll()
            res.send({data: cats, message: "Got the cats!"})
        } catch (error) {
            next(error)
        }
    }

    create(req, res, next) {
        try {
            let rawCatData = req.body
            catService.create(rawCatData)
            res.send({ data: rawCatData, message: "Cat Created!" })
        } catch (error) {
            next(error)
        }
    }

    edit(req, res, next) {
        try {
            let id = req.params.id
            let editedCatData = req.Body
            catService.edit(editedCatData, id)
            res.send({data: editedCatData, message: "Cat Edited!"})
        } catch (error) {
            next(error)
        }
    }

    delete(req, res, next) {
        try {
            let id = req.params.id
            catService.delete(id)
            res.send({message: "Cat Delorted!"})
        } catch (error) {
            next(error)
        }
    }


}