import React from 'react';
import { useState, useEffect } from 'react';
import {
    Panel,
    Spinner,
    PanelHeader,
    PanelHeaderButton,
} from "@vkontakte/vkui";

import {
    Icon36LogoVk,
    Icon28SettingsOutline,
    Icon28SearchOutline,
} from '@vkontakte/icons';

import "@vkontakte/vkui/dist/vkui.css";
import GifList from "./fn_main";
import './main.css';

function Video({ fn, req }) {
    const [gifs, setUpdateGifs] = useState([])
    const [loader, setActiveLoader] = useState(<Spinner className='Spinner' size="large" />)
    const [warning, setActiveWarning] = useState(null)

    const content = (
        <>
            {loader}
            {gifs.length > 0 && (<GifList list={gifs} fn={setActiveWarning} />)}
        </>
    );

    useEffect(() => {
        fetch("https://api.giphy.com/v1/gifs/search?api_key=FIT3iKsgACVpAQtlwWiZUMCPi5F71t2z&q=" + req).then(response => response.json()).then(content => {
            content.data.forEach(element => {
                gifs.push([element.images.downsized, element.images.downsized_still.url]);
            });
            setUpdateGifs(gifs);
            if (gifs.length > 0) {
                setActiveLoader(null);
            }
        })
    }, [])

    return (
        <Panel>
            <PanelHeader
                left={<Icon36LogoVk />}
                right={
                    <React.Fragment>
                        <PanelHeaderButton
                            aria-label="Поиск"
                            onClick={() => fn("search")}
                        >
                            <Icon28SearchOutline />
                        </PanelHeaderButton>

                        <PanelHeaderButton aria-label="Настройки">
                            <Icon28SettingsOutline />
                        </PanelHeaderButton>
                    </React.Fragment>
                }
            >
                Гифки
            </PanelHeader>
            {content}
            {warning}
        </Panel>
    );
}

export default Video;