
import * as React from 'react';
import { Image, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

const categories = [
  {name: 'Kurtlar Vadisi', id: 'kv', image: require ('../../assets/kv.jpg')},
  {name: 'Kurtlar Vadisi Pusu', id: 'kvp', image: require ('../../assets/kvp.jpg')},
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
`
const CategoryHeaderContainer = styled.View`
  background-color: black;
  padding: 15px 30px;
  border-radius: 10px;
  margin: 10px 0;
  align-self: flex-start;
`

const CategoryHeader = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`

const CategoriesContainer = styled.View`
  display: flex;
  align-items: space-around;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`

const Category = styled.TouchableOpacity`
  position: relative;
  background-color: black;
  /* border: 1px solid white; */

  height: 100px;
  border-radius: 10px;
`

const Text = styled.Text`
  font-size: 24;
  margin-bottom: 20px;
`

function HomeScreen({navigation}) {
  return (
    <Container style={{ flex: 1, padding: 15 }}>
      <Text>Türkiye'nin bu puslu ve karanlık vadisine hoş geldin.</Text>
      <Text>Hazırsan başlayalım Usta!</Text>
      <CategoryContainer>
        <CategoryHeaderContainer>
          <CategoryHeader>Kategori Seçimi!</CategoryHeader>
        </CategoryHeaderContainer>
        <CategoriesContainer>
          {
            categories.map (category => <Category onPress={() => {navigation.navigate ('Seviye', {game: category})}} style={{width: '45%'}} key={category.id}>
              <Image source={category.image} resizeMode="cover" style={{width: '100%', height: '100%', borderRadius: 10, opacity: 0.5}}/>
                <CategoryHeader style={{position: 'absolute', left: 0, right: 0, top: '50%'}}>{category.name}</CategoryHeader>
            </Category>)
          }
        </CategoriesContainer>
      </CategoryContainer>
    </Container>
  );
}

export default HomeScreen