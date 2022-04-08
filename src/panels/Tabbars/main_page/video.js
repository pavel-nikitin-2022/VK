import React from 'react';
import { useState, useEffect } from 'react';
import {
    Panel,
    Spinner,
    PanelHeader,
    PanelHeaderButton,
    Snackbar
} from "@vkontakte/vkui";

import {
    Icon36LogoVk,
    Icon28SettingsOutline,
    Icon28SearchOutline,
} from '@vkontakte/icons';

import "@vkontakte/vkui/dist/vkui.css";
import GifList from "./fn_main";
import './main.css';
import socket from '../../../socket';

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
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                if (req == "") {
                    fetch("https://api.giphy.com/v1/stickers/trending?api_key=FIT3iKsgACVpAQtlwWiZUMCPi5F71t2z").then(response => response.json()).then(content => {
                    content.data.forEach(element => {
                        gifs.push([element.images.downsized, element.images.downsized_still.url]);
                    });
                    setUpdateGifs(gifs);
                    if (gifs.length > 0) {
                        setActiveLoader(null);
                    }
                })
                }
                else {
                    fetch("https://api.giphy.com/v1/gifs/search?api_key=FIT3iKsgACVpAQtlwWiZUMCPi5F71t2z&q=" + req).then(response => response.json()).then(content => {
                        content.data.forEach(element => {
                            gifs.push([element.images.downsized, element.images.downsized_still.url]);
                        });
                        setUpdateGifs(gifs);
                        if (gifs.length > 0) {
                            setActiveLoader(null);
                        }
                    })
                }

                
                socket.on("add", (answer) => {
                    if (!cleanupFunction) {
                        if (answer) {
                            setActiveWarning(<Snackbar onClose={() => setActiveWarning(null)}>Добавлен в архив</Snackbar>)
                        }
                        else {
                            setActiveWarning(<Snackbar onClose={() => setActiveWarning(null)}>Уже существует</Snackbar>)
                        }
                    }
                })
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData();
        // функция очистки useEffect
        return () => cleanupFunction = true;
    }, []);

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