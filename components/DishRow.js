import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";

const DishRow = ({ id, name, price, desc, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 flex-row ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-1 pr-2">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400">{desc}</Text>
          <Text className="text-gray-400 mt-2">
            <Currency quantity={price} currency="GBP" />
          </Text>
        </View>

        <View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="h-20 w-20 bg-gray-300 p-4"
          />
        </View>
      </TouchableOpacity>

      {isPressed === true && (
        <View className="bg-white px-4 flex-row space-x-2 pb-3 items-center">
          <TouchableOpacity>
            <MinusCircleIcon size={40} color="#00CCDB" />
          </TouchableOpacity>
          <Text>0</Text>
          <TouchableOpacity>
            <PlusCircleIcon size={40} color="#00CCDB" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishRow;
