import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './food-type.controller'
import { compressImage, upload } from '../utils/upload';

const routerFoodType = Router()

routerFoodType.get('', readAllData)
routerFoodType.post('', upload.single('image'), compressImage, createData)
routerFoodType.put('/:id', upload.single('image'), compressImage, updateData)
routerFoodType.delete('/:id', deleteData)


export { routerFoodType }