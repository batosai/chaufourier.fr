import { AttachmentConfig } from '@ioc:Adonis/Addons/AttachmentAdvanced'

const attachmentConfig: AttachmentConfig = {
  document: {
    previews: {
      thumbnail: {
        resize: 300,
        format: 'webp',
      },
      large: {
        resize: 1024,
        format: 'jpg',
      },
    },
  },
  video: {
    previews: {
      thumbnail: {
        resize: 1024,
        format: 'jpg',
      },
      large: {
        resize: 1500,
        format: 'jpg',
      },
    },
  },
  pdf: {
    // bin: '/usr/bin',
    previews: {
      thumbnail: {
        resize: 300,
        format: 'jpg',
      },
    },
  },
  // pdf: false,
  image: {
    variants: {
      thumbnail: {
        resize: 250,
        format: 'jpg',
      },
      medium: {
        resize: 345,
        format: 'jpg',
      },
      medium2x: {
        resize: 690,
        format: 'webp',
      },
      large: {
        resize: 800,
        format: 'jpg',
      },
      large2x: {
        resize: 1600,
        format: 'webp',
      },
    },
  },
}

export default attachmentConfig
