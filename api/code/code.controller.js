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