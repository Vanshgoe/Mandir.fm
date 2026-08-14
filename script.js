const tracks = [
    {
        name: "Ram Siya",
        artist: "Sachet Tandon",
        file: "music/Ram Siya   Sachet Tandon.m4a"
    },
    {
        name: "Mangal Bhavan Amangal Hari",
        artist: "Ramayan Chaupai",
        file: "music/Ramayan_Chaupai_मगल_भवन_अमगल_हर_Lyrical_Video_Ravi_Raj_रमयण_चप.m4a"
    },
    {
        name: "Govind Bolo Hari Gopal Bolo",
        artist: "Anup Jalota",
        file: "music/Govind Bolo Hari Gopal Bolo   Anup Jalota.m4a"
    },
    {
        name: "Achyutam Keshavam",
        artist: "Shailendra Bharti • Milind Moh",
        file: "music/Achyutam_Keshvam_Krishn_Damodaram_Shailendra_Bharti_Milind_Moh.m4a"
    },
    {
        name: "Shree Hanuman Ji Ki Aarti",
        artist: "Hariharan",
        file: "music/Shree Hanuman Ji Ki Aarti   Hariharan.m4a"
    },
    {
        name: "Shree Hanuman Chalisa",
        artist: "Bhakti",
        file: "music/Shree Hanuman Chalisa.m4a"
    },
    {
        name: "Mahalaxmi Mantra",
        artist: "Anuradha Paudwal",
        file: "music/Mahalaxmi Mantra   Anuradha Paudwal.m4a"
    }
];


const audio = document.getElementById("audio");

const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");

const trackName = document.getElementById("trackName");
const artist = document.getElementById("artist");
const status = document.getElementById("status");

const playlist = document.getElementById("playlist");

let currentTrack = 0;



function loadTrack(index, autoplay=false){

    currentTrack = index;

    const track = tracks[currentTrack];


    audio.src = track.file;


    trackName.textContent = track.name;

    artist.textContent = track.artist;



    document.querySelectorAll(".song")
    .forEach((button,i)=>{

        button.classList.toggle(
            "active",
            i === currentTrack
        );

    });



    audio.load();



    if(autoplay){

        audio.play()
        .catch(error=>{
            console.log(error);
        });

    }

}



if(playlist){

    tracks.forEach((track,index)=>{


        const button = document.createElement("button");


        button.className = "song";


        button.textContent = track.name;



        button.onclick = ()=>{

            loadTrack(index,true);

        };


        playlist.appendChild(button);


    });

}





playButton.onclick = ()=>{


    if(audio.paused){

        audio.play()
        .catch(error=>{
            console.log(error);
        });

    }

    else{

        audio.pause();

    }


};





nextButton.onclick = ()=>{


    currentTrack++;


    if(currentTrack >= tracks.length){

        currentTrack = 0;

    }


    loadTrack(currentTrack,true);


};





function updatePlayer(){


    if(audio.paused){

        playButton.textContent = "▶";

        status.textContent = "paused";

    }

    else{

        playButton.textContent = "Ⅱ";

        status.textContent = "playing";

    }


}



audio.addEventListener(
"play",
updatePlayer
);


audio.addEventListener(
"pause",
updatePlayer
);





audio.addEventListener(
"ended",
()=>{


    currentTrack++;


    if(currentTrack >= tracks.length){

        currentTrack = 0;

    }


    loadTrack(currentTrack,true);


});






function updateClock(){


    const clock = document.getElementById("clock");


    if(clock){

        clock.textContent =
        new Date().toLocaleTimeString([],{

            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit"

        });

    }

}


setInterval(updateClock,1000);

updateClock();






if(navigator.geolocation){


navigator.geolocation.getCurrentPosition(

(position)=>{


fetch(
`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
)


.then(response=>response.json())


.then(data=>{


const location =
document.getElementById("location");


if(location){

location.textContent =
data.address.city ||
data.address.town ||
data.address.state ||
"Unknown";

}


})


.catch(()=>{


document.getElementById("location").textContent =
"Location unavailable";


});


},


()=>{


document.getElementById("location").textContent =
"Location unavailable";


}


);


}






loadTrack(0);