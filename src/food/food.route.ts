import { Router } from 'express'
import { createData, readAllData } from './food.controller'
import multer from 'multer';

const routerFood = Router()
const upload = multer()

routerFood.get('', readAllData)
routerFood.post('', upload.single('image'), createData)

export { routerFood }