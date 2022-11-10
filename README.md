# Getting Started with Image Clipper App
 Image Clipper App allows the user to upload any image and snip it to 512x512 thumnail size images.
 User can then download the image to any location using the "Save" button

 Implementation Details:
 React has a built in component "React Crop" that can crop images. I have used this as it has all the accessibility features and also supports multiple devices which is key feature of my web application.

 Documentation: https://www.npmjs.com/package/react-image-crop

 I have used a  canvas to draw the cropped image, the canvas acts like a temporary buffer to capture the snip.
 To support the download capability, I am getting the HTMLElement URL and updating to the button href, thereby leveraging the HTML5 "download" attribute.


This project was bootstrapped with [Image Clipper App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

