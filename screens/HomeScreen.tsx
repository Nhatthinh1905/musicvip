import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from "react-native";
import { getAllTrackApi } from "../service/track";
import { Track } from "../interface/Track";
import { getAllArtistApi } from "../service/artist";
import { getAllAlbumApi } from "../service/album";
import { Artist } from "../interface/Artist";
import { Album } from "../interface/Album";

const HomeScreen = ({ navigation }) => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getAllArtistApi();
      setArtists(data.slice(0, 5));
    };
    const fetchTracks = async () => {
      const data = await getAllTrackApi();
      setTracks(data.slice(18, 22));
    };
    const fetchAlbums = async () => {
      const data = await getAllAlbumApi();
      setAlbums(data);
    };

    fetchArtists();
    fetchTracks();
    fetchAlbums();

    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 0 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const handleAllSongsPress = () => {
    navigation.navigate("ListSong");
  };
  const handleAllArtistsPress = () => {
    navigation.navigate("ListArtist");
  };
  const handleAllAlbumsPress = () => {
    navigation.navigate("ListAlbum"); // Navigate to the All Albums screen
  };

  const handleArtistPress = (artist: Artist) => {
    navigation.navigate("ArtistDetail", { artist });
  };

  const handleTrackPress = (track: Track) => {
    navigation.navigate("PlayScreen", { track, tracks });
  };

  const handleAlbumPress = (album: Album) => {
    navigation.navigate("AlbumDetail", { album });
  };

  const handleNavigateToPlayScreen = () => {
    navigation.navigate("PlayScreen", { track: tracks[0], tracks });
  };

  const renderArtist = ({ item }: { item: Artist }) => {
    return (
      <Pressable onPress={() => handleArtistPress(item)} style={styles.itemContainer}>
        <Image style={styles.imageArtist} source={{ uri: item.imageUrl }} />
        <Text style={styles.artistName}>{item.name}</Text>
      </Pressable>
    );
  };

  const renderTrack = ({ item }: { item: Track }) => {
    return (
      <Pressable onPress={() => handleTrackPress(item)} style={styles.itemContainer}>
        <Image style={styles.imageArtist} source={{ uri: item.imageUrl }} />
        <Text style={styles.artistName}>{item.title}</Text>
      </Pressable>
    );
  };

  const renderAlbum = ({ item }: { item: Album }) => {
    return (
      <Pressable onPress={() => handleAlbumPress(item)} style={styles.itemContainer}>
        <Image style={styles.imageArtist} source={{ uri: item.imageUrl }} />
        <Text style={styles.artistName}>{item.title}</Text>
      </Pressable>
    );
  };

  return (
    <LinearGradient colors={["#131313", "#121212"]} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <TouchableOpacity onPress={handleNavigateToPlayScreen}>
            <MaterialCommunityIcons
              name="play-circle"
              size={50}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.navigationButtons}>
          <Pressable style={styles.navButton} onPress={handleAllArtistsPress}>
            <MaterialCommunityIcons name="account-group" size={24} color="white" />
            <Text style={styles.navButtonText}>All Artists</Text>
          </Pressable>
          <Pressable style={styles.navButton} onPress={handleAllSongsPress}>
            <MaterialCommunityIcons name="music" size={24} color="white" />
            <Text style={styles.navButtonText}>All Tracks</Text>
          </Pressable>
          <Pressable style={styles.navButton} onPress={handleAllAlbumsPress}>
            <MaterialCommunityIcons name="album" size={24} color="white" />
            <Text style={styles.navButtonText}>All Albums</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Artists</Text>
        </View>
        <FlatList
          data={artists}
          renderItem={renderArtist}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Tracks</Text>
        </View>
        <FlatList
          data={tracks}
          renderItem={renderTrack}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Albums</Text>
        </View>
        <FlatList
          data={albums}
          renderItem={renderAlbum}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#131313",
  },
  greetingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 5,
  },
  navButtonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "bold",
  },
  sectionHeader: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  itemContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  imageArtist: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  artistName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
