import { FlowRouter } from 'meteor/kadira:flow-router'
import { Playlists } from '../../api/playlists/playlists.js'

import './menu.html'

Template.menu.onCreated(function () {
  this.subscribe('playlists')
  this.showMenu = new ReactiveVar('sc-1')
  this.previousMenu = new ReactiveVar('sc-2')
  this.state = new ReactiveDict()
  this.state.setDefault({
    menuOpen: false,
    userMenuOpen: false
  })
})

Template.menu.helpers({
  userMenuOpen() {
    const instance = Template.instance()
    return instance.state.get('userMenuOpen')
  },
  username() {
    return Meteor.user().username
  },
  playlistClass(_id) {
    return Session.equals('selectedPlaylist', _id) ? 'active' : ''
  },
  extraClass(_id) {
    return Session.equals('selectedExtra', _id) ? 'active' : ''
  },
  queueCount() {
    return Session.get('localQueue').items.length
  },
  playlists() {
    return Playlists.find()
  },
  showMenu(option) {
    return option === Template.instance().showMenu.get()
  },
  momentumPlugin() {
    const showMenu = Template.instance().showMenu.get()
    const previousMenu = Template.instance().previousMenu.get()
    const showInt = parseInt(showMenu[showMenu.length - 1], 10)
    const prevInt = parseInt(previousMenu[previousMenu.length - 1], 10)
    if (showInt > prevInt) {
      return 'right-to-left'
    }
    return 'left-to-right'
  },
  content() {
    // return '<h1>' + Template.instance().showMenu.get() + '</h1>'
    return `<h1>${Template.instance().showMenu.get()}</h1>`
  }
})

Template.menu.events({
  'click .js-user-menu'(event, instance) {
    instance.state.set('userMenuOpen', !instance.state.get('userMenuOpen'))
    // stop the menu from closing
    event.stopImmediatePropagation()
  },
  'click .top-playlist'(event) {
    Session.set('selectedPlaylist', event.target.id)
  },
  'click .extra-playlist'(event) {
    Session.set('selectedExtra', event.target.id)
  },
  'change'(event, instance) {
    instance.previousMenu.set(instance.showMenu.get())
    instance.showMenu.set(event.target.id)
  },
  'click #tops'() {
    const playlist = Playlists.findOne(Session.get('selectedPlaylist'))
    FlowRouter.go('Playlists.show', playlist)
  },
  'click #extras'() {
    if (Session.equals('selectedExtra', 'queue')) FlowRouter.go('Queue.show')
  }
})
