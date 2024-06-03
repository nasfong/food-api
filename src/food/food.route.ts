import { Router } from 'express'
import { createData, deleteData, readAllData, readRandomData, readRelateData, updateData } from './food.controller'
import { compressImage, upload } from '../utils/upload'

const routerFood = Router()

routerFood.get('', readAllData)
routerFood.get('/random/:limit', readRandomData)
routerFood.get('/our-menu', readRelateData)
routerFood.post('', upload.single('image'), compressImage, createData)
routerFood.put('/:id', upload.single('image'), compressImage, updateData)
routerFood.delete('/:id', deleteData)

export { routerFood }