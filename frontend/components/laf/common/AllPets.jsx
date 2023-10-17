import React, { Suspense, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Header } from "../../common/Header";
import { PetsContainer } from "../../common/PetsContainer";

const AllPets = ({ title, data }) => {
    const [filter, setFilter] = useState("All");

    const groupIntoPairs = (data) => {
        const pairs = [];
        for (let i = 0; i < data.length; i += 2) {
            const pair = [data[i], data[i + 1]].filter(Boolean);
            pairs.push(pair);
        }
        return pairs;
    };

    const petTypes = [...new Set(data.map((pet) => pet.petType))]; // Get unique pet types

    const filteredPetsData = data.filter((pet) => {
        if (filter === "All") {
            return true;
        }
        return pet.petType === filter;
    });

    const petsPairs = groupIntoPairs(filteredPetsData);

    const handleFilterPress = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    return (
        <>
            <Header
                title={title}
                petTypes={petTypes}
                onFilterPress={handleFilterPress}
            />
            <Suspense fallback={<ActivityIndicator />}>
                <ScrollView>
                    <PetsContainer pairs={petsPairs} screen='Post' />
                </ScrollView>
            </Suspense>
        </>
    );
};

export default AllPets;
