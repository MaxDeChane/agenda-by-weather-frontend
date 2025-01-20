import {FormEvent, useEffect, useRef, useState} from "react";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";
import Agenda from "@/domain/agenda";

const WELCOME_MESSAGE = `Hello and welcome to the Agenda by Weather application. This application aims to help plan your agenda around the weather.
To do that, the application will need to know the location to collect the weather data from. For this please enter in an address that can be used to
get the location data needed. This could be a your home address, address of your city hall, or some random address.
Note: that the accuracy of the address will also determine the accuracy of your weather data.`

const agendaWeatherDao = AgendaWeatherDao.instance;

export type UserInfoViewInput = {
    readonly setAgenda: (agenda: Agenda) => void;

}

export default function UserInfoView({setAgenda}: UserInfoViewInput) {
   const [messageToDisplay, setMessageToDisplay] = useState("");

   // start at one since the first letter is consumed by default.
   const welcomeMessageIndexRef = useRef(0);
   const justPrintOutTextRef = useRef(false);

   useEffect(() => {
       if(!justPrintOutTextRef.current && welcomeMessageIndexRef.current < WELCOME_MESSAGE.length) {
           setTimeout(() => {
               // Assign to local variable here so it doesn't get updated underneath before the message
               // has time to update.
               let currentMessageIndex = welcomeMessageIndexRef.current;
               // Don't forget to update the welcome message index for the next pass.
               ++welcomeMessageIndexRef.current
               setMessageToDisplay((messageToDisplay) => messageToDisplay + WELCOME_MESSAGE[currentMessageIndex]);
           }, 50);
       } else {
           setMessageToDisplay(WELCOME_MESSAGE);
       }
   })

    const submitUserLocation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        // Access form data
        const formData = new FormData(event.currentTarget);
        const address = formData.get("address");

        if(address) {
            console.log(`Address to get latLon for is ${address}`);
            agendaWeatherDao.updateLatLonOnDefaultAgendaByAddress(address as string).then(updatedAgenda => {
                setAgenda(updatedAgenda);
            });
        }
    }

    const justPrintTextOrUserInputDisplay = (justPrintOutTextRef.current || welcomeMessageIndexRef.current >= WELCOME_MESSAGE.length) ?
        <form id="addressForWeatherDataForm" onSubmit={submitUserLocation} className="">
            <label id="addressInputLabel" htmlFor="addressInput">Please enter address for Weather Data:</label><br />
            <input id="addressInput" type="text" name="address" placeholder="2 East Main Street, Madison, WI 53702" className="w-96 text-black"/>
            <button id="addressInputSubmitButton" type="submit" className="bg-blue-950 ml-1">Submit</button>
        </form>
        :
        <button onClick={() => justPrintOutTextRef.current = true} className="bg-blue-950">Just Print Out The Text!</button>;

    return <div className="grid justify-center">
        <div className="container sm">
            <p className="p-20">{messageToDisplay}</p>
            <div className="grid justify-center">
                {justPrintTextOrUserInputDisplay}
            </div>
        </div>
    </div>
}