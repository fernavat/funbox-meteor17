
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'


import { Videos } from '../videos/videos.js'

class HistoryCollection extends Mongo.Collection {

}

export const History = new HistoryCollection('history')

History.schema = new SimpleSchema({
  _id: { type: String },
  playedAt: { type: Date }

})

History.attachSchema(History.schema)


History.helpers({
  video() {
    return Videos.findOne(this._id)
  }
})
