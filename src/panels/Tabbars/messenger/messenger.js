import React from 'react';
import socket from "../../../socket";
import { useState, useEffect } from 'react';
import { Button, Progress, Gallery, List, Div, Avatar, View, FixedLayout, WriteBar, WriteBarIcon, PanelHeader, PanelHeaderContent, PanelHeaderBack, Spinner } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import './style.css';
import { Icon20ShareExternalOutline } from '@vkontakte/icons';

function Messages(array) {
    return (
        <List id="content">
            {array.array.map((value, key) => {
               if (value[1] == "t") return (<Div className="message" key={key} style={{ padding: "7px", maxWidth: "70%" }}><span style={{ maxWidth: "100%", color: "white", backgroundColor: "#597ba0", borderRadius: "10px", padding: "10px" }}>{value[0]}</span></Div>)
               if (value[1] == "g") return (<Div className="message" key={key} style={{ padding: "7px", maxWidth: "70%" }}><img src={value[0]} width="100%"></img></Div>)
            })}
        </List>
    )
}

function Galler({ list, loader }) {
    const [a, b] = useState(0)
    if (a == list.length) {
        document.getElementById("gal").style.opacity = 1
    }
    return (
        <div style={{ borderTop: "0.5px solid #b8b8bb", height: 190, borderRadius: 10, backgroundColor: "white" }}>
            {a != list.length && (<Progress style={{ marginTop: 160 }} value={a / list.length * 100} />)}
            <Gallery onChange={(a) => {
                if (document.querySelector(".choosen")) document.querySelector(".choosen").classList.remove("choosen")
                document.getElementById(a).classList.add("choosen")
            }}
                id="gal"
                align="center"
                slideWidth="custom"
                isDraggable
                style={{transition: "1s", borderTop: "0.5px solid #b8b8bb", height: 150, borderRadius: 10, backgroundColor: "white", padding: "30px", opacity: 0 }}
            >
                {list.map((data, i) => {
                    return (
                        <Card key={i} data={data} id={i} updateCount={b} count={a} stopShow={loader} />
                    );
                })}
            </Gallery>
        </div>
    )
}

function Card({ data, id, updateCount, count, stopShow }) {
    const [load1, setLoad1] = useState(false)
    return (
        <div id={id} className='Card1'>
            <img onClick={()=>{ stopShow([]); socket.emit("send", [data[0].url, "g"])}}  onLoad={() => { setLoad1(true); updateCount(count + 1) }} src={data[1]} style={{ opacity: 1, position: "relative", top: 15 }} height="90%" />
            {load1 && <img onClick={()=>{document.getElementById("writebar").value = null; stopShow([]); socket.emit("send", [data[0].url, "g"])}} onLoad={() => { document.getElementById(id).opacity = 0; }} loading='lazy' src={data[0].url} style={{ position: "absolute", top: 15, left: 0, bottom: 0, right: 0 }} height="90%" />}
        </div>
    );
}

async function get(req, controller) {
    let answer = []
    if (req == "") {
        await fetch("https://api.giphy.com/v1/gifs/search?api_key=FIT3iKsgACVpAQtlwWiZUMCPi5F71t2z&q=mama", {
            signal: controller.signal
        }).then(response => response.json()).then(content => {
            content.data.forEach(element => {
                answer.push([element.images.downsized, element.images.downsized_still.url]);
            })
        })
    }
    else {
        await fetch("https://api.giphy.com/v1/gifs/search?api_key=FIT3iKsgACVpAQtlwWiZUMCPi5F71t2z&limit=30&q=" + req, {
            signal: controller.signal
        }).then(response => response.json()).then(content => {
            content.data.forEach(element => {
                answer.push([element.images.downsized, element.images.downsized_still.url]);
            })
        })
    }
    return answer
}

function Messenger() {
    const [messages, updateMessage] = useState([])
    const [videos, loadVideos] = useState([])
    const [text, updateText] = useState("")
    const [height, updateHeight] = useState(0)
    const [controller, updateController] = useState(new AbortController())
    let req = ""
    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                socket.emit("get");
                socket.on("messages", (mes) => {
                    if (!cleanupFunction) {
                        updateMessage(mes);
                        document.getElementById("mes").scrollTop = document.getElementById("mes").scrollHeight
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
        <View activePanel='mes' >
            <div className='panel' id="mes">
                <PanelHeader
                    left={<PanelHeaderBack label="Назад" />}
                >
                    <PanelHeaderContent
                        status="был в сети сегодня, в 18:46"
                        before={<Avatar size={36} src="https://gamebomb.ru/files/galleries/001/b/b6/240587.jpg" />}
                    >
                        Влад Анесов
                    </PanelHeaderContent>
                </PanelHeader>

                <div id="mes1"><Messages array={messages} /></div>

                <FixedLayout vertical="bottom">
                    {videos.length > 0 && <Galler loader={loadVideos} list={videos} />}
                    <WriteBar
                        id="writebar"
                        style={{ borderTop: "0.5px solid #b8b8bb" }}
                        placeholder="Сообщение"
                        before={<WriteBarIcon mode="attach" />}
                        after={<WriteBarIcon mode="done" onClick={() => {
                            if (text.length > 0) {
                                updateText("")
                                loadVideos([])
                                document.getElementById("writebar").value = null;
                                document.getElementById("writebar").style.height = height + "px"
                                socket.emit("send", [text, "t"]);
                            }
                        }} />}
                        onChange={async (e) => {
                            if (e.target.value.length < 2) {
                                updateHeight(document.getElementById("writebar").offsetHeight)
                            }
                            updateText(e.target.value)

                            controller.abort();
                            let contr = new AbortController()
                            updateController(contr)
                            if (e.target.value.slice(0, 4) == "/gif") {
                                try {
                                    req = e.target.value.slice(4, e.target.value.length).trim()
                                    console.log(req + " IMPORTANT")
                                    loadVideos([])
                                    await get(req, contr).then((response) => { loadVideos(response); })
                                } catch (err) {
                                    if (err.name == 'AbortError') {
                                        console.log("break")
                                    } else {
                                        throw err;
                                    }
                                }
                            }
                            else {
                                loadVideos([])
                            }
                        }}
                    />
                </FixedLayout>
            </div>
        </View>
    );
}

export default Messenger;