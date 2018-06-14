import swal from 'sweetalert2'
import { Template } from 'meteor/templating'
import * as VideoPlayer from '../../utils/videoPlayer.js'

import './videos-item.html'

Template.Videos_item.events({
  'click .add'() {
    swal({
      title: 'Agregar Video',
      imageUrl: this.video.thumbM,
      showCancelButton: true,
      text: this.video.title,
      confirmButtonText: 'Agregar a la lista',
      cancelButtonText: 'Tocar enseguida'
    }).then((result) => {
      if (result.value) {
        VideoPlayer.queue(this.video)
        swal({
          position: 'top-end',
          type: 'success',
          text: 'El video se agregó a la lista de reproducción.',
          title: 'Agregado!',
          showConfirmButton: false,
          timer: 2500
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        VideoPlayer.playNext(this.video)
        swal({
          position: 'top-end',
          type: 'success',
          text: 'El video será reproducido enseguida',
          title: 'Agregado!',
          showConfirmButton: false,
          timer: 2500
        })
      }
    })
  },
  'click .play'() {
    VideoPlayer.play(this.video)
    swal({
      position: 'top-end',
      text: this.video.title,
      title: 'Reproduciendo!',
      showConfirmButton: false,
      timer: 2500
    })
  }
})
