
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { History } from './history.js'

export const insert = new ValidatedMethod({
  name: 'history.insert',
  validate: new SimpleSchema({
    videoId: {
      type: String
    }
  }).validator({ clean: true }),
  run({ videoId }) {
    History.update(videoId, { $set: { _id: videoId, playedAt: Date.now() } }, { upsert: true })
  }
})
