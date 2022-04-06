import React from 'react';
import socket from "../../../socket";
import { useState, useEffect } from 'react';
import { Gallery, List, Div, Avatar, View, FixedLayout, WriteBar, WriteBarIcon, PanelHeader, PanelHeaderContent, PanelHeaderBack, Spinner } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import './style.css';

function Messages(array) {
    return (
        <List id="content">
            {array.array.map((value, key) => {
                return (<Div className="message" key={key} style={{ padding: "7px", maxWidth: "70%" }}><span style={{ maxWidth: "100%", color: "white", backgroundColor: "#597ba0", borderRadius: "10px", padding: "10px" }}>{value}</span></Div>)
            })}
        </List>
    )
}

function Galler(list) {
    return (
        <Gallery align="center" slideWidth="custom" style={{ borderTop: "0.5px solid #b8b8bb", height: 150, borderRadius: 10, backgroundColor: "white", padding: "15px" }}>
            {list.list.map((data, i) => {
                return (
                    <Card key={i} data={data} id={i} />
                );
            })}
        </Gallery>
    );
}


function Card(data, id) {
    const [load1, setLoad1] = useState(false)
    return (
        <div style={{ position: "relative", height: "150px", marginLeft: "5px", backgroundColor: "red" }}>
            {/*!load1 && <Spinner size="large"/>*/}
            <img onLoad={() => { setLoad1(true) }} id={id} loading='lazy' src={data.data[1]} style={{ opacity: 1 }} height="100%" />
            {load1 && <img onLoad={() => { document.getElementById(id).opacity = 0 }} loading='lazy' src={data.data[0].url} style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }} height="100%" />}
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
        await fetch("https://api.giphy.com/v1/gifs/search?api_key=FIT3iKsgACVpAQtlwWiZUMCPi5F71t2z&q=" + req, {
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
                    {videos.length > 0 && <Galler list={videos} />}
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
                                socket.emit("send", text);
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