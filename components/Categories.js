import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoriesCard from "./CategoriesCard";
import sanityClient from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type=="category"]{
        ...
      }
    `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Categories Card */}
      {categories?.map((cat) => (
        <CategoriesCard
          key={cat._id}
          id={cat._id}
          imgUrl={cat.image}
          title={cat.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
