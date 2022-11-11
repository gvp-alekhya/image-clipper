import React, { useState, useRef } from 'react'


import ReactCrop, {
  centerCrop,
  Crop,
  PixelCrop,
  makeAspectCrop

} from 'react-image-crop'
import { canvasPreview } from './canvasPreview.ts'
import { useDebounceEffect } from './useDebounceEffect.ts'

import 'react-image-crop/dist/ReactCrop.css'


export default function App() {
  const imageDimensions = {
    height: 512,
    width: 512
  }
  const [imgSrc, setImgSrc] = useState('')
  const [blobUrl, setBlobUrl] = useState('')

  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [imgStyle, scaleImg] = useState({})
  const [scale, setScale] = useState(1)


  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    let crop = centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: 512,
          height: 512
        },
        1,
        imageDimensions.width,
        imageDimensions.height,
      ),
      imageDimensions.width,
      imageDimensions.height,
    )
    setCrop(crop)

  }

  function updateZoom(scale) {
    let style = {
      WebkitTransform: 'scale(' + scale + ')',
      transform: 'scale(' + scale + ')'
    }
    scaleImg(style);
    setScale(scale)

  }
  useDebounceEffect(
    async () => {

      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        completedCrop.height = imageDimensions.height;
        completedCrop.width = imageDimensions.width;
        let pro = canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale
        )

        pro.then(y => {
          setBlobUrl(y);
        })

      }
    },
    100,
    [completedCrop],
  )



  return (

    <div className="App">
      <div className="Crop-Controls">
        <input className="form-control" type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          locked
        >
          <div id="image-container">
            <img 
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              onLoad={onImageLoad}
              style={imgStyle}
              id="crop-pic"
            />
          </div>

        </ReactCrop>
        

      )}
      {!!imgSrc &&
      <div>
        <input type="range" min="1" max="4"  step="0.1" id="zoomer" value={scale} onChange={(event) => updateZoom(event.target.value)} />
       
          <a href={blobUrl} download className="btn btn-secondary" id="saveBtn">
            Save crop
          </a>
      </div>
      }
      
      <div >
        {!!completedCrop && (
          <canvas hidden
            ref={previewCanvasRef}
            style={{
              border: '16px solid black',
              objectFit: 'contain',
              width: imageDimensions.width,
              height: imageDimensions.height
            }}
          />
        )}
      </div>
    </div>
  )
}
