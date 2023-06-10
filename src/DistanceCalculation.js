const { acos,sin,cos,pi} = require('mathjs')
// we should convert degrees minutes and seconds of arc to kilometers or meters to find the distance

// to do this we use HAVERSINE formula 

export function myFunction(userLat,userLon,docLat,docLon) {
  // let distanceInKms
  // "lat": "14.416861237813764",
  // "lon": "79.96003912600274",
  userLat = deg2rad(userLat)
  userLon = deg2rad(userLon)
  docLat = deg2rad(docLat)
  docLon = deg2rad(docLon)

  // console.log(sin(userLat))
  // distanceInKms= acos((sin(userLat)*sin(docLat)))
  // console.log(typeof(distanceInKms),distanceInKms)
  // distanceInKms=6371.0*acos[cos(userLat)*cos(docLat)*cos(userLon-docLon)]
  // console.log(typeof(distanceInKms),distanceInKms)

  let distanceInKms=6371.0* acos( sin(userLat)*sin(docLat) +cos(userLat)*cos(docLat)*cos(userLon-docLon))
  // console.log(distanceInKms)
  return Number(distanceInKms).toFixed(2);
}
// console.log(myFunction())

function deg2rad(deg) {
  return deg * (pi/180)
}
