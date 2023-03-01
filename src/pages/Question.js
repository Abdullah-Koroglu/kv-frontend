
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

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

function QuestionScreen({navigation, route}) {
  const [question, setQuestion] = useState ()
  const getQuestion = async () => {
    try {
      const response = await axios.post ('question', {
        game: route.params?.game?.id,
        level: route.params?.level?.id,
      })

      const question =  response.data[0]
      setQuestion (question)

    } catch (error) {
      console.log (error)
    }
  }

  useEffect (() => {
    getQuestion ()
  }, [])
  return (
    <Container style={{ flex: 1, padding: 15 }}>
      {
        question ?
        <Text>{question?.question}</Text>:
        null
        }
      {/* <CategoryContainer>
          {
            levels.map (category => <Category onPress={() => {navigation.navigate ()}} style={{width: '45%'}} key={category.id}>
              <Image source={{uri:'https://reactjs.org/logo-og.png'}} resizeMode="cover" style={{width: '100%', height: '100%', borderRadius: 10, opacity: 0.5}}/>
                <CategoryHeader style={{position: 'absolute', left: 0, right: 0, top: '30%'}}>{category.name}</CategoryHeader>
            </Category>)
          }
      </CategoryContainer> */}
    </Container>
  );
}

export default QuestionScreen