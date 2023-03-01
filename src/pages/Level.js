
import * as React from 'react';
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


function LevelScreen({navigation, route}) {
  return (
    <Container style={{ flex: 1, padding: 15 }}>
      <Text>Nereden Başlayalım Usta</Text>
      <CategoryContainer>
          {
            levels.map (category => <Category onPress={() => {navigation.navigate ('Soru', {game : {...route.params?.game}, level: category})}} style={{width: '45%'}} key={category.id}>
              <Image source={{uri:'https://reactjs.org/logo-og.png'}} resizeMode="cover" style={{width: '100%', height: '100%', borderRadius: 10, opacity: 0.5}}/>
                <CategoryHeader style={{position: 'absolute', left: 0, right: 0, top: '30%'}}>{category.name}</CategoryHeader>
            </Category>)
          }
      </CategoryContainer>
    </Container>
  );
}

export default LevelScreen