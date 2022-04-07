import React from 'react';
import { useState } from 'react';
import {
    Div,
    Button,
    List,
    Snackbar,
    Spinner,
} from "@vkontakte/vkui";
import { Icon28LikeOutline, Icon28LikeFillRed, Icon28CubeBoxOutline, Icon28BoxHeartOutline } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";
import './main.css';
import socket from '../../../socket';

function GifCard({ data, id, fn }) {
    const [like, setActivelike] = useState(false)
    const [arch, setArch] = useState(false)
    const [load, setActiveLoad] = useState(<Spinner className='Spinner' size="large" />)
    const [load_gif, set_load_gif] = useState(false)

    return (
        <div id={id} className='Card'>
            <div style={{ opacity: "0", width: "90%" }}>
                {load}
                <img width="100%" src={data[1]}></img>
                <Div className='Div'>
                    <input style={{ width: "90%", height: "30px", border: "none", backgroundColor: "#e9ecf1", borderRadius: "10px" }}></input>
                </Div>
            </div>

            <div className="Back">
                {!load && <img src={data[0].url} onLoad={() => { set_load_gif(true) }} loading="lazy" width="100%"></img>}
                <Div className='Div'>
                    <button onClick={() => {
                        if (!arch){
                            socket.emit("save", data);
                        } 
                        else{
                            socket.emit("delete", data);
                        }
                        setArch(!arch)
                    }}>
                        {!arch && <Icon28CubeBoxOutline />}
                        {arch && <Icon28BoxHeartOutline />}
                    </button>
                    <Button onClick={() => {
                        document.getElementById(id).classList.remove("active")
                    }} size="s" style={{ marginLeft: "30px" }} mode="tertiary">Назад</Button>
                </Div>
            </div>

            <div className="Front">
                {load}
                <img loading="lazy" width="100%" src={data[1]} onLoad={() => { setActiveLoad(null) }}></img>
                <Div className='Div'>
                    <button onClick={() => setActivelike(!like)}>
                        {!like && <Icon28LikeOutline />}
                        {like && <Icon28LikeFillRed />}
                    </button>
                    <Button onClick={() => {
                        if (load_gif) {
                            document.getElementById(id).classList.add("active")
                        }
                        else {
                            fn(<Snackbar onClose={() => fn(null)}>Загрузка идет</Snackbar>)
                        }
                    }} size="s" style={{ marginLeft: "30px" }} mode="tertiary">Посмотреть</Button>
                </Div>
            </div>
        </div>
    )
}

function GifList({ list, fn }) {
    return (
        <List width="100%">
            {list.map((data, i) => {
                return (
                    <GifCard key={i} data={data} id={i} fn={fn} />
                );
            })}
        </List>
    );
}

export default GifList;