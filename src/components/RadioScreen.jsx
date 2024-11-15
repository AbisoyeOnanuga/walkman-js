// RadioScreen.jsx
import React, { useState, useEffect } from 'react';

const RadioScreen = ({ setCurrentAudio }) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('https://de1.api.radio-browser.info/json/stations/topclick/10')
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Error fetching radio stations:', error));
  }, []);

  const handlePlay = (station) => {
    if (typeof setCurrentAudio === 'function') {
      setCurrentAudio(station);
    } else {
      console.error('setCurrentAudio is not a function');
    }
  };

  return (
    <div className="radio-screen">
      <div className="header">
        <div className="status-icons">
          <div className="play-pause"></div>
          <div className="song-status"></div>
        </div>
        <div className="battery-icon"></div>
      </div>
      <div className="screen-content">
        {stations.map(station => (
          <div key={station.stationuuid} className="station">
            <p>{station.name}</p>
            <button onClick={() => handlePlay(station)}>Play</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioScreen;

/*
Name:        "CNN"
Url:         "https://tunein.cdnstream1.com/2868_96.mp3"
Homepage:    "https://www.cnn.com/"
Favicon:     "https://www.cnn.com/media/sites/cnn/favicon.ico"
Tags:        "news"
Countrycode: "US"
Country:     "The United States Of America"
State:       
Language:    "english"
GeoLat:      
GeoLong:

Name:        "Adroit Jazz Underground"
Url:         "https://icecast.walmradio.com:8443/jazz"
Homepage:    "https://walmradio.com/jazz"
Favicon:     "https://icecast.walmradio.com:8443/jazz.jpg"
Tags:        "avant-garde,bebop,big band,bop,combos,contemporary,contemporary jazz,cool,cool jazz,free jazz,fusion,hard bop,hd,mainstream,mainstream jazz,modern,modern big band,post-bop,straight-ahead,walm,west coast"
Countrycode: "US"
Country:     "The United States Of America"
State:       "Wisconsin"
Language:    "english"
GeoLat:      40.75166
GeoLong:     -73.97538

Name:        "Classic Vinyl HD"
Url:         "https://icecast.walmradio.com:8443/classic"
Homepage:    "https://walmradio.com/classic"
Favicon:     "https://icecast.walmradio.com:8443/classic.jpg"
Tags:        "1930,1940,1950,1960,beautiful music,big band,classic hits,crooners,easy,easy listening,hd,jazz,light orchestral,lounge,oldies,orchestral,otr,relaxation,strings,swing,unwind,walm"
Countrycode: "US"
Country:     "The United States Of America"
State:       "New York NY"
Language:    "english"
GeoLat:      40.75166
GeoLong:     -73.97538	

Name:        "BBC World Service"
Url:         "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service"
Homepage:    "https://www.bbc.co.uk/programmes/w172xzjgf6lxp7y"
Favicon:     "http://cdn-profiles.tunein.com/s24948/images/logoq.jpg?t=1"
Tags:        "news,talk"
Countrycode: "GB"
Country:     "The United Kingdom Of Great Britain And Northern Ireland"
State:       
Language:    "english"
GeoLat:      
GeoLong: 

	
Name:        "101 SMOOTH JAZZ"
Url:         "http://www.101smoothjazz.com/101-smoothjazz.m3u"
Homepage:    "http://101smoothjazz.com/"
Favicon:     "http://101smoothjazz.com/favicon.ico"
Tags:        "easy listening,jazz,smooth jazz"
Countrycode: "US"
Country:     "The United States Of America"
State:       "California"
Language:    "english"
GeoLat:        \   \ \ \ \ \   \                                           
GeoLong:

Name:        "Deutschlandfunk [MP3 128k]"
Url:         "http://st01.dlf.de/dlf/01/128/mp3/stream.mp3"
Homepage:    "http://www.deutschlandfunk.de/"
Favicon:     "http://www.deutschlandfunk.de/static/img/deutschlandfunk/icons/apple-touch-icon-128x128.png"
Tags:        "cultural news,culture,information,kultur,news"
Countrycode: "DE"
Country:     "Germany"
State:       
Language:    "german"
GeoLat:      
GeoLong:

Name:        "Radio Paradise (320k)"
Url:         "http://stream-uk1.radioparadise.com/aac-320"
Homepage:    "https://www.radioparadise.com/"
Favicon:     "https://www.radioparadise.com/favicon-32x32.png"
Tags:        "california,eclectic,free,internet,non-commercial,paradise,radio"
Countrycode: "US"
Country:     "The United States Of America"
State:       "California"
Language:    "english"
GeoLat:      
GeoLong:

Name:        "Christmas Vinyl HD"
Url:         "https://icecast.walmradio.com:8443/christmas"
Homepage:    "https://walmradio.com/christmas"
Favicon:     "https://icecast.walmradio.com:8443/christmas.png"
Tags:        "christian,christmas,easy listening,hd,holiday,otr,seasonal,vintage,vinyl,walm"
Countrycode: "US"
Country:     "The United States Of America"
State:       "New York NY"
Language:    "english"
GeoLat:      40.75166
GeoLong:     -73.97538
	
Name:        "WALM - Old Time Radio"
Url:         "https://icecast.walmradio.com:8443/otr"
Homepage:    "https://walmradio.com/otr"
Favicon:     "https://icecast.walmradio.com:8443/otr.jpg"
Tags:        "78,78-rpm,78rpm,classic,comedy,drama,easy listening,musical,mystery,old time radio,otr,sci-fi,v-disc,vintage,walm"
Countrycode: "US"
Country:     "The United States Of America"
State:       "New York"
Language:    
GeoLat:      40.75166
GeoLong:     -73.97538
	
Name:        "Europa Plus"
Url:         "http://ep256.hostingradio.ru:8052/europaplus256.mp3"
Homepage:    "http://www.europaplus.ru/"
Favicon:     "http://liveam.tv/img/2494.jpg"
Tags:        "dance,house,pop"
Countrycode: "RU"
Country:     "The Russian Federation"
State:       "Moscow"
Language:    "russian"
GeoLat:      
GeoLong: 
	
Name:        "SWR3"
Url:         "https://liveradio.swr.de/sw282p3/swr3/play.mp3"
Homepage:    "https://swr3.de/"
Favicon:     "https://swr3.de/assets/swr3/icons/apple-touch-icon.png"
Tags:        "news,pop,rock"
Countrycode: "DE"
Country:     "Germany"
State:       "Baden-Württemberg"
Language:    "german"
GeoLat:      
GeoLong:
	
Name:        "1LIVE"
Url:         "http://wdr-1live-live.icecast.wdr.de/wdr/1live/live/mp3/128/stream.mp3"
Homepage:    "https://einslive.de/"
Favicon:     "https://www1.wdr.de/radio/1live/resources/img/favicon/apple-touch-icon.png"
Tags:        "ard,public radio,rock,top 40,wdr"
Countrycode: "DE"
Country:     "Germany"
State:       "North Rhine-Westphalia"
Language:    "german"
GeoLat:      
GeoLong:
	
Name:        "Fox News Radio"
Url:         "https://live.amperwave.net/direct/foxnewsradio-foxnewsradioaac-imc?source=fnr.web"
Homepage:    "https://radio.foxnews.com/"
Favicon:     "https://static.foxnews.com/radio.foxnews.com/content/uploads/2017/10/default_logo-150x150.png"
Tags:        "news"
Countrycode: "US"
Country:     "The United States Of America"
State:       
Language:    "american english"
GeoLat:      
GeoLong:

Name:        "WALM HD"
Url:         "https://icecast.walmradio.com:8443/walm"
Homepage:    "https://walmradio.com/walm"
Favicon:     "https://icecast.walmradio.com:8443/walm.jpg"
Tags:        "christian,christian music,contemporary christian,jesus"
Countrycode: "US"
Country:     "The United States Of America"
State:       "New York NY"
Language:    "english"
GeoLat:      40.75166
GeoLong:     -73.97538

Name:        "Iran International (HTTPS stream)"
Url:         "https://stream.radiojar.com/iintl_c"
Homepage:    "https://www.iranintl.com/"
Favicon:     "https://www.iranintl.com/favicon.ico"
Tags:        
Countrycode: "IR"
Country:     "Islamic Republic Of Iran"
State:       
Language:    "persian"
GeoLat:      
GeoLong:
	
Name:        "LBC UK"
Url:         "http://media-ice.musicradio.com/LBCUK"
Homepage:    "https://www.lbc.co.uk/"
Favicon:     "https://cdn-radiotime-logos.tunein.com/s220687q.png"
Tags:        "news talk,talk"
Countrycode: "GB"
Country:     "The United Kingdom Of Great Britain And Northern Ireland"
State:       
Language:    
GeoLat:      
GeoLong: 
	
Name:        "Cadena SER España"
Url:         "http://playerservices.streamtheworld.com/api/livestream-redirect/CADENASER.mp3"
Homepage:    "http://play.cadenaser.com/"
Favicon:     
Tags:        "cultural news,live,news,news talk,spanish,sports news"
Countrycode: "ES"
Country:     "Spain"
State:       "Spain"
Language:    "spanish"
GeoLat:      
GeoLong: 	

Name:        "NPO Radio 1"
Url:         "http://icecast.omroep.nl/radio1-bb-mp3"
Homepage:    "http://www.radio1.nl/"
Favicon:     "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/NPO_Radio_1_logo_2014.svg/640px-NPO_Radio_1_logo_2014.svg.png"
Tags:        "news"
Countrycode: "NL"
Country:     "The Netherlands"
State:       
Language:    "dutch"
GeoLat:      
GeoLong:

Name:	       "REYFM - #original"
Url:	       "https://listen.reyfm.de/original_192kbps.mp3"
Homepage:	   "https://www.reyfm.de/"
Favicon:	   "https://www.reyfm.de/_nuxt/icons/icon_64x64.88ab9f.png"
Tags:	       "#original,fm,rey,reyfm"
	
Name:        "Jazz Radio Blues"
Url:         "http://jazzblues.ice.infomaniak.ch/jazzblues-high.mp3"
Homepage:    "http://www.jazzradio.fr/radio/webradio/3/blues"
Favicon:     "https://www.jazzradio.fr/apple-touch-icon-120x120.png"
Tags:        "blues,jazz"
Countrycode: "FR"
Country:     "France"
State:       
Language:    "french"
GeoLat:      
GeoLong:  
	
Name:        "Classic FM UK"
Url:         "http://ice-the.musicradio.com/ClassicFMMP3"
Homepage:    "http://www.classicfm.com/"
Favicon:     "http://www.classicfm.com/assets_v4r/classic/img/favicon-196x196.png"
Tags:        "classical"
Countrycode: "GB"
Country:     "The United Kingdom Of Great Britain And Northern Ireland"
State:       "London"
Language:    "english"
GeoLat:      
GeoLong:  

Name:        "NPR 24 Hour Program Stream"
Url:         "http://npr-ice.streamguys1.com/live.mp3"
Homepage:    "https://www.npr.org/2016/04/05/472557877/npr-program-stream"
Favicon:     "https://static-assets.npr.org/static/images/favicon/favicon-96x96.png"
Tags:        "news,news talk,political talk,politics,public radio,talk"
Countrycode: "US"
Country:     "The United States Of America"
State:       
Language:    "english"
GeoLat:      
GeoLong:  
	
Name:        "MSNBC"
Url:         "https://tunein.cdnstream1.com/3511_96.mp3"
Homepage:    "https://www.msnbc.com/"
Favicon:     "https://nodeassets.nbcnews.com/cdnassets/projects/ramen/favicon/msnbc/all-other-sizes-PNG.ico/favicon-96x96.png"
Tags:        "news"
Countrycode: "US"
Country:     "The United States Of America"
State:       
Language:    "english"
GeoLat:      
GeoLong:    
	
Name:        "SomaFM Groove Salad"
Url:         "http://ice1.somafm.com/groovesalad-256-mp3"
Homepage:    "http://somafm.com/groovesalad/"
Favicon:     "https://somafm.com/img3/groovesalad-400.jpg"
Tags:        "ambient,chillout,downtempo,groove,lounge,sleep"
Countrycode: "US"
Country:     "The United States Of America"
State:       "California"
Language:    
GeoLat:      
GeoLong: 

Name:        "Ambient Sleeping Pill"
Url:         "http://radio.stereoscenic.com/asp-h"
Homepage:    "http://ambientsleepingpill.com/"
Favicon:     "https://ambientsleepingpill.com/wp-content/uploads/cropped-asp-small-logo-512-trans-180x180.png"
Tags:        "ambient,meditation,sleep"
Countrycode: "US"
Country:     "The United States Of America"
State:       "Ohio"
Language:    "english"
GeoLat:      
GeoLong: 

Name:        "Radio Simba"
Url:         "https://www.radiosimba.ug/stream"
Homepage:    "https://www.radiosimba.ug/"
Favicon:     "https://www.radiosimba.ug/wp-content/uploads/2022/03/cropped-favicon-32x32-1-180x180.png"
Tags:        
Countrycode: "UG"
Country:     "Uganda"
State:       
Language:    "luganda"
GeoLat:      
GeoLong:
*/