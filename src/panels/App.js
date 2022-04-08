import React, { useEffect } from 'react';
import {
  AdaptivityProvider,
  WebviewType,
  ConfigProvider,
  AppRoot,
  Root,
  SplitLayout,
  SplitCol,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Group,
  CellButton,
  ModalCard,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Main from "./main"
import Gifs from "../modals/gifs"
import { useState } from 'react';
import socket from '../socket';

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [gifs, updateGifs] = useState([])
  
  useEffect(()=>{
    socket.emit("get_archive")
    socket.on("archive", (res)=>{
      updateGifs(res)
    });
  }, [])

  const modal = (
    <ModalRoot 
      activeModal={activeModal} 
      onClose={() => {
        setActiveModal(null);
      }}>

      <Gifs id="photo" list={gifs} setActiveModal={setActiveModal}/>
    </ModalRoot>
  )

  return (
    <ConfigProvider webviewType={WebviewType.INTERNAL}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modal}>
            <SplitCol>
                <Main id="main" setActiveModal={setActiveModal} />
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
