import { FlowRouter } from 'meteor/kadira:flow-router';
import swal from 'sweetalert2';
import './signin-page.html'
import '../components/keypad.js'

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