import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import * as Progress from "react-native-progress";
import { XMarkIcon } from "react-native-heroicons/solid";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const {restaurant} = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00CCBB] flex-1 pt-6">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://media1.giphy.com/media/gsr9MG7bDvSRWWSD1Y/200w.gif",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: 51.25,
          longitude: -0.59,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: 51.25,
            longitude: -0.59,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28 rounded-md pr-5">
        <Image
          source={{
            uri: "https://pbs.twimg.com/media/EGIeHV4WoAA_qE6.jpg",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-lg">Sang Kha</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
