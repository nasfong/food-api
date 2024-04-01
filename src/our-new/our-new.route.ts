import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './our-new.controller'
import { upload } from '../utils/upload'

const routerOurNew = Router()

routerOurNew.get('', readAllData)
routerOurNew.post('', upload.single('image'), createData)
routerOurNew.put('/:id', upload.single('image'), updateData)
routerOurNew.delete('/:id', deleteData)


export { routerOurNew }