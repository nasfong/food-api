import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './comment.controller'

const routerComment = Router()

routerComment.get('', readAllData)
routerComment.post('', createData)
routerComment.put('/:id', updateData)
routerComment.delete('/:id', deleteData)


export { routerComment }