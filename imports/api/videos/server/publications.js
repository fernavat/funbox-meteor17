import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Videos } from '../videos.js'
import { Playlists } from '../../playlists/playlists.js'

Meteor.publish('videos', () => {
  Videos.find()
})

Meteor.publishComposite('videos.inPlaylist', function videosInPlaylist(params) {
  new SimpleSchema({
    playlistId: { type: String }
  }).validate(params)

  const { playlistId } = params
  const userId = this.userId

  return {
    find() {
      const query = {
        _id: playlistId,
        $or: [{ userId: { $exists: false } }, { userId }]
      }

      const options = {
        fields: { items: 1 }
      }

      return Playlists.find(query, options)
    },

    children: [{
      find(playlist) {
        return Videos.find({ _id: { in: playlist.items } })
      }
    }]
  }
})
