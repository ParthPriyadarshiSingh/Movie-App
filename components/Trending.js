import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import { image500 } from '../api/tmdb';

const { width, height } = Dimensions.get('window')

const Trending = ({ data, navigation }) => {
    const handleClick = () => {
        navigation.navigate('Movie', item)
    }
    return (
        <View>
            <Text className="text-white text-xl m-4">Trending</Text>
            <Carousel
                loop
                width={width}
                height={height / 2}
                mode="parallax-vertical"
                data={data}
                scrollAnimationDuration={1000}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                renderItem={({ item }) => <Card item={item} handleClick={handleClick} />}
            />
        </View>
    )
}

const Card = ({ item, handleClick }) => {


    return (
        <TouchableWithoutFeedback>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: width, height: height / 2 }}>
                <Image source={{ uri: image500(item.poster_path) }} style={{ width: width * 0.4, height: height * 0.4, borderRadius: 20 }} />
            </View>
        </TouchableWithoutFeedback>
    )
}



export default Trending