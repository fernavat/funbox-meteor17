import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { Playlists } from '../../api/playlists/playlists.js'
import { Videos } from '../../api/videos/videos.js'
import { Todos } from '../../api/todos/todos.js'
import { Lists } from '../../api/lists/lists.js'

import { listRenderHold } from '../launch-screen.js'
import './playlists-show-page.html'

// Components used inside the template
import './app-not-found.js'
import '../components/playlists-show.js'
import '../components/header.js'
import '../components/footer.js'
// import { play } from '../../utils/videoPlayer.js';

Template.Playlists_show_page.onCreated(function playlistsShowPageOnCreated() {
  this.getPlaylistId = () => FlowRouter.getParam('_id')
  this.autorun(() => {
    this.subscribe('videos.inPlaylist', { playlistId: this.getPlaylistId() })
  })
})

Template.Playlists_show_page.onRendered(function playlistsShowPageOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      listRenderHold.release()
    }
  })
  console.log(Lists.find().fetch())
  console.log(Todos.find().fetch())
  console.log(Playlists.find().fetch())
  console.log(Videos.find().fetch())

})

Template.Playlists_show_page.helpers({
  playlistIdArray() {
    const instance = Template.instance()
    const playlistId = instance.getPlaylistId()
    const res = Playlists.findOne(playlistId) ? [playlistId] : []
    return res
  },
  playlistArgs(playlistId) {
    const instance = Template.instance()
    // By finding the list with only the `_id` field set, we don't create a dependency on the
    // `list.incompleteCount`, and avoid re-rendering the todos when it changes
    const playlist = Playlists.findOne(playlistId, { fields: { _id: true, items: true } })
    const videos = playlist && playlist.videos()

    return {
      videosReady: instance.subscriptionsReady(),
      // We pass `list` (which contains the full list, with all fields, as a function
      // because we want to control reactivity. When you check a todo item, the
      // `list.incompleteCount` changes. If we didn't do this the entire list would
      // re-render whenever you checked an item. By isolating the reactiviy on the list
      // to the area that cares about it, we stop it from happening.
      playlist() {
        return Playlists.findOne(playlistId)
      },
      videos
    }
  },
  playlist() {
    const instance = Template.instance()
    const playlistId = instance.getPlaylistId()
    return Playlists.findOne(playlistId)
  }
})
