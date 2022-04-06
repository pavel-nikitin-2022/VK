import React from 'react';
import {
  useAdaptivity,
  SplitLayout,
  SplitCol,
  ViewWidth,
  View,
  Panel,
  Div,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  Button
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function Start() {
  return (
      <View activePanel = "mama">
          <Panel id="mama">
              <Div>МАМА</Div>
          </Panel>
      </View>
  );
}

export default Start;