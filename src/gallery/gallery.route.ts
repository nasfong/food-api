import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './gallery.controller'
import { upload } from '../utils/upload';

const routerGallery = Router()

routerGallery.get('', readAllData)
routerGallery.post('', upload.single('image'), createData)
routerGallery.put('/:id', upload.single('image'), updateData)
routerGallery.delete('/:id', deleteData)

export { routerGallery }