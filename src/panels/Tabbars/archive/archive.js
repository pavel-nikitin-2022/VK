import React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    Panel,
    Spinner,
    PanelHeader,
} from "@vkontakte/vkui";

import {
    Icon36LogoVk,
} from '@vkontakte/icons';

import socket from '../../../socket';
import "@vkontakte/vkui/dist/vkui.css";
import GifList from "./fn_archive";
import '../main_page/main.css';

function Archive() {
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
                >
                    Архив
                </PanelHeader>
                {content}
                {warning}
            </Panel>
        </View>
    );
}

export default Archive;