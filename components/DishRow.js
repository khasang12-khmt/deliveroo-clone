import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";
import { useSelector, useDispatch } from "react-redux";

const DishRow = ({ id, name, price, desc, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, desc, image, price }));
  };

  const removeItemFromBasket = () => {
    if (items.length > 0) dispatch(removeFromBasket({ id }));
  };

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
            <MinusCircleIcon
              onPress={removeItemFromBasket}
              size={40}
              color={items.length > 0 ? "#00CCDB" : "gray"}
            />
          </TouchableOpacity>
          <Text>{items.length}</Text>
          <TouchableOpacity>
            <PlusCircleIcon
              onPress={addItemToBasket}
              size={40}
              color="#00CCDB"
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishRow;
