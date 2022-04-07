import React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
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

import socket from '../../../socket';
import "@vkontakte/vkui/dist/vkui.css";
import GifList from "../main_page/fn_main";
import '../main_page/main.css';

function Archive({ fn, req }) {
    const [gifs, setUpdateGifs] = useState([])
    const [loader, setActiveLoader] = useState(<Spinner className='Spinner' size="large" />)
    const [warning, setActiveWarning] = useState(null)

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                socket.emit("get_archive");
                socket.on("archive", (res) => {
                    if (!cleanupFunction) {
                        console.log(res)
                        setUpdateGifs(res);
                        setActiveLoader(null);
                    }
                })
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData();

        return () => cleanupFunction = true;
    }, []);

    const content = (
        <>
            {loader}
            {gifs.length > 0 && (<GifList list={gifs} fn={setActiveWarning} />)}
        </>
    );

    return (
        <View activePanel="archive">
            <Panel id="archive">
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
        </View>
    );
}

export default Archive;