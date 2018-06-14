import './queue-show-page.html';
import '../components/queue-header.js'
import '../components/footer.js'
import '../components/videos-item.js';

Template.Queue_show_page.onCreated(function(){

})

Template.Queue_show_page.helpers({
  queue(){
    //const Queue = new Mongo.Collection('queue', {connection: null})
    //console.log(Queue.find().fetch())
    //return Queue.find()
    return Session.get('localQueue').items
  },
  videoArgs(video) {
    const instance = Template.instance();
    return {
      video
    };
  }
})