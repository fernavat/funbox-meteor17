import { Meteor } from 'meteor/meteor'
import { History } from '../history.js'


Meteor.publish('history', () => {
  History.find({}, { sort: { playedAt: -1 }, limit: 50 })
})
