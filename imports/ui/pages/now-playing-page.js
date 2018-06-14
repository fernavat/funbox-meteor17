import { FlowRouter } from 'meteor/kadira:flow-router';
import * as VideoPlayer from '../../utils/videoPlayer.js';
import swal from 'sweetalert2';
import './now-playing-page.html'

Template.Now_playing_page.helpers({
  paused() {
    return Session.equals('paused', true)
  },
  thumbnail() {
    const videoPlaying = Session.get('videoPlaying')
    if (videoPlaying) return videoPlaying.thumbM
    else return "funbox.png"
  },
  title() {
    const videoPlaying = Session.get('videoPlaying')
    if (videoPlaying) return videoPlaying.title
    else return ""
  },
  value() {
    return Session.get('sliderValue')
  },
  duration() {
    var seconds = Session.get('duration')
    if (!seconds) seconds = 0
    return new Date(1000 * seconds).toISOString().substr(14, 5)
  },
  currentTime() {
    var date = new Date(null)
    date.setSeconds(Session.get('currentTime'))
    //return date.toISOString().substr(11,8).replace(/^[0:]+/, "")
    return date.toISOString().substr(14, 5)
  }
})

Template.Now_playing_page.events({
  'click .next'() {
    VideoPlayer.next()
  },
  'click .pause'() {
    VideoPlayer.pause()
  },
  'click .previous'() {
    VideoPlayer.previous()
  },
  'change input': function () {
    let vp = document.getElementById('videoPlayer')
    let sl = document.getElementById('slider')
    vp.currentTime = Math.floor(sl.value * vp.duration / 100)
  },
})

/*
Template.Signin_page.onCreated(function () {
  this.subscribe('users');

  this.state = new ReactiveDict()
  this.state.setDefault({
    menuOpen: false,
    userMenuOpen: false,
    showKeypad: false
  })
})


Template.Signin_page.helpers({
  users() {
    return Meteor.users.find({})
  },
  userMenuOpen() {
    const instance = Template.instance();
    return instance.state.get('userMenuOpen');
  },
  showKeypad(){
    const instance = Template.instance();
    return instance.state.get('showKeypad');
  }
})

Template.Signin_page.events({
  'click .js-user-menu'(event, instance) {
    instance.state.set('userMenuOpen', !instance.state.get('userMenuOpen'));
    // stop the menu from closing
    event.stopImmediatePropagation();
  },
  'click .js-login'(event, instance) {
    const name = event.target.innerHTML
    if (name === 'admin') {
      instance.state.set('showKeypad', true)
    }
    else {
      Meteor.loginWithPassword(name, 'password')
      swal({
        position: 'top-end',
        type: 'success',
        text: 'Ya puedes acceder a tus listas.',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 2500
      })
      FlowRouter.go(FlowRouter.lastRoutePath)
    }

  }
})

*/