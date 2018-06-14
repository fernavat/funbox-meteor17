import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router';
import swal from 'sweetalert2';
import './signup-page.html'

Template.Signup_page.onCreated(function () {
  this.hasError = new ReactiveVar(false);
  this.error = new ReactiveVar('')
});

Template.Signup_page.onRendered(function () {
  $("#at-pwd-form").validate()
})

Template.Signup_page.helpers({
  hasError() {
    return Template.instance().hasError.get()
  },
  error() {
    return [{ errorText: Template.instance().error.get() }]
  }
})

Template.Signup_page.events({
  'submit form': (event, template) => {
    event.preventDefault()
    template.hasError.set(false)
    const x = document.forms["at-pwd-form"]["at-field-name"].value;
    //var y = event.target.at - field - name.value;
    //console.log(y)

    const trimInput = function (val) {
      return val.replace(/^\s*|\s*$/g, "");
    }
    const name = trimInput(x);


    if (name == "") {
      template.hasError.set(true)
      template.error.set("nombre: campo requerido")
    }
    else {
      Meteor.call('user.insert', name, (error, response) => {
        if (error) {
          template.hasError.set(true)
          template.error.set("nombre ya existe.")
          console.log('error: ' + error)
        }
        if (response) {
          Meteor.loginWithPassword(name, 'password')
          swal({
            position: 'top-end',
            type: 'success',
            text: 'Usuario creado con éxito.',
            title: 'Usuario Nuevo',
            showConfirmButton: false,
            timer: 2500
          })
          FlowRouter.go(FlowRouter.lastRoutePath)
        }
      })
    }
  }
})