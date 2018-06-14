import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Videos } from '../videos/videos.js'

class PlaylistsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc
    ourDoc.createdAt = ourDoc.createdAt || new Date()
    ourDoc.updatedAt = ourDoc.updatedAt || new Date()

    return super.insert(ourDoc, callback)
  }

}

export const Playlists = new PlaylistsCollection('playlists')

Playlists.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
  items: { type: [String] },
  createdAt: {
    type: Date,
    denyUpdate: true
  },
  updatedAt: { type: Date },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  itemsCount: { type: Number }
})

Playlists.attachSchema(Playlists.schema)


Playlists.helpers({
  videos() {
    const order = this.items
    const res = Videos.find({}, {
      transform: (doc) => {
        doc.position = order.indexOf(doc._id) + 1
        return doc
      }
    }).fetch().sort((a, b) => a.position - b.position)
    return res
  }
})
