import React from 'react';
import {
    List,
    ModalPage,
    ModalPageHeader,
    Group,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";


export default function Gifs({ list, setActiveModal }) {
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
                <List>
                    {list.map((data, i) => {
                        return (
                            <div key={i} style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <div style={{ width: "150px", height: "150px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src={data[0].url} />
                                </div>
                            </div>
                        );
                    })}
                </List>
            </Group>
        </ModalPage>
    );
}