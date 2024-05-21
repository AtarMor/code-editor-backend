import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

export const codeService = {
  query,
  getById,
  update
}

async function query() {
  try {
    const collection = await dbService.getCollection('codeblock')
    const codeBlocks = await collection.find({}).toArray()
    return codeBlocks
  } catch (err) {
    logger.error('Cannot find codeblock', err)
    throw err
  }
}

async function getById(codeId) {
  try {
    const collection = await dbService.getCollection('codeblock')
    const codeBlock = collection.findOne({ _id: new ObjectId(codeId) })
    return codeBlock
  } catch (err) {
    logger.error(`Cannot find code ${codeId}`, err)
    throw err
  }
}

async function update(code) {
  try {
    const collection = await dbService.getCollection('codeblock')
    const { _id, ...codeToUpdate } = code
    await collection.updateOne({ _id: new ObjectId(_id) }, { $set: codeToUpdate })
    return code
  } catch (err) {
    logger.error('cannot update code', err)
    throw err
  }
}