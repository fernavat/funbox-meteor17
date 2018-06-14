import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

class VideosCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc
    ourDoc.createdAt = ourDoc.createdAt || new Date()
    ourDoc.song = ourDoc.song || ''
    ourDoc.artist = ourDoc.artist || ''
    try {
      const result = super.insert(ourDoc, callback)
      return result
    } catch (error) {
      switch (error.code) {
        case 11000: // duplicated video
          super.update({ _id: doc._id },
            { $inc: { playlistCount: 1 }, song: ourDoc.song, artist: ourDoc.artist })
          return doc._id
        default:
          console.log('default')
          return false
      }
    }
  }
}

export const Videos = new VideosCollection('videos')

Videos.schema = new SimpleSchema({
  _id: { type: String },
  title: { type: String },
  thumbS: { type: String },
  thumbM: { type: String },
  song: { type: String, defaultValue: '' },
  artist: { type: String, defaultValue: '' },
  downloaded: { type: Boolean, defaultValue: false },
  playedCount: { type: Number, defaultValue: 0 },
  playlistCount: { type: Number, defaultValue: 0 },
  createdAt: {
    type: Date,
    denyUpdate: true
  },
  lastPlayedAt: { type: Date, defaultValue: new Date(0) }
})

Videos.attachSchema(Videos.schema)
