import { PixelCrop } from 'react-image-crop'

const TO_RADIANS = Math.PI / 180

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale: 1
) {

  const ctx = canvas.getContext('2d')
 

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = (image.naturalWidth / image.width )
  const scaleY = (image.naturalHeight / image.height) 
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio
 

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  ctx.save()

  // Move the crop origin to the canvas origin (0,0)
   ctx.translate(-cropX, -cropY)

   // Zoom or scale around the center
   ctx.translate(centerX, centerY)

    ctx.scale(scale, scale)
    ctx.translate(-centerX, -centerY)
 
  
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()
  
  return  canvas.toDataURL();
}
