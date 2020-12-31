import Meetup from './dom-parser/meetup.com';
import Facebook from './dom-parser/facebook';


window.onload = function () {

    if(window.location.href.includes('meetup.com')){
        new Meetup();
    }
    else if(window.location.href.includes('facebook.com')){
        new Facebook();
    }

}
