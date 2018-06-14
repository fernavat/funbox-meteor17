/* global confirm */
import { Template } from 'meteor/templating'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import './playlists-show.html'


import './videos-item.js'
/*
import Sortable from 'sortablejs'
let initSortable=(sortableClass)=>{
  var el = document.getElementById('books')
  var sortable = Sortable.create(el, {
    ghostClass: "ghost",
    delay: 50,
    chosenClass: "chosen",
    onSort: function (evt) {
      let items = []

      $(`${sortableClass} li`).each((index, element) => {
        items.push({ _id: $(element).data('id'), order: index + 1 })
      })

      Meteor.call('updateBookOrder', items, (error) => {
        if (error) {
          console.log(error.reason)
        }
      })
    }

  })
}
*/

Template.Playlists_show.onCreated(function listShowOnCreated() {
  this.autorun(() => {
    new SimpleSchema({
      playlist: { type: Function },
      videosReady: { type: Boolean },
      videos: { type: [Object] },
      'videos.$._id': { type: String },
      'videos.$.title': { type: String },
      'videos.$.thumbS': { type: String },
      'videos.$.thumbM': { type: String },
      'videos.$.position': { type: Number },
      'videos.$.playlistCount': { type: Number },
      'videos.$.createdAt': { type: Date },
      'videos.$.lastPlayedAt': { type: Date },
      'videos.$.playedCount': { type: Number },
      'videos.$.downloaded': { type: Boolean },
      'videos.$.song': { type: String },
      'videos.$.artist': { type: String }
    }).validate(Template.currentData())
  })
})


Template.Playlists_show.helpers({
  videoArgs(video) {
    // const instance = Template.instance()
    return {
      video
    }
  }
})
