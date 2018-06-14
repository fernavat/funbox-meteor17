import { FlowRouter } from 'meteor/kadira:flow-router';
import * as VideoPlayer from '../../utils/videoPlayer.js';
import swal from 'sweetalert2';
import './search-page.html'
import { log } from 'util';


import '../components/footer.js'

let shift = false, capslock = false, layout = 'english', layout_id = 0;
const layouts = {
  english: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete', 'backspace'],
    ['numeric_switch', 'space', 'return']
  ],
  numeric: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
    ['#', '%', '_', '.', ',', '?', '!', "'", 'delete', 'backspace'],
    ['character_switch', 'space', 'return'],
  ],
  numbers_only: [
    ['1', '2', '3',],
    ['4', '5', '6',],
    ['7', '8', '9',],
    ['0', 'return', 'backspace'],
  ],
  symbolic: [
    ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
    ['_', '\\', '|', '~', '<', '>'],
    ['numeric_switch', '.', ',', '?', '!', "'", 'backspace'],
    ['character_switch', 'layout_switch', 'space', 'return'],

  ]
}

const function_keys = {
  delete: {
    text: '\u2327' // 2612
  },
  backspace: {
    text: '',
  },
  return: {
    text: 'Enter'
  },
  shift: {
    text: ''
  },
  space: {
    text: ''
  },
  numeric_switch: {
    text: '123',
    command: function () {
      this.createKeyboard('numeric');
      this.events();
    }
  },
  layout_switch: {
    text: '',
    command: function () {
      var l = this.toggleLayout();
      this.createKeyboard(l);
      this.events();
    }
  },
  character_switch: {
    text: 'ABC',
    command: function () {
      this.createKeyboard(layout);
      this.events();
    }
  },
  symbol_switch: {
    text: '#+=',
    command: function () {
      this.createKeyboard('symbolic');
      this.events();
    }
  }
}

Template.Search_page.onCreated(function () {
  this.numeric = new ReactiveVar(false)



  this.subscribe('users');
  this.state = new ReactiveDict()
  this.state.setDefault({
    menuOpen: false,
    userMenuOpen: false,
    showKeypad: false
  })
})

Template.Search_page.helpers({
  layout() {
    if (Template.instance().numeric.get())
      return layouts.numeric
    else
      return layouts.english
  },
  isFunction(key) {
    return function_keys.hasOwnProperty(key)
  },
  text(key) {
    return function_keys[key].text
  }
})

Template.Search_page.events({
  'click .letter'(event, template) {
    type((shift || capslock) ? event.target.innerHTML.toUpperCase() : event.target.innerHTML)
  },
  'click .numeric_switch'(event, template) {
    template.numeric.set(true)
  },
  'click .character_switch'(event, template) {
    template.numeric.set(false)
  },
  'click .shift'() {
    if (shift) toggleShiftOff()
    else toggleShiftOn()
  },
  'click .space'() {
    type(' ')
  },
  'click .backspace'() {
    backspace()
  },
  'click .return'() {
    enter()
  }
})
const enter = () => {
  Meteor.call('scrap.monitor.latino.general')
  /*
  const input = document.getElementById('search_field')
  Meteor.call('yt.search', input.value, (error, response) => {
    alert("response")
    console.log(JSON.stringify(response, null, 2))
  })
  */

}

const type = (key) => {
  const input = document.getElementById('search_field')
  let val = input.value
  let start = input.selectionStart
  let end = input.selectionEnd
  let max_length = 50
  if (start == end && end == val.length) {
    if (!max_length || val.length < max_length) {
      input.value = val + key
    }
  } else {
    const new_string = insertToString(start, end, val, key);
    input.value = new_string
    start++;
    end = start;
    input.setSelectionRange(start, end);
  }
  input.focus()

  if (shift && !capslock) {
    toggleShiftOff();
  }
}

const backspace = () => {
  const input = document.getElementById('search_field')
  let val = input.value
  input.value = val.substr(0, val.length - 1)
  console.log(val.substr(0, val.length - 1));

}

const toggleShiftOn = () => {
  const letters = document.getElementsByClassName('letter')
  const shift_key = document.getElementsByClassName('shift')
  Array.prototype.forEach.call(letters, function (element) {
    element.classList.add('uppercase')
  })
  shift_key[0].classList.add('active')
  shift = true
}

const toggleShiftOff = () => {
  const letters = document.getElementsByClassName('letter')
  const shift_key = document.getElementsByClassName('shift')
  Array.prototype.forEach.call(letters, function (element) {
    element.classList.remove('uppercase')
  })
  shift_key[0].classList.remove('active')
  shift = false
}

const insertToString = (start, end, string, insert_string) => {
  return string.substring(0, start) + insert_string + string.substring(end, string.length);
}

