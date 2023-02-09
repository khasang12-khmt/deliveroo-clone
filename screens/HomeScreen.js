import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../config/GlobalStyles";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategory, setFeaturedCategory] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == 'featured']{
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
    `
      )
      .then((data) => {
        setFeaturedCategory(data);
      });
  }, []);
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {/* Navbar */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-300 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location <ChevronDownIcon size={20} color="#0DCCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#0DCCBB" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row items-center space-x-2 p-3 bg-gray-200 flex-1">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsHorizontalIcon color="#0DCCBB" />
      </View>
      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredCategory?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            desc={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
