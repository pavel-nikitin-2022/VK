import React from 'react';
import { useState } from 'react';
import {
    Icon28HomeOutline,
    Icon28CubeBoxOutline,
    Icon28MessageOutline,
} from '@vkontakte/icons';
import {
    Epic,
    Tabbar,
    TabbarItem,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import MainPage from './Tabbars/main_page/main_page';
import Messenger from './Tabbars/messenger/messenger';
import Archive from './Tabbars/archive/archive';

function Main({setActiveModal}) {
    const [simple, setSimple] = useState("main");
    
    return (
        <Epic activeStory={simple} tabbar={
            <Tabbar>
                <TabbarItem text="главная" selected={simple === "main"} onClick={() => setSimple("main")}>
                    <Icon28HomeOutline />
                </TabbarItem>
                <TabbarItem text="мессенджер" selected={simple === "mes"} onClick={() => setSimple("mes")}>
                    <Icon28MessageOutline />
                </TabbarItem>
                <TabbarItem text="архив" selected={simple === "archive"} onClick={() => setSimple("archive")}>
                    <Icon28CubeBoxOutline />
                </TabbarItem>
            </Tabbar>
        }>
            <MainPage id="main" />
            <Messenger id="mes" setActiveModal={setActiveModal} setSimple={setSimple}/>
            <Archive id="archive"/>
        </Epic>
    );
}

export default Main;