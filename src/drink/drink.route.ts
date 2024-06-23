import { Router } from 'express'
import { createData, deleteData, readAllData, updateData } from './drink.controller'
import { compressImage, upload } from '../utils/upload'

const router = Router()

router.get('', readAllData)
router.post('', upload.single('image'), compressImage, createData)
router.put('/:id', upload.single('image'), compressImage, updateData)
router.delete('/:id', deleteData)

export { router as routerDrink }