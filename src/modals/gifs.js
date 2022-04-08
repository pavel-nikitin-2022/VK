import {React, useState} from 'react';
import {
    List,
    ModalPage,
    ModalPageHeader,
    Group,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";


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
                {/*<List style={{height: "400px", overflow: "scroll"}}>
                    {list.map((data, i) => {
                        return (
                            <div key={i} style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <div style={{ width: "150px", height: "150px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src={data[0].url} />
                                </div>
                            </div>
                        );
                    })}
                </List>*/}
                <table style={{ width: "100%" }}>
                    <tbody style={{ width: "100%" }}>
                        {/*<tr style={{width: "100%"}}>
                        <td>
                            <div style={{height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img width={window.innerWidth / 3} src={list[0][0].url} />
                            </div>
                        </td>
                        <td>
                            <div style={{height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img width={window.innerWidth / 3} src={list[1][0].url} />
                            </div>
                        </td>
                        <td>
                            <div style={{height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img width={window.innerWidth / 3} src={list[2][0].url} />
                            </div>
                        </td>
                       </tr>*/}
                        {list.map((data, i) => {
                            if (i % 3 == 0) {
                                return (
                                    <tr key={i} style={{ width: "100%" }}>
                                        {list.map((data, k) => {
                                            if (k >= i && k < i + 3) {
                                                return (
                                                    <td key={k}>
                                                        <div style={{ height: "100px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
                                                            <img width={window.innerWidth / 3} src={array[k][0].url} />
                                                        </div>
                                                    </td>
                                                );
                                            }
                                        })}
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