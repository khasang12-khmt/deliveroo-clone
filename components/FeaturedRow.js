import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, desc }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type=="featured" && _id==$id]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
        },
      }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#0DCCB0" />
      </View>
      <Text className="px-4 text-xs text-gray-500">{desc}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant?._id}
            id={restaurant?._id}
            imgUrl={restaurant?.image}
            title={restaurant?.name}
            rating={restaurant?.rating}
            genre={restaurant?.category?.name}
            address={restaurant?.address}
            desc={restaurant?.short_description}
            dishes={restaurant?.dishes}
            lon={restaurant?.lat}
            lat={restaurant?.lon}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
