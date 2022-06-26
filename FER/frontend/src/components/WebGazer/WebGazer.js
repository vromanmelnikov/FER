// include() 

// class Webgazer {

//     webgazer = 0
//     listener = 0

//     constructor() {
//         var script = document.createElement('script');
//         script.src = 'https://webgazer.cs.brown.edu/webgazer.js?';
//         document.getElementsByTagName('head')[0].appendChild(script);

//         // setTimeout(
//         //     async () => {

//         //     }, 1000

//         // )
//         this.webgazer = window.webgazer
//         this.listener = this.webgazer.setGazeListener(
//             (data) => {

//             }
//         )
//         console.log(this.listener)
//     }

//     startDetection = () => {
//         this.listener.begin()
//         this.webgazer.showVideoPreview(false);
//     }

//     stopDetection = () => {
//         this.listener.end()
//     }

//     pauseDetection = () => {
//         this.webgazer.pause()
//     }

//     resumeDetection = () => {
//         this.webgazer.resume()
//     }

//     getPosition = () => {
//         const position = this.webgazer.getCurrentPrediction().then(
//             (data) => {
//                 console.log(data)
//                 return data
//             }
//         )
//     }
// }

// const webgazer = require('webgazer')

let WebGazer = async () => {

    // console.log(webgazer)

    // let webgazer = window.webgazer
    // let listener = webgazer.setGazeListener(
    //     () => {

    //     }
    // )
    // listener.begin()
    // // console.log(webgazer)
    // webgazer.showVideoPreview(false)
}

export default WebGazer