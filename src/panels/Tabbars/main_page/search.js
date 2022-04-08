import React from 'react';
import { useState, useEffect } from 'react';
import {
    Panel,
    PanelHeader,
    Search,
    PanelHeaderBack,
    PanelHeaderButton,
    Placeholder,
} from "@vkontakte/vkui";

import {
    Icon56SearchOutline,
    Icon28SendOutline
} from '@vkontakte/icons';

import "@vkontakte/vkui/dist/vkui.css";
import './main.css';

function Searcher({ fn, fn2 }) {
    const [value, setChangeValue] = useState("");
    return (
        <Panel>
            <PanelHeader
                right={
                    <PanelHeaderButton
                        className='Search'
                        aria-label="Найти"
                        onClick={() => {
                            fn2(value)
                            fn("video")
                        }}
                    >
                        <Icon28SendOutline />
                    </PanelHeaderButton>}
                left={
                    <PanelHeaderBack
                        onClick={() => fn("video")}
                    />
                }>
                <Search onChange={(e)=>{setChangeValue(e.target.value)}} placeholder="/gif + что ты ищешь" after={null} />
            </PanelHeader>
            <Placeholder className='Placeholder' icon={<Icon56SearchOutline />}>
                Найди свою любимую картинку ;)
            </Placeholder>
        </Panel>
    );
}

export default Searcher;