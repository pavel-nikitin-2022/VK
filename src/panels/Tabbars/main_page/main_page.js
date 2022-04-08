import './main.css';
import React from 'react';
import Video from './video';
import Searcher from './search';
import { useState } from 'react';
import {View} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function MainPage() {
    const [panel, setActivePanel] = useState("video")
    const [req, setChangereq] = useState("")
    return (
        <View activePanel={panel}>
            <Video id="video" fn={setActivePanel} req={req}/>
            <Searcher id="search" fn={setActivePanel} fn2={setChangereq}/>
        </View>
    );
}

export default MainPage;