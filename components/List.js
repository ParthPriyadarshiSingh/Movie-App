import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { image185 } from '../api/tmdb'

const { width, height } = Dimensions.get('window')

const List = ({ title, data, hideSeeAll }) => {

    const navigation = useNavigation()

    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row flex-1 justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={styles.text} className="text-lg">See All</Text>
                    </TouchableOpacity>
                )}

            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push('Movie', item)}>
                            <View className="space-y-1 mr-4">
                                <Image source={{ uri: image185(item.poster_path) }} style={{ width: width * 0.3, height: height * 0.2, borderRadius: 20 }} />
                                <Text className="text-neutral-300">{item.title.length > 14 ? item.title.slice(0, 18) + '...' : item.title}</Text>
                            </View>

                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default List