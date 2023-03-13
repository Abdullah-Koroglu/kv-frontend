import styled from 'styled-components/native';
import { Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Container = styled.View`
background-color: black;
align-self: flex-end;
padding: 10px;
display: flex;
flex-direction: column;
border-radius: 5px;

  /* flex: 1;
  display: flex;
  align-items: flex-start;
  padding: 15px;
  display: flex;
  gap: 10px; */
`

const IconContainer = styled.TouchableOpacity`
padding: 5px 0;
min-width: 40px;
`

function Vote({id}) {
  const [buttonPassive, setButtonPassive] = useState ()
  const [vote, setVote] = useState ()
  const [voteId, setVoteId] = useState ()


  const createVote = async(vote) => {
    setButtonPassive (true)
    const response = await axios.post ('votes', {
      data: {
        question: id,
        vote,
      }
    })

    setVote (response.data?.data?.attributes?.vote)
    setVoteId (response.data?.data?.id)

    setButtonPassive (false)
  }

  const updateVote = async (vote) => {
    setButtonPassive (true)
    const response = await axios.put (`votes/${voteId}`, {
      data: {
        vote
      }
    })

    setVote (response.data?.data?.attributes?.vote)
    setVoteId (response.data?.data?.id)

    setButtonPassive (false)
  }

  const deleteVote = async () => {
      setButtonPassive (true)
      const response = await axios.delete (`votes/${voteId}`)

      setVote ()
      setVoteId ()

      setButtonPassive (false)
  }

  const getVote = async() => {
    setButtonPassive (true)
    const response = await axios.get (`votes?filters[question][id]=${id}`)
    console.log (response.data.data)

    // setVote (response.data?.data?.attributes?.vote)
    // setVoteId (response.data?.data?.id)

    setButtonPassive (false)
  }

  useEffect (() => {
    getVote ()
  },[])

  const handleVoteChange = (voteParam) => {
    if (!buttonPassive) {
      if (voteId > 0){
        if (vote === voteParam) {
          deleteVote ()
        } else {
          updateVote (voteParam)
        }
      } else {
        createVote (voteParam)
      }
    }
  }

  const activeVote = {fontSize: 30, color: '#fff'}
  return (
    <Container>
      <IconContainer onPress={() => {handleVoteChange (true)}}><Icon iconStyle={vote === true ? activeVote: null} color={'#cecece'} name='north'/></IconContainer>
      <IconContainer><Icon color={'#cecece'} name='favorite-border'/></IconContainer>
      <IconContainer onPress={() => {handleVoteChange (false)}}><Icon iconStyle={vote === false ? activeVote: null} color={'#cecece'} name='south'/></IconContainer>
    </Container>
  );
}

export default Vote