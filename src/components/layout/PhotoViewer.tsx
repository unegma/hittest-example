import {PhotoProvider, PhotoView} from "react-photo-view";
import React from "react";
import 'react-photo-view/dist/react-photo-view.css';



export default function PhotoViewer({showImages}: {showImages: boolean}) {

  return (
    <div className={`slide-out-gallery ${showImages ? 'slide-in' : 'slide-out'}`}>
      <PhotoProvider>
        <div className="slide-out-gallery-container">
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
          <PhotoView src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`}>
            <img className="slide-out-gallery-image" src={`${process.env.REACT_APP_ASSETS_URL}/ark.jpeg`} alt=""/>
          </PhotoView>
        </div>
      </PhotoProvider>
    </div>
  );
}
