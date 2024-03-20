import { Router } from 'express'
import { createData, readAllData } from './food-type.controller'

const routerFoodType = Router()

routerFoodType.get('', readAllData)
routerFoodType.post('', createData)

export { routerFoodType }