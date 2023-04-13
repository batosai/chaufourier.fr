
import { AttachmentConfig } from '@ioc:Adonis/Addons/AttachmentAdvanced'
import sharp from 'sharp'

const attachmentConfig: AttachmentConfig = {
  document: {
    previews: {
      thumbnail: {
        resize: 300,
        format: 'webp'
      },
      large: {
        resize: 1024,
        format: 'jpg'
      },
    }
  },
  video: {
    previews: {
      thumbnail: {
        resize: 1024,
        format: 'jpg'
      },
    }
  },
  pdf: {
    // bin: '/usr/bin',
    previews: {
      thumbnail: {
        resize: 300,
        format: 'jpg'
      },
    }
  },
  // pdf: false,
  image: {
    variants: {
      square: {
        resize: {
          width: 200,
          height: 200,
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy
        }
      },
      bg: {
        resize: {
          width: 200,
          height: 300,
          kernel: sharp.kernel.nearest,
          fit: 'contain',
          position: 'right top',
          background: { r: 255, g: 0, b: 0, alpha: 0.5 }
        }
      },
      thumbnail: {
        resize: 300,
        format: 'jpg'
      },
      medium: {
        resize: {
          width: 500,
          fit: 'contain',
          position: 'right top',
        },
        format: [ 'jpg', {
            quality: 10,
            progressive: true
        }]
      },
      large: {
        resize: 1500,
        format: 'jpg'
      }
    }
  }
}

export default attachmentConfig
/*
TODO

- Fork and pull request attachment-lite

----- temps 2

- geoloc

- from buffer

- test minio
- test by docker for ffmpeg, poppler, libreoffice



      'application/epub',
      'application/x-mobipocket-ebook', // mobi
      'application/vnd.comicbook-rar', // cbr
      'application/vnd.comicbook', // cbz
*/
