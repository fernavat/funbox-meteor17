import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'
import swal from 'sweetalert2'
import './keypad.html'

Template.Keypad.onCreated(function () {
  this.asteriscs = new ReactiveVar('')
  this.password = new ReactiveVar('')
})

Template.Keypad.helpers({
  asteriscs() {
    return Template.instance().asteriscs.get()
  }
})

Template.Keypad.events({
  'click .button-keypad'(event, instance) {
    const asteriscs = instance.asteriscs.get() + '*'
    const password = instance.password.get() + event.target.innerHTML
    instance.asteriscs.set(asteriscs)
    instance.password.set(password)
    if (asteriscs.length > 3 && !loginAdmin(password)) {
      instance.asteriscs.set('')
      instance.password.set('')
    }
  },
  'click .button-keypad-back'(event, instance) {
    const asteriscs = instance.asteriscs.get()
    const password = instance.password.get()
    if (asteriscs.length > 0) {
      instance.asteriscs.set(asteriscs.slice(0, -1))
      instance.password.set(password.slice(0, -1))
    }
  },
  'click .button-keypad-enter'(event, instance){
    if (!loginAdmin(instance.password.get())) {
      instance.asteriscs.set('')
      instance.password.set('')
    }
  }
})

const loginAdmin = (password) => {
  Meteor.loginWithPassword('admin', password, function (error) {
    if (error) {
      swal({
        //position: 'top-end',
        type: 'error',
        text: 'Contraseña inválida.',
        title: 'Error',
        //showConfirmButton: false,
        //timer: 2500
      })
      return false
    }
    else {
      swal({
        position: 'top-end',
        type: 'success',
        text: 'Ya puedes configurar el sistema.',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 2500
      })
      FlowRouter.go(FlowRouter.lastRoutePath)
      return true
    }
  })
}

