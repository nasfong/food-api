import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './our-new.controller'
import { compressImage, upload } from '../utils/upload'

const routerOurNew = Router()

routerOurNew.get('', readAllData)
routerOurNew.post('', upload.single('image'), compressImage, createData)
routerOurNew.put('/:id', upload.single('image'), compressImage, updateData)
routerOurNew.delete('/:id', deleteData)


export { routerOurNew }