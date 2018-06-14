
import './videoPlayer.html';
import * as VideoPlayer from '../../utils/videoPlayer.js';
import { log } from 'util';



Template.videoPlayer.onCreated(function () {
  //this.toHistory=new ReactiveVar('false')
})

Template.videoPlayer.events({

  'ended video': function () {
    VideoPlayer.next()
  },
  /*
  'change input': function () {
    let vp = document.getElementById('videoPlayer')
    let sl = document.getElementById('slider')
    vp.currentTime = Math.floor(sl.value * vp.duration / 100)
  },*/
  'timeupdate video': function (event, template) {
    const vp = template.find("video")
    Session.set('sliderValue', Math.floor((100 / vp.duration) * vp.currentTime))
    Session.set('currentTime', vp.currentTime)
    Session.set('duration', vp.duration)
    if (vp.currentTime > 5 && Session.equals('toHistory', false)) {
      VideoPlayer.toHistory()

    }
  },

  'click': function () {
    var elem = document.getElementById('videoPlayer')
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
})