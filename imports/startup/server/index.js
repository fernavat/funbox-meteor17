import { Roles } from 'meteor/alanning:roles'

// This defines a starting set of data to be loaded if the app is loaded with an empty db.
import './fixtures.js'

// This file configures the Accounts package to define the UI of the reset password email.
import './reset-password-email.js'

// Set up some rate limiting and other important security settings.
import './security.js'

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.js'

const getVideoId = (url) => {
  // const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  }
  return 'error'
}

const parseData = (html) => {
  const jsdom = require('jsdom')

  const { JSDOM } = jsdom
  const dom = new JSDOM(html)
  const $ = (require('jquery'))(dom.window)

  let titles = $('.info .Font_Gmedia')
  let artists = $('.info .iArt')
  let videos = $('.circleYT a')
  for (let i = 0; i < 5; i += 1) {
    // console.log((i + 1) + ' ' + titles[i].innerHTML + ' - ' +
    // artists[i].innerHTML + ' - ' + getVideoId($(videos[i]).attr('data-url')))
    console.log(`${i + 1} ${titles[i].innerHTML} - ${artists[i].innerHTML} - ${getVideoId($(videos[i]).attr('data-url'))}`)
  }


  const fetchVideoInfo = require('youtube-info')

  fetchVideoInfo(getVideoId($(videos[0]).attr('data-url')), (err, videoInfo) => {
    if (err) throw new Error(err)
    console.log(videoInfo.title)
  })

  titles = $('.info6 .name6')
  artists = $('.info6 .iArt6')
  videos = $('.total6 .divImgPos6')
  for (let i = 0; i < 15; i += 1) {
    const video = $(videos[i]).find('.circleYT a')
    let videoId = ''
    if (video.length) {
      // videoId = video.length
      videoId = getVideoId($(video[0]).attr('data-url'))
    } else {
      videoId = 'not found'
    }
    // console.log((i + 6) + ' ' + titles[i].innerHTML + ' - ' +
    // artists[i].innerHTML + ' - ' + videoId)
    console.log(`${i + 6} ${titles[i].innerHTML} - ${artists[i].innerHTML} - ${videoId}`)
  }
}

Meteor.methods({
  'user.insert'(userName) {
    check(userName, String)
    const result = Accounts.createUser({
      username: userName,
      password: 'password'
    })
    Roles.addUsersToRoles(result, ['user'])
    return result
  },
  'yt.search'(str) {
    check(str, String)
    const search = require('youtube-search')

    const opts = {
      maxResults: 5,
      key: Meteor.settings.private.ytKey
    }

    const searchSync = Meteor.wrapAsync(search)
    const result = searchSync(str, opts)
    console.dir(result)
    return result
  },
  'scrap.monitor.latino.general'() {
    const curl = require('curl')

    const urls = [
      { name: 'Top 20 General', url: 'http://charts.monitorlatino.com/top20/Mexico/General' },
      { name: 'Top 20 Pop', url: 'http://charts.monitorlatino.com/top20/Mexico/Pop' },
      { name: 'Top 20 Popular', url: 'http://charts.monitorlatino.com/top20/Mexico/Popular' },
      { name: 'Top 20 Anglo', url: 'http://charts.monitorlatino.com/top20/Mexico/Anglo' }
    ]
    curl.get(urls[3].url, null, (err, resp, body) => {
      if (resp.statusCode === 200) {
        // console.log(JSON.stringify(body))
        parseData(body)
      } else {
        // some error handling
        console.log('error while fetching url')
      }
    })
  }

})

Meteor.publish('users', () => {
  Meteor.users.find({}, { _id: 1, username: 1 })
})

