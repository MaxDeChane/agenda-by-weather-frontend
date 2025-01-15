import {useEffect, useRef, useState} from "react";

const WELCOME_MESSAGE = `Hello and welcome to the Agenda by Weather application. This application aims to help plan your agenda around the weather.
To do that, the application will need to know the location to collect the weather data from. For this please enter in an address that can be used to
get the location data needed. This could be a your home address, address of your city hall, or some random address.
Note: that the accuracy of the address will also determine the accuracy of your weather data.`

export default function UserInfoView() {
   const [messageToDisplay, setMessageToDisplay] = useState("");

   // start at one since the first letter is consumed by default.
   const welcomeMessageIndexRef = useRef(0);

   useEffect(() => {

       if(welcomeMessageIndexRef.current < WELCOME_MESSAGE.length) {
           setTimeout(() => {
               // Assign to local variable here so it doesn't get updated underneath before the message
               // has time to update.
               let currentMessageIndex = welcomeMessageIndexRef.current;
               // Don't forget to update the welcome message index for the next pass.
               ++welcomeMessageIndexRef.current
               setMessageToDisplay((messageToDisplay) => messageToDisplay + WELCOME_MESSAGE[currentMessageIndex]);
           }, 50);
       }
   })

   return <h1>{messageToDisplay}</h1>
}