"use client"

import "./globals.css";
import DateTimeService from "@/service/date-time-service";
import HourlyView from "@/components/hourly-view";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";
import UserInfoView from "@/components/user-info-view";
import Agenda from "@/domain/agenda";
import {useEffect, useState} from "react";

const dateTimeService = DateTimeService.instance;
const agendaWeatherDao = AgendaWeatherDao.instance;

export default function Page() {

    const [currentDate, setCurrentDate] = useState(dateTimeService.roundDateDownToDay(new Date()));
    const [agenda, setAgenda] = useState<Agenda>()

    // Effect to do only on initial load
    useEffect(() => {
        if(!agenda) {
            agendaWeatherDao.makeInitialRequest().then(agenda => {
                setAgenda(agenda);
            })
        }
    }, [agenda])

    return (!agenda) ?
        <h1>Loading...</h1> : (agenda.latLon) ?
            <HourlyView agenda={agenda} />
            :
            <UserInfoView setAgenda={setAgenda}></UserInfoView>
}