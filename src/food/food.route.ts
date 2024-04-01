import { Router } from 'express'
import { createData, deleteData, readAllData, readRandomData, updateData } from './food.controller'
import { upload } from '../utils/upload'

const routerFood = Router()

routerFood.get('', readAllData)
routerFood.get('/random/:limit', readRandomData)
routerFood.post('', upload.single('image'), createData)
routerFood.put('/:id', upload.single('image'), updateData)
routerFood.delete('/:id', deleteData)

export { routerFood }