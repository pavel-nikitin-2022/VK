import { React, useState } from 'react';
import {
    ModalPage,
    ModalPageHeader,
    Group,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import socket from '../socket';


export default function Gifs({ list, setActiveModal }) {
    const [array, change] = useState(list)
    return (
        <ModalPage
            id="photo"
            header={
                <ModalPageHeader>
                    Dynamic modal
                </ModalPageHeader>
            }
            dynamicContentHeight
        >

            <Group>
                <table style={{ width: "100%" }}>
                    <tbody style={{ width: "100%" }}>
                        {/*list.map((data, i) => {
                            if (i % 3 == 0) {
                                return (
                                    <tr key={i} style={{ width: "100%" }}>
                                        {list.map((data, k) => {
                                            if (k >= i && k < i + 3) {
                                                return (
                                                    <td key={k}>
                                                        <div style={{ height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
                                                            {window.innerWidth < 420 && <img onClick={()=>{socket.emit("send", [array[k][0].url, "g"]); setActiveModal(null)}} width={window.innerWidth / 3} src={array[k][0].url} />}
                                                            {window.innerWidth > 420 && <img onClick={()=>{socket.emit("send", [array[k][0].url, "g"]); setActiveModal(null)}} width={100} src={array[k][0].url} />}
                                                        </div>
                                                    </td>
                                                );
                                            }
                                        })}
                                    </tr>
                                );
                            }
                        })*/}
                        {list.map((data, i) => {
                            if (i % 3 == 0) {
                                return (
                                    <tr key={i} style={{ width: "100%" }}>
                                        <td>
                                            <div style={{ height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
                                                {window.innerWidth < 420 && <img onClick={() => { socket.emit("send", [array[i][0].url, "g"]); setActiveModal(null) }} width={window.innerWidth / 3} src={array[i][0].url} />}
                                                {window.innerWidth > 420 && <img onClick={() => { socket.emit("send", [array[i][0].url, "g"]); setActiveModal(null) }} width={135} src={array[i][0].url} />}
                                            </div>
                                        </td>
                                        <td>
                                            {array[i + 1] && <div style={{ height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
                                                {window.innerWidth < 420 && <img onClick={() => { socket.emit("send", [array[i + 1][0].url, "g"]); setActiveModal(null) }} width={window.innerWidth / 3} src={array[i + 1][0].url} />}
                                                {window.innerWidth > 420 && <img onClick={() => { socket.emit("send", [array[i + 1][0].url, "g"]); setActiveModal(null) }} width={135} src={array[i + 1][0].url} />}
                                            </div>}
                                            {!array[i + 1] && <div style={{ height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black",opacity: 0 }}>
                                                {window.innerWidth < 420 && <img width={window.innerWidth / 3} src={array[i][0].url} />}
                                                {window.innerWidth > 420 && <img width={135} src={array[i][0].url} />}
                                            </div>}
                                        </td>
                                        <td>
                                            {array[i + 2] && <div style={{ height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
                                                {window.innerWidth < 420 && <img onClick={() => { socket.emit("send", [array[i + 2][0].url, "g"]); setActiveModal(null) }} width={window.innerWidth / 3} src={array[i + 2][0].url} />}
                                                {window.innerWidth > 420 && <img onClick={() => { socket.emit("send", [array[i + 2][0].url, "g"]); setActiveModal(null) }} width={135} src={array[i + 2][0].url} />}
                                            </div>}
                                            {!array[i + 2] && <div style={{ height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black",opacity: 0 }}>
                                                {window.innerWidth < 420 && <img width={window.innerWidth / 3} src={array[i][0].url} />}
                                                {window.innerWidth > 420 && <img width={135} src={array[i][0].url} />}
                                            </div>}
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </Group>
        </ModalPage>
    );
}