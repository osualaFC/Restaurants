import React from "react";
import { Searchbar } from "react-native-paper";
import { FlatList} from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utils/safearea.component";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

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

export const RestaurantsScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <RestaurantList
    data ={[{name: 1},{name: 2},{name: 3},{name: 4}]}
    renderItem ={() => 
    <Spacer position="bottom" size="large">
        <RestaurantInfoCard />
    </Spacer>
    }
    keyExtractor={(item) => item.name}
    />
  </SafeArea>
);