import styled from 'styled-components/native';
import { Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';


const Container = styled.View`
  /* flex: 1;
  display: flex;
  align-items: flex-start;
  padding: 15px;
  display: flex;
  gap: 10px; */
`
const Button = styled.TouchableOpacity`
  /* background-color: red; */
`

function MuteButton({sound}) {
  const  [soundStates, setSoundStates] = useState ()
  const getStatus = async() => {
    const status = await sound?.getStatusAsync ()
    setSoundStates (status)
  }
  useEffect (() => {
    sound && getStatus ()
  },[sound])
  return (
    <Container>
      <Button onPress={() => {sound.setIsMutedAsync (!soundStates.isMuted); setSoundStates ((prev) => ({...prev, isMuted: !soundStates.isMuted}))}}>
        <Icon color={'white'} name={soundStates?.isMuted === false ? "volume-up": soundStates?.isMuted === true ? 'volume-off': null}/>
      </Button>
    </Container>
  );
}

export default MuteButton