
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, View, Dimensions, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Video } from 'expo-av';

const levels = [
  {name: 'Kolay', id: 'easy'},
  {name: 'Orta', id: 'mid'},
  {name: 'Zort', id: 'hard'},
]
const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding: 15px;
  display: flex;
  gap: 10px;
`

const CategoryContainer = styled.View`
  padding: 10px;
  background-color: #cdcdcd;
  border-radius: 5px;
  width: 100%;
  justify-self: flex-start;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`

const CategoryHeader = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`

const Category = styled.TouchableOpacity`
  position: relative;
  background-color: black;
  /* border: 1px solid white; */
  height: 50px;
  border-radius: 10px;
  margin-bottom: 10px;
`

const Text = styled.Text`
  font-size: 24;
  margin-bottom: 20px;
`
const ButtonText = styled.Text`
  font-size: 24;
  color: white;
  /* margin-bottom: 20px; */
`

const TextInput = styled.TextInput`
  font-size: 24;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 5px;
  /* width: 100%; */
  padding: 5px 10px;
`

const SubmitButton = styled.TouchableOpacity`
  background-color: black;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px ;
  border-radius: 10px;
`

const AnswerPopup = styled.View`
  position: absolute;
  bottom: 0;
  width: ${Dimensions.get ('window').width}px;
  background-color: yellow;
  height: ${Dimensions.get ('window').height / 5}px;
  padding: 20px;
`

const Row = styled.View`
  display: flex;
  flex-direction: row;
`



function QuestionScreen({navigation, route}) {
  const [showAnswer, setShowAnswer] = useState (undefined)
  const [question, setQuestion] = useState ()
  const [answer, setAnswer] = useState ('')
  const getQuestion = async () => {
    try {
      const response = await axios.post ('question', {
        game: route.params?.game?.id,
        level: route.params?.level?.id,
      })

      const question =  response.data
      setQuestion (question)

    } catch (error) {
      console.log (error)
    }
  }

  const giveAnswer = async () => {
    Keyboard.dismiss ()
    const response = await axios.post ('check', {
      id: question.id,
      answer ,
    })

    setShowAnswer (JSON.stringify (response.data))
  }

  const tryAgain = () => {
    setShowAnswer ()
    setAnswer ()
  }


  useEffect (() => {
    getQuestion ()
  }, [])
  return (
    <Container style={{ flex: 1, padding: 15 }}>
      {
        question ?
        <View>
          {/* {console.log (JSON.stringify(question?.[question.type],null,'\t'))} */}
          {question.type === 'photo' &&
            <Image
              onError={(err) => console.log (err)}
              style={{width: question[question.type].width, height: question[question.type].height}}
              source={{uri: `${process.env.REACT_APP_IMAGE_URL}${question[question.type]?.url}`}}
            />}
          {question.type === 'video' &&
            <Video
              style={{
                height: Dimensions.get('window').height / 3,
                width: Dimensions.get('window').width - 50,
                marginBottom: 20
              }}
              resizeMode="contain"
              shouldPlay
              isLooping
              // isMuted
              source={{uri: `${process.env.REACT_APP_IMAGE_URL}${question[question.type]?.url}`}}
            />}
          <Text>{question?.question}</Text>
          <TextInput
            editable={showAnswer === undefined && true}
            value={answer}
            onChangeText={setAnswer}
          />
          <SubmitButton onPress={() => giveAnswer ()}>
            <ButtonText>Gönder</ButtonText>
          </SubmitButton>
        </View>:
        null
        }
    {showAnswer &&
    <AnswerPopup style={{backgroundColor: showAnswer === 'true' ? '#b7faaa' : showAnswer === 'false' ? '#ff8cbe': 'red'  }}>
      <Text>{showAnswer === 'true' ? 'Helal!' : showAnswer === 'false' ? 'Olmadı.': '?'}</Text>
      <Row>
        {
          showAnswer === 'false' &&
          <SubmitButton style={{marginRight: 10}} onPress={() => tryAgain ()}>
            <ButtonText>Bi' daha dene!</ButtonText>
          </SubmitButton>
        }
        <SubmitButton onPress={() => {tryAgain (); getQuestion ();}}>
          <ButtonText>Yenisi</ButtonText>
        </SubmitButton>
      </Row>
    </AnswerPopup>
    }
    </Container>
  );
}

export default QuestionScreen