import { View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { styles, theme } from '../theme'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import Cast from '../components/Cast'
import List from '../components/List'
import Loading from '../components/Loading'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/tmdb'

const { width, height } = Dimensions.get('window')

const Movie = ({ navigation }) => {

    const ios = Platform.OS === 'ios'
    const topMargin = ios ? '' : 'mt-3'
    const movieName = 'Antman and the wasp: Quantumania'
    const [cast, setCast] = useState([])
    const [similar, setSimilar] = useState([])

    const { params: item } = useRoute()

    const [isFavourite, toggleFavourite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})

    useEffect((item) => {
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)

    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        // console.log('got movie details', data);
        if (data) setMovie(data)
        setLoading(false)
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        // console.log('got movie credits', data);
        if (data && data.cast) setCast(data.cast)
    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        // console.log('got similar movies', data);
        if (data && data.result) setSimilar(data.results)
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin} >
                    <TouchableOpacity
                        style={styles.background}
                        className="rounded-xl p-1 ml-4"
                        onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={'#fff'} />
                    </TouchableOpacity>
                    <TouchableOpacity className="mr-4" onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={35} color={isFavourite ? theme.background : "#fff"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {loading ? (
                    <Loading />
                ) : (
                    <View>
                        <Image source={{ uri: image500(movie?.poster_path) }} style={{ width, height: height * 0.5 }} />
                    </View>
                )}
            </View>
            <View style={{ marginTop: -(height * 0.07) }} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">{movie.title}</Text>
                {movie?.id ? (
                    <Text className="text-neutral-400 font-semibold text-base text-center">{movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min</Text>
                ) : null}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {movie?.genres?.map((genre, index) => {
                        const showDot = index + 1 !== movie.genre.length
                        return (
                            <Text className="text-neutral-400 font-semibold text-base text-center">{genre?.name} {showDot ? '·' : null}</Text>
                        )
                    })}
                </View>
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {movie?.overview}
                </Text>
            </View>
            <Cast cast={cast} navigation={navigation} />
            <List title="Similar Movies" data={similar} hideSeeAll={true} />
        </ScrollView>
    )
}

export default Movie