import React, { useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { FlatList, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utils/safearea.component";
import { Search } from "../components/search.component";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 10
    }
})`
  padding: ${(props) => props.theme.space[3]};
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({navigation}) => {
  const {isLoading, restaurants, error} = useContext(RestaurantsContext);
  
  return (
  <SafeArea>

    {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}

    <SearchContainer>
    <Search />
    </SearchContainer>
    <RestaurantList
    data ={restaurants}
    renderItem ={({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail")}>
        <Spacer position="bottom" size="large">     
        <RestaurantInfoCard restaurant = {item} />
      </Spacer>
      </TouchableOpacity>
    );
  }}
    keyExtractor={(item) => item.name}
    />
  </SafeArea>
  )
};