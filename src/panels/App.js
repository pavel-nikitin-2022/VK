import React from 'react';
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
import Start from "./preview"
import { useState } from 'react';

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const modal = (
    <ModalRoot 
      activeModal={activeModal} 
      onClose={() => {
        setActiveModal(null);
      }}>

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
          <div>edw</div>
          <div>edw</div>
          <div>edw</div>
          <div>edw</div>
          <div>edw</div>
        </Group>
      </ModalPage>
    </ModalRoot>
  )

  return (
    <ConfigProvider webviewType={WebviewType.INTERNAL}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modal}>
            <SplitCol>
                <Main id="main" />
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
