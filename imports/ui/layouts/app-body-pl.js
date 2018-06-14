/* global alert */

import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import { Template } from 'meteor/templating'

import '../components/loading.js'
import './app-body-pl.html'
import '../components/videoPlayer.js'
import '../components/menu.js'


Template.App_body_pl.onCreated(function appBodyPlOnCreated() {
  this.subscribe('playlists')
  this.state = new ReactiveDict()
  this.state.setDefault({
    menuOpen: false,
    userMenuOpen: false
  })
})

Template.App_body_pl.events({
  'click .js-menu'(event, instance) {
    instance.state.set('menuOpen', !instance.state.get('menuOpen'))
  },

  'click .content-overlay'(event, instance) {
    instance.state.set('menuOpen', false)
    event.preventDefault()
  },

  'click .js-user-menu'(event, instance) {
    instance.state.set('userMenuOpen', !instance.state.get('userMenuOpen'))
    // stop the menu from closing
    event.stopImmediatePropagation()
  },

  'click #menu a'(event, instance) {
    instance.state.set('menuOpen', false)
  }
/*
  'click .js-logout'() {
    Meteor.logout()

    // if we are on a private list, we'll need to go to a public one
    if (ActiveRoute.name('Lists.show')) {
      // TODO -- test this code path
      const list = Lists.findOne(FlowRouter.getParam('_id'))
      if (list.userId) {
        FlowRouter.go('Lists.show', Lists.findOne({ userId: { $exists: false } }))
      }
    }
  },

  'click .js-new-list'() {
    const listId = insert.call({ language: TAPi18n.getLanguage() }, (err) => {
      if (err) {
        // At this point, we have already redirected to the new list page, but
        // for some reason the list didn't get created. This should almost never
        // happen, but it's good to handle it anyway.
        FlowRouter.go('App.home')
        alert(TAPi18n.__('layouts.appBody.newListError')) // eslint-disable-line no-alert
      }
    })

    FlowRouter.go('Lists.show', { _id: listId })
  },

  'click .js-toggle-language'(event) {
    const language = $(event.target).html().trim()
    T9n.setLanguage(language)
    TAPi18n.setLanguage(language)
  },
  */
})


Template.App_body_pl.helpers({
  menuOpen() {
    const instance = Template.instance()
    return instance.state.get('menuOpen') && 'menu-open'
  },
  cordova() {
    return Meteor.isCordova && 'cordova'
  },
  emailLocalPart() {
    const email = Meteor.user().emails[0].address
    return email.substring(0, email.indexOf('@'))
  },
  userMenuOpen() {
    const instance = Template.instance()
    return instance.state.get('userMenuOpen')
  }
})
