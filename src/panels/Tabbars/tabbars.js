import React from 'react';
import { useState } from 'react';
import {
    Icon28HomeOutline,
    Icon28CubeBoxOutline,
    Icon28MessageOutline,
} from '@vkontakte/icons';
import {
    Tabbar,
    TabbarItem,
    Search,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

export default function TabbarMain({ setTabbar, setSimple, simple }) {
    return (
        <Tabbar>
            <TabbarItem text="главная" selected={simple === "main"} onClick={() => setSimple("main")}>
                <Icon28HomeOutline />
            </TabbarItem>
            <TabbarItem text="мессенджер" selected={simple === "mes"} onClick={() => {
                setSimple("mes");
                setTabbar(<TabbarMes/>)
            }}>
                <Icon28MessageOutline />
            </TabbarItem>
            <TabbarItem text="архив" selected={simple === "archive"} onClick={() => setSimple("archive")}>
                <Icon28CubeBoxOutline />
            </TabbarItem>
        </Tabbar>
    )
}

function TabbarMes() {
    return (
        <Tabbar>
            <Search></Search>
        </Tabbar>
    )
}