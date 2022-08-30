# Google Maps Javascript

### To Run project

- Open project folder in a Terminal and run the following command
```bash
npm start
```

### Tasks

- This Project is a follow up  of a tutorial.
- You search some location google maps so a marker is set on that location.
- 3 Circles are drawn around it with diffrent radius.
- Each circle is colured based on radius as to near, far and too far.
- Other markers are randomly generated around the  by a function named generatehouses.
- By Clicking on marker can see the path towards the marker here (named office).
- Also showing distance from the clicked marker to the office marker.
- and some other tasks are also being done.

## Environment Variables

To run this peoject you have to put your Google API key in ```App.js``` file


`googleMapsApiKey` = Google API_KEY



## Some important Functions
- Function returns given amount of houses (markers) around the office marker
- It takes an argumnet `position` that is the position (coordinates {lat,lng}) of the office marker or could be anything around which you want to generate markers.
- **Could be used to generate markers of cars or some other things by taking cars coords from DB and passing the array of coords to this function by modifing it a little bit.**
```js 
const generateHouses = (position)=>{ /
    const houses = [];  
    for(let i=0; i<50; i++){
        const direction = Math.random()< 0.5 ? -2 :2
        houses.push({
            lat:position.lat + Math.random() / direction,
            lng: position.lng + Math.random() / direction
        });
    }
    return houses;
};
```
---
- This function is used to give directions/path towards a destination
- It takes an argument house which is basically a coordinate ({lat,lng}).
- inside fucntion `destination` is basically also a coordinate {lat,lng}. it is to where the path should be drawn meaning destination.
```js
const fetchDirections =(house)=>{ 
        if(!office) return ;
        
        const service = new window.google.maps.DirectionsService();
        service.route({
            origin:house,
            destination:office,
            travelMode:window.google.maps.TravelMode.DRIVING
        },(result, status)=>{
            if(status === 'OK' && result){
                setDirections(result);
            }
        })
    }
```

---

See `Places.jsx` for google search a location or google maps search suggestions.



## License

[MIT](https://choosealicense.com/licenses/mit/)

