"use client"

import "./globals.css";
import HourlyView from "@/components/hourly-view";
import UserInfoView from "@/components/user-info-view";
import {useContext} from "react";
import AgendaContext from "@/contexts/agenda-context";

export default function Page() {

    const {agenda} = useContext(AgendaContext);


    return (!agenda) ?
        <h1>Loading...</h1> : (agenda.latLon) ?
            <HourlyView />
            :
            <UserInfoView />
}