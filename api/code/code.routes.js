import express from 'express'

import {
  getCodeBlocks,
  getCodeBlockById,
} from './code.controller.js'

export const codeRoutes = express.Router()

codeRoutes.get('/', getCodeBlocks)
codeRoutes.get('/:codeId', getCodeBlockById)