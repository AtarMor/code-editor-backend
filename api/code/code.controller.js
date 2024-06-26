import axios from 'axios'
import { codeService } from './code.service.js'
import { logger } from '../../services/logger.service.js'

export async function getCodeBlocks(req, res) {
  try {
    logger.debug('Getting code blocks')
    const codeBlocks = await codeService.query()
    res.json(codeBlocks)
  } catch (err) {
    logger.error('Failed to get code blocks', err)
    res.status(500).send({ err: 'Failed to get code blocks' })
  }
}

export async function getCodeBlockById(req, res) {
  try {
    const { codeId } = req.params
    const codeBlock = await codeService.getById(codeId)
    res.json(codeBlock)
  } catch (err) {
    logger.error('Failed to get code block', err)
    res.status(500).send({ err: 'Failed to get code block' })
  }
}

export async function updateCodeBlock(req, res) {
  try {
      const codeBlock = req.body
      const updatedCode = await codeService.update(codeBlock)
      res.json(updatedCode)
  } catch (err) {
      logger.error('Failed to update code block', err)
      res.status(500).send({ err: 'Failed to update code block' })
  }
}

export async function executeCodeBlock(req, res) {
  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', req.body)
    res.json(response.data)
  } catch (err) {
    res.status(err.response ? err.response.status : 500).send(err.response ? err.response.data : { message: err.message })
  }
}