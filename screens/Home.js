import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../theme";
import Trending from "../components/Trending";
import { useState, useEffect } from 'react'
import List from "../components/List";
import Loading from "../components/Loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/tmdb";

const ios = Platform.OS === 'ios'

export default function Home({ navigation }) {

    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        // console.log('get trending movies:', data);
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies()
        // console.log('get upcoming movies:', data);
        if (data && data.results) setUpcoming(data.results)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies()
        console.log('get top rated movies:', data);
        if (data && data.results) setTopRated(data.results)
    }

    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size={30} color="#fff" strokeWidth={2} />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies<Text style={styles.text}> A</Text>pp
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {loading ? (
                <Loading />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                    {trending.length > 0 && <Trending data={trending} />}
                    <List title="Upcoming" data={upcoming} />
                    <List title="Top Rated" data={topRated} />
                </ScrollView>
            )}
        </View>
    );
}