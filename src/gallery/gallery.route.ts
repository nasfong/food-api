import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './gallery.controller'
import { compressImage, upload } from '../utils/upload';

const routerGallery = Router()

routerGallery.get('', readAllData)
routerGallery.post('', upload.single('image'), compressImage, createData)
routerGallery.put('/:id', upload.single('image'), compressImage, updateData)
routerGallery.delete('/:id', deleteData)

export { routerGallery }