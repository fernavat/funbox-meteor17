/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor'
import { Playlists } from '../playlists.js'

Meteor.publish('playlists', () => Playlists.find())
