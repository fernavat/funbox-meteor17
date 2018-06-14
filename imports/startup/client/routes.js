import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

// Import to load these templates
import '../../ui/layouts/app-body.js'
import '../../ui/pages/root-redirector.js'
import '../../ui/pages/lists-show-page.js'
import '../../ui/pages/app-not-found.js'

// added
import '../../ui/layouts/app-body-pl.js'
import '../../ui/pages/root-redirector-2.js'
import '../../ui/pages/playlists-show-page.js'
import '../../ui/pages/queue-show-page.js'
import '../../ui/pages/signup-page.js'
import '../../ui/pages/signin-page.js'
import '../../ui/pages/now-playing-page.js'
import '../../ui/pages/search-page.js'

// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js'


let lastRoutePath

FlowRouter.triggers.enter([
  (context) => {
    const newRoutePath = context.path
    FlowRouter.lastRoutePath = lastRoutePath
    lastRoutePath = newRoutePath
  }
])

FlowRouter.route('/playlists', {
  name: 'App.home2',
  action() {
    BlazeLayout.render('App_body_pl', { main: 'app_rootRedirector_2' })
  }
})

FlowRouter.route('/playlists/:_id', {
  name: 'Playlists.show',
  action() {
    BlazeLayout.render('App_body_pl', { main: 'Playlists_show_page' })
  }
})

FlowRouter.route('/queue', {
  name: 'Queue.show',
  action() {
    BlazeLayout.render('App_body_pl', { main: 'Queue_show_page' });
  }
})

FlowRouter.route('/search', {
    name: 'Search',
    action() {
      BlazeLayout.render('App_body_pl', { main: 'Search_page' });
    }
  })

FlowRouter.route('/signup', {
  name: 'Crear',
  action() {
    BlazeLayout.render('App_body_pl', { main: 'Signup_page' });
  }
})

FlowRouter.route('/login', {
  name: 'Entrar',
  action() {
    BlazeLayout.render('App_body_pl', { main: 'Signin_page' });
  }
})

FlowRouter.route('/playing', {
  name: 'Playing',
  action() {
    BlazeLayout.render('App_body_pl', { main: 'Now_playing_page' });
  }
})

FlowRouter.route('/lists/:_id', {
  name: 'Lists.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Lists_show_page' })
  }
})

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'app_rootRedirector' })
  }
})

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' })
  }
}
